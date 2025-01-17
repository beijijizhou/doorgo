// import { LocationType } from '@/app/components/MapService/interfaces';
import mongoose, { Schema, Types } from 'mongoose';
import ReverseGeocodingResponse, { ReverseGeocodingResponseType } from '../Nominatim/reverse.model';
import Review, { ReviewType } from '../review/review.model';
export interface LocationType extends Document {
  geoCoordinates: {
    type: "Point";
    coordinates: [number, number]; // Longitude and Latitude
  };
  doorType?: string;
  nominatim_formatted_address?: string;
  name?: string;
  reviewHistory: Types.ObjectId[] | ReviewType[]; // ObjectId or populated Review documents
  reverseGeocoding: Types.ObjectId | ReverseGeocodingResponseType; // ObjectId or populated ReverseGeocodingResponse
}
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
  reviewHistory: [{ type: Schema.Types.ObjectId, ref: Review }], // Array of ObjectId references to Review
  reverseGeocoding: { type: Schema.Types.ObjectId, ref: ReverseGeocodingResponse },

});
locationSchema.index({ geoCoordinates: '2dsphere' });
// Create the Location model
const Location = mongoose.model('Location', locationSchema);
// Add this line to create a 2dsphere index on geoCoordinatesexport interface LocationType {




export default Location;
