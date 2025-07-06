import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { AnnouncementControllers } from './announcement.controller';
import { AnnouncementValidations } from './announcement.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(AnnouncementValidations.createAnnouncementZodSchema),
  AnnouncementControllers.createAnnouncement,
);

router.get('/', AnnouncementControllers.getAllAnnouncements);

router.get('/:id', AnnouncementControllers.getSingleAnnouncement);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(AnnouncementValidations.updateAnnouncementZodSchema),
  AnnouncementControllers.updateAnnouncement,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  AnnouncementControllers.deleteAnnouncement,
);

export const AnnouncementRoutes = router;
