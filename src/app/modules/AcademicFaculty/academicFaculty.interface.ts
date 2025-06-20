import { Types } from 'mongoose';

export type TAcademicFaculty = {
  name: string;
  academicYear: Types.ObjectId;
};
