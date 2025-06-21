import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicYearSearchableFields } from './academicYear.constant';
import { TAcademicYear } from './academicYear.interface';
import { AcademicYear } from './academicYear.model';

const createAcademicYearIntoDB = async (payload: TAcademicYear) => {
  const result = await AcademicYear.create(payload);
  return result;
};

const getAllAcademicYearsFromDB = async (query: Record<string, unknown>) => {
  const academicYearQuery = new QueryBuilder(AcademicYear.find(), query)
    .search(AcademicYearSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicYearQuery.modelQuery;
  const meta = await academicYearQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicYearFromDB = async (id: string) => {
  const result = await AcademicYear.findById(id);
  return result;
};

const updateAcademicYearIntoDB = async (
  id: string,
  payload: Partial<TAcademicYear>,
) => {
  const result = await AcademicYear.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicYearFromDB = async (id: string) => {
  const result = await AcademicYear.findByIdAndDelete(id);
  return result;
};

export const AcademicYearServices = {
  createAcademicYearIntoDB,
  getAllAcademicYearsFromDB,
  getSingleAcademicYearFromDB,
  updateAcademicYearIntoDB,
  deleteAcademicYearFromDB,
};
