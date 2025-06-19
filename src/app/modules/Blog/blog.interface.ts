export type TBlog = {
  title: string;
  category: string;
  description: string;
  link?: string;
  bannerImage?: string;
  profileImage?: string;
  isDeleted?: boolean;
  votes?: number;
};
