import mongoose, { Document, Schema } from 'mongoose';

export interface ILoanApplication extends Document {
  applicantName: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected' | 'approved';
  createdBy: mongoose.Types.ObjectId;
}

const LoanApplicationSchema: Schema = new Schema<ILoanApplication>(
  {
    applicantName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'approved'],
      default: 'pending',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const LoanApplication = mongoose.model<ILoanApplication>('LoanApplication', LoanApplicationSchema);
export default LoanApplication;
