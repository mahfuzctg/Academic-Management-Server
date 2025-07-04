import { Types } from 'mongoose';

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';

export type TEnrolledCourseMarks = {
  classTest1: number;
  classTest2: number;
  classTest3: number;
  classTest4: number;
  finalExam: number;
};

export type TSubjectMarks = {
  subjectName: string;
  marks: TEnrolledCourseMarks;
};

export type TEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  course: Types.ObjectId;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: TEnrolledCourseMarks;
  subjectMarks?: TSubjectMarks[];
  grade: TGrade;
  gradePoints: number;
  isPassed: boolean;
  isMarkSubmitted?: boolean;
  isExamDone?: boolean;
  isNextSemesterRegistrationDone?: boolean;
  selectedSubjects?: string[];
};
