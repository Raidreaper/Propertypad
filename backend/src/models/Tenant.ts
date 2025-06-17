import mongoose, { Document, Schema } from 'mongoose';

export interface ITenant extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  propertyId: mongoose.Types.ObjectId;
  leaseStart: Date;
  leaseEnd: Date;
  rentAmount: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const tenantSchema = new Schema<ITenant>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property ID is required']
    },
    leaseStart: {
      type: Date,
      required: [true, 'Lease start date is required']
    },
    leaseEnd: {
      type: Date,
      required: [true, 'Lease end date is required']
    },
    rentAmount: {
      type: Number,
      required: [true, 'Rent amount is required'],
      min: [0, 'Rent amount cannot be negative']
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

// Add index for faster queries
tenantSchema.index({ email: 1 });
tenantSchema.index({ propertyId: 1 });
tenantSchema.index({ status: 1 });

// Add compound index for name searches
tenantSchema.index({ firstName: 1, lastName: 1 });

export default mongoose.model<ITenant>('Tenant', tenantSchema); 