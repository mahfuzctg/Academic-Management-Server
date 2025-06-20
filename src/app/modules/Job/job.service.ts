import httpStatus from 'http-status';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { TJob } from './job.interface';
import { Job } from './job.model';

const createJob = async (payload: TJob) => {
  return await Job.create(payload);
};

const getAllJobs = async () => {
  return await Job.find({ isDeleted: false }).populate(
    'author',
    'name profileImage',
  );
};

const getSingleJob = async (id: string) => {
  return await Job.findById(id);
};

const updateJob = async (id: string, payload: Partial<TJob>) => {
  return await Job.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteJob = async (id: string) => {
  return await Job.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const applyJob = async (jobId: string, userId: string) => {
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(jobId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid ID format');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const alreadyApplied = job.appliedBy?.some((id) =>
    id.equals(userId as unknown as Types.ObjectId),
  );
  if (alreadyApplied) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User has already applied for this job',
    );
  }

  job.appliedBy = job.appliedBy || [];
  job.appliedBy.push(new Types.ObjectId(userId));
  await job.save();

  return job;
};

export const JobServices = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  applyJob,
};
