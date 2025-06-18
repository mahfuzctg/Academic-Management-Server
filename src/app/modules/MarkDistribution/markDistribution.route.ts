import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { MarkDistributionController } from './MarkDistribution.Controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.faculty),
  MarkDistributionController.createMark,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  MarkDistributionController.getAllMarks,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.faculty,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
  ),
  MarkDistributionController.getSingleMark,
);
router.patch(
  '/:id',
  auth(USER_ROLE.faculty),
  MarkDistributionController.updateMark,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  MarkDistributionController.deleteMark,
);

export const MarkDistributionRoutes = router;
