import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

const createAcdemicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),

    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
    academicYear: z.string({
      invalid_type_error: 'Academic year must be string',
      required_error: 'Academic year is required',
    }),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),

    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    academicYear: z.string({
      invalid_type_error: 'Academic year must be string',
      required_error: 'Academic year is required',
    }),
  }),
});

export const AcademicSemesterValidations = {
  createAcdemicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
