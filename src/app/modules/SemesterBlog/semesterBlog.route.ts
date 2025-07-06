import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { SemesterBlogControllers } from './semesterBlog.controller';
import { SemesterBlogValidations } from './semesterBlog.validation';

const router = express.Router();

router.post(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  validateRequest(SemesterBlogValidations.createSemesterBlogZodSchema),
  SemesterBlogControllers.createBlog,
);

router.get('/', SemesterBlogControllers.getAllBlogs);
router.get('/:id', SemesterBlogControllers.getSingleBlog);

router.patch(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  validateRequest(SemesterBlogValidations.updateSemesterBlogZodSchema),
  SemesterBlogControllers.updateBlog,
);

router.delete(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterBlogControllers.deleteBlog,
);

router.patch(
  '/:id/vote',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterBlogControllers.voteBlog,
);

export const SemesterBlogRoutes = router;
