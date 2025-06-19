import { z } from 'zod';

const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    category: z.string({ required_error: 'Category is required' }),
    description: z.string({ required_error: 'Description is required' }),
    link: z.string().optional(),
    bannerImage: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
    bannerImage: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const BlogValidations = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
