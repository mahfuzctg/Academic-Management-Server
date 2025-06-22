import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TSubject = {
  name: string;
  credits: number;
  isDeleted?: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: TPreRequisiteCourses[];
  subjectType: 'Theory' | 'Lab' | 'Project';
  note?: string;
  defaultSubjects?: TSubject[];
  optionalSubjects?: TSubject[];
  subjectsToSelect?: number;
};

export type TCoursefaculty = {
  course: Types.ObjectId;
  faculties: Types.ObjectId[];
};
