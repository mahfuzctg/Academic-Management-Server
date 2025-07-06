import QueryBuilder from '../../builder/QueryBuilder';
import { AnnouncementSearchableFields } from './announcement.constant';
import { TAnnouncement } from './announcement.interface';
import { Announcement } from './announcement.model';

const createAnnouncementIntoDB = async (
  payload: TAnnouncement,
  userId: string,
  userRole: string,
) => {
  const announcementData = {
    ...payload,
    createdBy: userId,
    userRole: userRole,
  };
  return await Announcement.create(announcementData);
};

const getAllAnnouncementsFromDB = async (query: Record<string, unknown>) => {
  const announcementQuery = new QueryBuilder(Announcement.find(), query)
    .search(AnnouncementSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await announcementQuery.modelQuery;
  const meta = await announcementQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAnnouncementsByUserIdFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const announcementQuery = new QueryBuilder(
    Announcement.find({ createdBy: userId }),
    query,
  )
    .search(AnnouncementSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await announcementQuery.modelQuery;
  const meta = await announcementQuery.countTotal();

  return {
    meta,
    result,
  };
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
  getAnnouncementsByUserIdFromDB,
  getSingleAnnouncementFromDB,
  updateAnnouncementIntoDB,
  deleteAnnouncementFromDB,
};
