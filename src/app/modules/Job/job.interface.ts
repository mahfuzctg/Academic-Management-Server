import { Types } from 'mongoose';

export type TJob = {
  title: string;
  category: string;
  description: string;
  bannerImage?: string;
  profileImage?: string;
  author: Types.ObjectId;
  minPrice: number;
  maxPrice: number;
  deadline: string;
  vacancy: number;

  workMode: 'remote' | 'onsite' | 'hybrid';
  isDeleted?: boolean;
  appliedBy?: Types.ObjectId[];
};
