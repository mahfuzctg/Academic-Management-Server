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
  finalExam: z.number().optional(),
});

const subjectMarksValidationSchema = z.object({
  subjectName: z.string(),
  marks: courseMarksValidationSchema,
});

const updateEnrolledCourseMarksValidationZodSchema = z.object({
  body: z.object({
    studentId: z.string(),
    courseId: z.string(),
    subjectMarks: z.array(subjectMarksValidationSchema).optional(),
    grade: z.string().optional(),
    isPassed: z.boolean().optional(),
    isMarkSubmitted: z.boolean().optional(),
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
};
