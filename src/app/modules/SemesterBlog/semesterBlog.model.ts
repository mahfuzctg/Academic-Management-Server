import { Schema, model } from 'mongoose';
import { TSemesterBlog } from './semesterBlog.interface';

const semesterBlogSchema = new Schema<TSemesterBlog>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    semesterNo: { type: Number, required: true },
    description: { type: String, required: true },
    link: { type: String },
    bannerImage: { type: String },
    profileImage: { type: String },
    isDeleted: { type: Boolean, default: false },
    votedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    votes: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Top-Writer', 'Reguler', 'Basic'],
      default: 'Basic',
    },
  },
  { timestamps: true },
);

export const SemesterBlog = model<TSemesterBlog>(
  'SemesterBlog',
  semesterBlogSchema,
);
