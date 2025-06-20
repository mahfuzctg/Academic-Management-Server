import { z } from 'zod';

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
    selectedSubjects: z.array(z.string()).optional(),
  }),
});

const courseMarksValidationSchema = z.object({
  classTest1: z.number().optional(),
  midTerm: z.number().optional(),
  classTest2: z.number().optional(),
  finalTerm: z.number().optional(),
});

const subjectMarksValidationSchema = z.object({
  subjectName: z.string(),
  marks: courseMarksValidationSchema,
});

const updateEnrolledCourseMarksValidationZodSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: courseMarksValidationSchema.optional(),
    subjectMarks: z.array(subjectMarksValidationSchema).optional(),
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
};
