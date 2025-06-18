import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MarkDistributionService } from './MarkDistribution.Service';

const createMark = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkDistributionService.createMark(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks distributed successfully!',
    data: result,
  });
});

const getAllMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkDistributionService.getAllMarks(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks fetched successfully!',
    data: result,
  });
});

const getSingleMark = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkDistributionService.getSingleMark(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single mark record fetched successfully!',
    data: result,
  });
});

const updateMark = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkDistributionService.updateMark(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mark updated successfully!',
    data: result,
  });
});

const deleteMark = catchAsync(async (req: Request, res: Response) => {
  const result = await MarkDistributionService.deleteMark(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mark deleted successfully!',
    data: result,
  });
});

export const MarkDistributionController = {
  createMark,
  getAllMarks,
  getSingleMark,
  updateMark,
  deleteMark,
};
