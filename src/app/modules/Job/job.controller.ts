import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { JobServices } from './job.service';

const createJob = catchAsync(async (req, res) => {
  const result = await JobServices.createJob(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Job posted successfully',
    data: result,
  });
});

const getAllJobs = catchAsync(async (_req, res) => {
  const result = await JobServices.getAllJobs();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs retrieved successfully',
    data: result,
  });
});

const getSingleJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobServices.getSingleJob(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job retrieved successfully',
    data: result,
  });
});

const updateJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobServices.updateJob(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job updated successfully',
    data: result,
  });
});

const deleteJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobServices.deleteJob(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job deleted successfully',
    data: result,
  });
});

export const JobControllers = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};
