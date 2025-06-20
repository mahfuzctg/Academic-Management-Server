import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicYearServices } from './academicYear.service';

const createAcademicYear = catchAsync(async (req, res) => {
  const result = await AcademicYearServices.createAcademicYearIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic year is created successfully',
    data: result,
  });
});

const getAllAcademicYears = catchAsync(async (req, res) => {
  const result = await AcademicYearServices.getAllAcademicYearsFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic years are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicYear = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicYearServices.getSingleAcademicYearFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic year is retrieved successfully',
    data: result,
  });
});

const updateAcademicYear = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicYearServices.updateAcademicYearIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic year is updated successfully',
    data: result,
  });
});

const deleteAcademicYear = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicYearServices.deleteAcademicYearFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic year is deleted successfully',
    data: result,
  });
});

export const AcademicYearControllers = {
  createAcademicYear,
  getAllAcademicYears,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
};
