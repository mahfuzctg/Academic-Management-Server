import { z } from 'zod';

const createJobZodSchema = z.object({
  body: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    bannerImage: z.string().optional(),
    profileImage: z.string().optional(),
    author: z.string().optional(),
    minPrice: z.number(),
    maxPrice: z.number(),
    deadline: z.string(),
    vacancy: z.number(),
    workMode: z.enum(['remote', 'onsite', 'hybrid']),
  }),
});

const updateJobZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    bannerImage: z.string().optional(),
    profileImage: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    deadline: z.string().optional(),
    vacancy: z.number().optional(),
    workMode: z.enum(['remote', 'onsite', 'hybrid']).optional(),
  }),
});

export const JobValidations = {
  createJobZodSchema,
  updateJobZodSchema,
};
