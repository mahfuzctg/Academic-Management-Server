import { Types } from 'mongoose';

export type TMarkDistribution = {
  student: Types.ObjectId;
  course: Types.ObjectId;
  classTests: number[];
  finalExam: number;
  totalMarks?: number;
  resultStatus?: 'PASS' | 'FAIL' | 'INCOMPLETE';
};
