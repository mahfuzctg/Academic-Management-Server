import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { JobControllers } from './job.controller';
import { JobValidations } from './job.validation';

const router = express.Router();

router.post(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  validateRequest(JobValidations.createJobZodSchema),
  JobControllers.createJob,
);

router.get('/', JobControllers.getAllJobs);

router.get('/:id', JobControllers.getSingleJob);

router.patch(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  validateRequest(JobValidations.updateJobZodSchema),
  JobControllers.updateJob,
);

router.delete(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  JobControllers.deleteJob,
);

router.patch(
  '/:id/apply',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  JobControllers.applyJob,
);

export const JobRoutes = router;
