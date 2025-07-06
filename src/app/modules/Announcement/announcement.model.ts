import { Schema, model } from 'mongoose';
import { TAnnouncement } from './announcement.interface';

const announcementSchema = new Schema<TAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, required: true },
    userRole: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Announcement = model<TAnnouncement>(
  'Announcement',
  announcementSchema,
);
