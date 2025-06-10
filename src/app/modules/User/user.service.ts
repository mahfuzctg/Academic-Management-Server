/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { TFaculty } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { TStudent } from '../Student/student.interface';
import { Student } from '../Student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password!;
  userData.role = 'student';
  userData.email = payload.email;

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admission semester not found');
  }

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName ?? ''}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password!;
  userData.role = 'faculty';
  userData.email = payload.email;

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic department not found');
  }

  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateFacultyId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName ?? ''}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password!;
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateAdminId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName ?? ''}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    payload.id = newUser[0]._id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const getMe = async (userId: string, role: string) => {
  if (role === 'student') {
    return await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    return await Admin.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    return await Faculty.findOne({ id: userId }).populate('user');
  }
  return null;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
