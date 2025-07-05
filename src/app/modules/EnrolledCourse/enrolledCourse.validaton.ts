import { z } from 'zod';

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
    selectedSubjects: z.array(z.string()).optional(),
  }),
});

const courseMarksValidationSchema = z.object({
  classTest1: z.number().min(0).max(20).optional(),
  classTest2: z.number().min(0).max(20).optional(),
  classTest3: z.number().min(0).max(20).optional(),
  classTest4: z.number().min(0).max(20).optional(),
  finalExam: z.number().min(0).max(210).optional(),
});

const subjectMarksValidationSchema = z.object({
  subjectName: z.string(),
  marks: z.object({
    classTest1: z.number().min(0).max(20).optional(),
    classTest2: z.number().min(0).max(20).optional(),
    classTest3: z.number().min(0).max(20).optional(),
    classTest4: z.number().min(0).max(20).optional(),
    finalTerm: z.number().min(0).max(210).optional(),
  }),
});

const updateEnrolledCourseMarksValidationZodSchema = z.object({
  body: z.object({
    studentId: z.string(),
    courseId: z.string(),
    courseMarks: courseMarksValidationSchema.optional(),
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
