import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { AcademicYearControllers } from './academicYear.controller';
import { AcademicYearValidation } from './academicYear.validation';

const router = express.Router();

router.post(
  '/create-academic-year',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicYearValidation.createAcademicYearValidationSchema),
  AcademicYearControllers.createAcademicYear,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicYearControllers.getSingleAcademicYear,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicYearValidation.updateAcademicYearValidationSchema),
  AcademicYearControllers.updateAcademicYear,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicYearControllers.deleteAcademicYear,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicYearControllers.getAllAcademicYears,
);

export const AcademicYearRoutes = router;
