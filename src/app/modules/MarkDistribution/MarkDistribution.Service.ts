import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { Student } from '../Student/student.model';
import { TMarkDistribution } from './MarkDistribution.Interface';
import { MarkDistribution } from './markDistribution.model';
import { calculateResult } from './MarkDistribution.utils';

const createMark = async (payload: TMarkDistribution) => {
  const isStudent = await Student.exists({ _id: payload.student });
  if (!isStudent)
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Student ID');

  const isCourse = await OfferedCourse.exists({ _id: payload.course });
  if (!isCourse) throw new AppError(httpStatus.NOT_FOUND, 'Invalid Course ID');

  const { total, status } = calculateResult(
    payload.classTests,
    payload.finalExam,
  );

  const result = await MarkDistribution.create({
    ...payload,
    totalMarks: total,
    resultStatus: status,
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

  const newCT = payload.classTests ?? mark.classTests;
  const newFinal = payload.finalExam ?? mark.finalExam;

  const { total, status } = calculateResult(newCT, newFinal);

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
  const result = await MarkDistribution.findByIdAndDelete(id);
  return result;
};

export const MarkDistributionService = {
  createMark,
  getAllMarks,
  getSingleMark,
  updateMark,
  deleteMark,
};
