/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { SemesterRegistration } from '../SemesterRegistration/semesterRegistration.model';
import { Student } from '../Student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { calculateGradeAndPoints } from './enrolledCourse.utils';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * Step1: Check if the offered course exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits are exceeded
   * Step4: Create an enrolled course
   */

  let { selectedSubjects } = payload;
  const { offeredCourse } = payload;

  // Step 1: Validate offered course
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!');
  }

  console.log('isOfferedCourseExists', isOfferedCourseExists);

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Room is full!');
  }

  // Step 2: Validate student and check enrollment
  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled!');
  }

  // Step 3: Check subject selection and credits
  const course = await Course.findById(isOfferedCourseExists.course);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }

  let currentCredit = 0;

  // Handle optional subjects
  if (course.optionalSubjects && course.optionalSubjects.length > 0) {
    if (!selectedSubjects || selectedSubjects.length === 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You must select subjects for this course.',
      );
    }

    if (
      course.subjectsToSelect &&
      selectedSubjects.length !== course.subjectsToSelect
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You must select exactly ${course.subjectsToSelect} subjects.`,
      );
    }

    const availableSubjectNames = course.optionalSubjects.map((s) => s.name);

    for (const subjectName of selectedSubjects) {
      if (!availableSubjectNames.includes(subjectName)) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Invalid subject selected: ${subjectName}`,
        );
      }
    }

    currentCredit = course.optionalSubjects
      .filter((s) => selectedSubjects?.includes(s.name))
      .reduce((acc, s) => acc + s.credits, 0);
  } else {
    if (selectedSubjects && selectedSubjects.length > 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'This course does not have selectable subjects.',
      );
    }

    currentCredit = course.credits;
  }

  // Add default subjects to selectedSubjects if they exist
  if (course.defaultSubjects && course.defaultSubjects.length > 0) {
    const defaultSubjectNames = course.defaultSubjects.map((s) => s.name);
    const currentSelectedSubjects = selectedSubjects || [];
    const updatedSelectedSubjects = [
      ...new Set([...currentSelectedSubjects, ...defaultSubjectNames]),
    ];
    selectedSubjects = updatedSelectedSubjects;
  }

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');

  const maxCredit = semesterRegistration?.maxCredit ?? 0;

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    { $unwind: '$enrolledCourseData' },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    { $project: { _id: 0, totalEnrolledCredits: 1 } },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  if (totalCredits + currentCredit > maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded the maximum number of credits!',
    );
  }

  // Step 6: Enroll the student
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
          isExamDone: false,
          isNextSemesterRegistrationDone: false,
          selectedSubjects, // array of subject names
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this course!',
      );
    }

    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: isOfferedCourseExists.maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllEnrolledCoursesFromDB = async (
  facultyId: string,
  query: Record<string, unknown>,
) => {
  const faculty = await Faculty.findOne({ id: facultyId });
  console.log('faculty', faculty);
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({
      faculty: faculty._id,
    }).populate(
      'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty',
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await enrolledCourseQuery.modelQuery;
  console.log('result this', result);
  const meta = await enrolledCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getMyEnrolledCoursesFromDB = async (
  studentId: string,
  query: Record<string, unknown>,
) => {
  const student = await Student.findOne({ id: studentId });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: student._id }).populate(
      'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty',
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await enrolledCourseQuery.modelQuery;
  const meta = await enrolledCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: {
    studentId: string;
    courseId: string;
    courseMarks?: {
      classTest1?: number;
      classTest2?: number;
      classTest3?: number;
      classTest4?: number;
      finalExam?: number;
    };
    subjectMarks?: {
      subjectName: string;
      marks: {
        classTest1?: number;
        classTest2?: number;
        classTest3?: number;
        classTest4?: number;
        finalTerm?: number;
      };
    }[];
    grade?: string;
    isPassed?: boolean;
    isMarkSubmitted?: boolean;
  },
) => {
  const { studentId, courseId, courseMarks, subjectMarks } = payload;
  console.log({ subjectMarks });
  const student = await Student.findOne({ id: studentId });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }

  // // There is only one ongoing semester.
  // const semesterRegistration = await SemesterRegistration.findOne({
  //   status: 'ONGOING',
  // });

  // if (!semesterRegistration) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     'Semester registration not found!',
  //   );
  // }

  // const offeredCourse = await OfferedCourse.findOne({
  //   semesterRegistration: semesterRegistration._id,
  //   course: course._id,
  // });

  // if (!offeredCourse) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!');
  // }

  const enrolledCourse = await EnrolledCourse.findOne({
    // semesterRegistration: course.semesterRegistration,
    // offeredCourse: course.offeredCourse,
    student: student._id,
    faculty: faculty._id,
  });

  if (!enrolledCourse) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  const modifiedData: Record<string, any> = {};

  if (subjectMarks && subjectMarks.length > 0) {
    modifiedData.subjectMarks = subjectMarks.map((subjectMark) => {
      const existingSubject = enrolledCourse.subjectMarks?.find(
        (s) => s.subjectName === subjectMark.subjectName,
      );
      return {
        subjectName: subjectMark.subjectName,
        marks: {
          ...existingSubject?.marks,
          ...subjectMark.marks,
        },
      };
    });

    const totalMarksForSubjects =
      modifiedData.subjectMarks?.reduce(
        (
          acc: number,
          subject: {
            marks: {
              classTest1?: number;
              classTest2?: number;
              classTest3?: number;
              classTest4?: number;
              finalTerm?: number;
            };
          },
        ) => {
          const currentTotal =
            (subject.marks.classTest1 || 0) +
            (subject.marks.classTest2 || 0) +
            (subject.marks.classTest3 || 0) +
            (subject.marks.classTest4 || 0) +
            (subject.marks.finalTerm || 0);
          return acc + currentTotal;
        },
        0,
      ) || 0;

    const { grade, gradePoints } = calculateGradeAndPoints(
      totalMarksForSubjects,
    );
    modifiedData.grade = grade;
    modifiedData.gradePoints = gradePoints;
    modifiedData.isPassed = gradePoints > 0;
  } else if (courseMarks) {
    const currentCourseMarks = enrolledCourse.courseMarks;

    modifiedData['courseMarks.classTest1'] =
      courseMarks.classTest1 ?? currentCourseMarks.classTest1;
    modifiedData['courseMarks.classTest2'] =
      courseMarks.classTest2 ?? currentCourseMarks.classTest2;
    modifiedData['courseMarks.classTest3'] =
      courseMarks.classTest3 ?? currentCourseMarks.classTest3;
    modifiedData['courseMarks.classTest4'] =
      courseMarks.classTest4 ?? currentCourseMarks.classTest4;
    modifiedData['courseMarks.finalExam'] =
      courseMarks.finalExam ?? currentCourseMarks.finalExam;

    const totalMarks =
      (modifiedData['courseMarks.classTest1'] || 0) +
      (modifiedData['courseMarks.classTest2'] || 0) +
      (modifiedData['courseMarks.classTest3'] || 0) +
      (modifiedData['courseMarks.classTest4'] || 0) +
      (modifiedData['courseMarks.finalExam'] || 0);

    const { grade, gradePoints } = calculateGradeAndPoints(totalMarks);
    modifiedData.grade = grade;
    modifiedData.gradePoints = gradePoints;
    modifiedData.isPassed = gradePoints > 0;
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    enrolledCourse._id,
    {
      ...modifiedData,
      grade: payload.grade,
      isPassed: payload.isPassed,
      isExamDone: true,
      isMarkSubmitted: payload.isMarkSubmitted,
      courseMarks: modifiedData.courseMarks,
    },
    {
      new: true,
    },
  );

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getAllEnrolledCoursesFromDB,
  getMyEnrolledCoursesFromDB,
  updateEnrolledCourseMarksIntoDB,
};
