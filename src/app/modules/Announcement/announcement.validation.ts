import { z } from 'zod';

const createAnnouncementZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    type: z.string({ required_error: 'Type is required' }),
    startDate: z.string({ required_error: 'Start date is required' }),
    endDate: z.string({ required_error: 'End date is required' }),
    priority: z.enum(['low', 'medium', 'high'], {
      required_error: 'Priority is required',
    }),
    isActive: z.boolean().default(true),
  }),
});

const updateAnnouncementZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    type: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const AnnouncementValidations = {
  createAnnouncementZodSchema,
  updateAnnouncementZodSchema,
};
