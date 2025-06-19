import httpStatus from 'http-status';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { Course } from '../Course/course.model';
import { Student } from '../Student/student.model';
import { TMarkDistribution } from './MarkDistribution.Interface';
import { MarkDistribution } from './markDistribution.model';
import { calculateSubjectResult } from './MarkDistribution.utils';

const createMarksBySubjects = async (payload: {
  student: Types.ObjectId;
  course: Types.ObjectId;
  classTests?: number[]; // Optional but can be passed
  subjects: Record<string, number>;
}) => {
  const isStudent = await Student.exists({ _id: payload.student });
  if (!isStudent)
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Student ID');

  const isCourse = await Course.exists({ _id: payload.course });
  if (!isCourse) throw new AppError(httpStatus.NOT_FOUND, 'Invalid Course ID');

  const subjectMarks = Object.values(payload.subjects || {});
  const subjectTotal = subjectMarks.reduce((sum, mark) => sum + mark, 0);

  const classTests = payload.classTests || [];
  let classTestTotal = 0;
  if (classTests.length === 4) {
    const bestThree = classTests.sort((a, b) => b - a).slice(0, 3);
    classTestTotal = bestThree.reduce((sum, mark) => sum + mark, 0);
  }

  const total = subjectTotal + classTestTotal;
  const resultStatus = total >= 120 ? 'PASS' : 'FAIL';

  const result = await MarkDistribution.create({
    student: payload.student,
    course: payload.course,
    subjects: payload.subjects,
    classTests: payload.classTests,
    totalMarks: total,
    resultStatus,
  });

  return result;
};

const getAllMarks = async (query: Record<string, unknown>) => {
  return await MarkDistribution.find(query)
    .populate('student')
    .populate('course');
};

const getSingleMark = async (id: string) => {
  const result = await MarkDistribution.findById(id)
    .populate('student')
    .populate('course');
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Mark not found!');
  return result;
};

const updateMark = async (id: string, payload: Partial<TMarkDistribution>) => {
  const mark = await MarkDistribution.findById(id);
  if (!mark) throw new AppError(httpStatus.NOT_FOUND, 'Mark not found!');

  const updatedSubjects = payload.subjects ?? mark.subjects;
  const updatedCT = payload.classTests ?? mark.classTests;

  const { total, status } = calculateSubjectResult(
    updatedSubjects as Record<string, number>,
    updatedCT,
  );

  const result = await MarkDistribution.findByIdAndUpdate(
    id,
    {
      ...payload,
      totalMarks: total,
      resultStatus: status,
    },
    { new: true, runValidators: true },
  );

  return result;
};

const deleteMark = async (id: string) => {
  return await MarkDistribution.findByIdAndDelete(id);
};

export const MarkDistributionService = {
  createMarksBySubjects,
  getAllMarks,
  getSingleMark,
  updateMark,
  deleteMark,
};
