import { model, Schema } from 'mongoose';
import { TJob } from './job.interface';

const jobSchema = new Schema<TJob>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    bannerImage: { type: String },
    profileImage: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    deadline: { type: String, required: true },
    vacancy: { type: Number, required: true },
    workMode: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
    appliedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

export const Job = model<TJob>('Job', jobSchema);
