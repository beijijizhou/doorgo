import mongoose, { Schema } from 'mongoose';
// LocationType Schema
const locationSchema = new Schema({
  geoCoordinates: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },

  doorType: { type: String, required: false },
  formatted_address: { type: String, required: false },
  name: { type: String, required: false },
  reviewHistory: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // Array of ObjectId references to Review
  reverseGeocoding: { type: Schema.Types.ObjectId, ref: 'ReverseGeocodingResponse' }, // Embedding Reverse Geocoding Response

});
locationSchema.index({ geoCoordinates: '2dsphere' });
// Create the Location model
const Location = mongoose.model('Location', locationSchema);
// Add this line to create a 2dsphere index on geoCoordinates


export default Location;
