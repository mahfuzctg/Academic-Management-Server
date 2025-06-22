import { Types } from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};

export type TStudentSemesterRegistration = {
  student: Types.ObjectId;
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isRegistered: boolean;
  registrationDate?: Date;
  totalCredits: number;
  maxCredits: number;
  minCredits: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
  isDeleted: boolean;
};
