import { z } from 'zod';

const createSemesterBlogZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    category: z.string({ required_error: 'Category is required' }),
    semesterNo: z.number({ required_error: 'Semester No is required' }),
    description: z.string({ required_error: 'Description is required' }),
    link: z.string().optional(),
    bannerImage: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

const updateSemesterBlogZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    semesterNo: z.number().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
    bannerImage: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const SemesterBlogValidations = {
  createSemesterBlogZodSchema,
  updateSemesterBlogZodSchema,
};
