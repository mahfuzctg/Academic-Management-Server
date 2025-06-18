import { Schema, model } from 'mongoose';
import { TMarkDistribution } from './MarkDistribution.Interface';

const markDistributionSchema = new Schema<TMarkDistribution>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'OfferedCourse',
      required: true,
    },
    classTests: {
      type: [Number],
      validate: [
        (val: number[]) => val.length === 4,
        'There must be exactly 4 class test marks',
      ],
      required: true,
    },
    finalExam: { type: Number, required: true },
    totalMarks: { type: Number },
    resultStatus: {
      type: String,
      enum: ['PASS', 'FAIL', 'INCOMPLETE'],
      default: 'INCOMPLETE',
    },
  },
  { timestamps: true },
);

export const MarkDistribution = model<TMarkDistribution>(
  'MarkDistribution',
  markDistributionSchema,
);
