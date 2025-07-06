import { Schema, model } from 'mongoose';
import { TAnnouncement } from './announcement.interface';

const announcementSchema = new Schema<TAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    profileImg: { type: String },
    status: { type: String },
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
