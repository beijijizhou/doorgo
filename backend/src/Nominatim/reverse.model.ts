import mongoose, { Schema, Document } from 'mongoose';

interface Address {
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  [key: string]: string | undefined; // Allow flexibility for additional fields
}

interface BoundingBox {
  minLat: string;
  maxLat: string;
  minLon: string;
  maxLon: string;
}

interface ReverseGeocodingResponseType extends Document {
  place_id: number;

  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: BoundingBox;
}

const AddressSchema: Schema = new Schema({
  house_number: { type: String },
  road: { type: String },
  neighbourhood: { type: String },
  suburb: { type: String },
  city: { type: String },
  county: { type: String },
  state: { type: String },
  postcode: { type: String },
  country: { type: String },
  country_code: { type: String },
});

const BoundingBoxSchema: Schema = new Schema({
  minLat: { type: String, required: true },
  maxLat: { type: String, required: true },
  minLon: { type: String, required: true },
  maxLon: { type: String, required: true },
});

const ReverseGeocodingResponseSchema: Schema = new Schema({
  place_id: { type: Number, required: true },
  osm_type: { type: String, required: true },
  osm_id: { type: Number, required: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
  class: { type: String, required: true },
  type: { type: String, required: true },
  place_rank: { type: Number, required: true },
  importance: { type: Number, required: true },
  addresstype: { type: String, required: true },
  name: { type: String, default: '' },
  display_name: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  boundingbox: {
    type: BoundingBoxSchema,
    required: true,
    set: (bbox: string[]): BoundingBox => ({
      minLat: bbox[0],
      maxLat: bbox[1],
      minLon: bbox[2],
      maxLon: bbox[3],
    }),
  },
});
const ReverseGeocodingResponse = mongoose.model('ReverseGeocodingResponse',ReverseGeocodingResponseSchema);
// Add this line to create a 2dsphere index on geoCoordinates


export default ReverseGeocodingResponse;


