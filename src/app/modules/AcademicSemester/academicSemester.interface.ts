import { Types } from 'mongoose';

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName =
  | '1st Semester'
  | '2nd Semester'
  | '3rd Semester'
  | '4th Semester'
  | '5th Semester'
  | '6th Semester'
  | '7th Semester'
  | '8th Semester';
export type TAcademicSemesterCode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type TAcademicSemester = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  year: any;
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;

  startMonth: TMonths;
  endMonth: TMonths;
  academicYear: Types.ObjectId;
};

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
