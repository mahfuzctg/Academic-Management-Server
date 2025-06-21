import { Schema, model } from 'mongoose';
import { TAcademicYear } from './academicYear.interface';

const academicYearSchema = new Schema<TAcademicYear>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicYear = model<TAcademicYear>(
  'AcademicYear',
  academicYearSchema,
);
