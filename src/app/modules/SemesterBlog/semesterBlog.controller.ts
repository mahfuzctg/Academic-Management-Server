import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterBlogServices } from './semesterBlog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await SemesterBlogServices.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await SemesterBlogServices.getAllBlogsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester blogs retrieved successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const result = await SemesterBlogServices.getSingleBlogFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester blog retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await SemesterBlogServices.updateBlogIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await SemesterBlogServices.deleteBlogFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester blog deleted successfully',
    data: result,
  });
});

const voteBlog = catchAsync(async (req, res) => {
  const result = await SemesterBlogServices.voteBlog(
    req.params.id,
    req.user._id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Voted successfully',
    data: result,
  });
});

export const SemesterBlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  voteBlog,
};
