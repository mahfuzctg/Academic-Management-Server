import { TJob } from './job.interface';
import { Job } from './job.model';

const createJob = async (payload: TJob) => {
  return await Job.create(payload);
};

const getAllJobs = async () => {
  return await Job.find({ isDeleted: false });
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

export const JobServices = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};
