import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Announcement } from './announcement.model';
import { AnnouncementServices } from './announcement.service';

const createAnnouncement = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const userRole = req.user?.role;

  const result = await AnnouncementServices.createAnnouncementIntoDB(
    req.body,
    userId,
    userRole,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Announcement created successfully',
    data: result,
  });
});

const getAllAnnouncements = catchAsync(async (req, res) => {
  const result = await AnnouncementServices.getAllAnnouncementsFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Announcements retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAnnouncementsByUserId = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await AnnouncementServices.getAnnouncementsByUserIdFromDB(
    userId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User announcements retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAnnouncement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AnnouncementServices.getSingleAnnouncementFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Announcement retrieved successfully',
    data: result,
  });
});

const updateAnnouncement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  // Check if the announcement belongs to the user
  const announcement = await Announcement.findById(id);
  if (announcement?.createdBy !== userId) {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'You can only update your own announcements',
      data: null,
    });
  }

  const result = await AnnouncementServices.updateAnnouncementIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Announcement updated successfully',
    data: result,
  });
});

const deleteAnnouncement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  // Check if the announcement belongs to the user
  const announcement = await Announcement.findById(id);
  if (announcement?.createdBy !== userId) {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'You can only delete your own announcements',
      data: null,
    });
  }

  const result = await AnnouncementServices.deleteAnnouncementFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Announcement deleted successfully',
    data: result,
  });
});

export const AnnouncementControllers = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementsByUserId,
  getSingleAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
