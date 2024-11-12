import mongoose, { Schema } from 'mongoose';
// LocationType Schema
const locationSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  formatted_address: { type: String, required: true },
  name: { type: String, required: false },
  place_id: { type: String, required: false },
  reviewHistory: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // Array of ObjectId references to Review
});

// Create the Location model
const Location = mongoose.model('Location', locationSchema);

export default Location;
