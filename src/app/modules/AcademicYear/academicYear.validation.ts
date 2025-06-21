import { z } from 'zod';

const createAcademicYearValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic year name must be string',
    }),
    description: z
      .string({
        invalid_type_error: 'Academic year description must be string',
      })
      .optional(),
  }),
});

const updateAcademicYearValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic year name must be string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Academic year description must be string',
      })
      .optional(),
  }),
});

export const AcademicYearValidation = {
  createAcademicYearValidationSchema,
  updateAcademicYearValidationSchema,
};
