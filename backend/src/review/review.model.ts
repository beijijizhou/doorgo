// review.model.ts
import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  clueDescriptions: { type: Map, of: String },
  review: { type: String, required: true },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;


export interface ReviewType extends Document {
  clueDescriptions: Map<string, string>;
  review: string;
  likes: number;
  createdAt: Date; // Automatically added by `{ timestamps: true }`
  updatedAt: Date; // Automatically added by `{ timestamps: true }`
}

