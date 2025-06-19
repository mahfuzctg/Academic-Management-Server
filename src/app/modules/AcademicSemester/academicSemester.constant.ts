import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
  TMonths,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  'First-Semester',
  'Second-Semester',
  'Third-Semester',
  'Fourth-Semester',
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
  '04',
];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  FirstSemester: '01',
  SecondSemester: '02',
  ThirdSemester: '03',
  FourthSemester: '04',
};

export const AcademicSemesterSearchableFields = ['name', 'year'];
