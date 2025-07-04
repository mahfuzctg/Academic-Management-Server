import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCoursefaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const {
    preRequisiteCourses,
    defaultSubjects,
    optionalSubjects,
    ...courseRemainingData
  } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //step1: basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }

    // Handle defaultSubjects
    if (defaultSubjects && defaultSubjects.length > 0) {
      // filter out the deleted fields
      const deletedDefaultSubjects = defaultSubjects
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);

      const deletedDefaultSubjectsResult = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            defaultSubjects: { name: { $in: deletedDefaultSubjects } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedDefaultSubjectsResult) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // filter out the new subject fields
      const newDefaultSubjects = defaultSubjects?.filter(
        (el) => el.name && !el.isDeleted,
      );

      const newDefaultSubjectsResult = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { defaultSubjects: { $each: newDefaultSubjects } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newDefaultSubjectsResult) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }

    // Handle optionalSubjects
    if (optionalSubjects && optionalSubjects.length > 0) {
      // filter out the deleted fields
      const deletedOptionalSubjects = optionalSubjects
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);

      const deletedOptionalSubjectsResult = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            optionalSubjects: { name: { $in: deletedOptionalSubjects } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedOptionalSubjectsResult) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // filter out the new subject fields
      const newOptionalSubjects = optionalSubjects?.filter(
        (el) => el.name && !el.isDeleted,
      );

      const newOptionalSubjectsResult = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { optionalSubjects: { $each: newOptionalSubjects } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newOptionalSubjectsResult) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const getFacultiesWithCourseFromDB = async (courseId: string) => {
  const result = await CourseFaculty.findOne({ course: courseId }).populate(
    'faculties',
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  getFacultiesWithCourseFromDB,
  removeFacultiesFromCourseFromDB,
};
