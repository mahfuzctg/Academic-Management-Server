import { Types } from 'mongoose';

export type TSemesterBlogStatus = 'Top-Writer' | 'Reguler' | 'Basic';

export type TSemesterBlog = {
  title: string;
  category: string;
  semesterNo: number;
  description: string;
  link?: string;
  bannerImage?: string;
  profileImage?: string;
  isDeleted?: boolean;
  votes?: number;
  votedBy?: Types.ObjectId[];
  status?: TSemesterBlogStatus;
};
