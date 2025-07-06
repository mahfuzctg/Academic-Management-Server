import { z } from 'zod';

const createAnnouncementZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    category: z.string({ required_error: 'Category is required' }),
    date: z.string({ required_error: 'Date is required' }),
    profileImg: z.string().optional(),
    status: z.string().optional(),
  }),
});

const updateAnnouncementZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    date: z.string().optional(),
    profileImg: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const AnnouncementValidations = {
  createAnnouncementZodSchema,
  updateAnnouncementZodSchema,
};
