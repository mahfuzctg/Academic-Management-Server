import { Types } from 'mongoose';

export type TSubjectMarks = {
  [subjectName: string]: number;
};

export type TMarkDistribution = {
  student: Types.ObjectId;
  course: Types.ObjectId;
  classTests: number[];
  subjects: TSubjectMarks;
  finalExam?: number; // optional if using subject-wise
  totalMarks?: number;
  resultStatus?: 'PASS' | 'FAIL' | 'INCOMPLETE';
};
