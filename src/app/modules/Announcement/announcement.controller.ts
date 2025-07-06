import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AnnouncementServices } from './announcement.service';

const createAnnouncement = catchAsync(async (req, res) => {
  const result = await AnnouncementServices.createAnnouncementIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Announcement created successfully',
    data: result,
  });
});

const getAllAnnouncements = catchAsync(async (_req, res) => {
  const result = await AnnouncementServices.getAllAnnouncementsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Announcements retrieved successfully',
    data: result,
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
  getSingleAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
