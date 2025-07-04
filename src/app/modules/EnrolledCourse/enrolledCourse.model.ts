import mongoose, { Schema } from 'mongoose';
import { Grade } from './enrolledCourse.constant';
import {
  TEnrolledCourse,
  TEnrolledCourseMarks,
  TSubjectMarks,
} from './enrolledCourse.interface';

const courseMarksSchema = new Schema<TEnrolledCourseMarks>(
  {
    classTest1: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    classTest2: {
      type: Number,
      min: 0,
      max: 30,
      default: 0,
    },
    classTest3: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    classTest4: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    finalExam: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const subjectMarksSchema = new Schema<TSubjectMarks>(
  {
    subjectName: { type: String, required: true },
    marks: courseMarksSchema,
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'SemesterRegistration',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'OfferedCourse',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  subjectMarks: {
    type: [subjectMarksSchema],
  },
  grade: {
    type: String,
    enum: Grade,
    default: 'NA',
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isPassed: {
    type: Boolean,
    default: false,
  },
  selectedSubjects: {
    type: [String],
  },
  isMarkSubmitted: {
    type: Boolean,
    default: false,
  },
  isExamDone: {
    type: Boolean,
    default: false,
  },
  isNextSemesterRegistrationDone: {
    type: Boolean,
    default: false,
  },
});

const EnrolledCourse = mongoose.model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);

export default EnrolledCourse;
