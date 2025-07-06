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

// Get announcements by user ID (authenticated user's announcements)
router.get(
  '/my-announcements',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AnnouncementControllers.getAnnouncementsByUserId,
);

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
