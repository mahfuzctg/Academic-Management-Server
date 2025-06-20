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
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester',
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  '1st Semester': '01',
  '2nd Semester': '02',
  '3rd Semester': '03',
  '4th Semester': '04',
  '5th Semester': '05',
  '6th Semester': '06',
  '7th Semester': '07',
  '8th Semester': '08',
};

export const AcademicSemesterSearchableFields = ['name', 'year'];
