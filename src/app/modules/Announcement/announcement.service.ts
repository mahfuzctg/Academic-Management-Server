import { TAnnouncement } from './announcement.interface';
import { Announcement } from './announcement.model';

const createAnnouncementIntoDB = async (payload: TAnnouncement) => {
  return await Announcement.create(payload);
};

const getAllAnnouncementsFromDB = async () => {
  return await Announcement.find({ isDeleted: false });
};

const getSingleAnnouncementFromDB = async (id: string) => {
  return await Announcement.findById(id);
};

const updateAnnouncementIntoDB = async (
  id: string,
  payload: Partial<TAnnouncement>,
) => {
  return await Announcement.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteAnnouncementFromDB = async (id: string) => {
  return await Announcement.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

export const AnnouncementServices = {
  createAnnouncementIntoDB,
  getAllAnnouncementsFromDB,
  getSingleAnnouncementFromDB,
  updateAnnouncementIntoDB,
  deleteAnnouncementFromDB,
};
