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

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
