/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  return await Blog.create(payload);
};

const getAllBlogsFromDB = async () => {
  return await Blog.find({ isDeleted: false });
};

const getSingleBlogFromDB = async (id: string) => {
  return await Blog.findById(id);
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  return await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteBlogFromDB = async (id: string) => {
  return await Blog.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const voteBlog = async (blogId: string, userId: string) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Check if user already voted
  if (blog.votedBy?.some((id) => id.toString() === userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User has already voted');
  }

  // Add user to votedBy array and increment votes
  blog.votedBy?.push(userId as any);
  blog.votes = (blog.votes || 0) + 1;

  await blog.save();

  return blog;
};
export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  voteBlog,
};
