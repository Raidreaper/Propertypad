import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  name: string;
  address: string;
  units: number;
  occupancy: string;
  status: 'Active' | 'Inactive';
  imageUrl?: string;
  images?: string[];
  owner: mongoose.Types.ObjectId;
}

const PropertySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    units: { type: Number, required: true, min: 0 },
    occupancy: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    imageUrl: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProperty>('Property', PropertySchema); 