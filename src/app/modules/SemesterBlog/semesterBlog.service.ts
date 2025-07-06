import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSemesterBlog } from './semesterBlog.interface';
import { SemesterBlog } from './semesterBlog.model';

const createBlogIntoDB = async (payload: TSemesterBlog) => {
  return await SemesterBlog.create(payload);
};

const getAllBlogsFromDB = async () => {
  return await SemesterBlog.find({ isDeleted: false });
};

const getSingleBlogFromDB = async (id: string) => {
  return await SemesterBlog.findById(id);
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TSemesterBlog>,
) => {
  return await SemesterBlog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteBlogFromDB = async (id: string) => {
  return await SemesterBlog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

const voteBlog = async (blogId: string, userId: string) => {
  const blog = await SemesterBlog.findById(blogId);
  if (!blog) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');

  if (blog.votedBy?.some((id) => id.toString() === userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User has already voted');
  }

  blog.votedBy?.push(userId as any);
  blog.votes = (blog.votes || 0) + 1;

  // Status update logic
  if (blog.votes >= 3) blog.status = 'Top-Writer';
  else if (blog.votes === 2) blog.status = 'Reguler';
  else if (blog.votes === 1) blog.status = 'Basic';

  await blog.save();
  return blog;
};

export const SemesterBlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  voteBlog,
};
