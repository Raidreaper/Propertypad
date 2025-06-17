import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  tenantId: mongoose.Types.ObjectId;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  notes?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: [true, 'Tenant ID is required']
    },
    amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
      min: [0, 'Payment amount cannot be negative']
    },
    paymentDate: {
      type: Date,
      required: [true, 'Payment date is required'],
      default: Date.now
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
      enum: ['cash', 'check', 'credit_card', 'bank_transfer', 'other']
    },
    notes: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

// Add indexes for faster queries
paymentSchema.index({ tenantId: 1 });
paymentSchema.index({ paymentDate: -1 });
paymentSchema.index({ status: 1 });

export default mongoose.model<IPayment>('Payment', paymentSchema); 