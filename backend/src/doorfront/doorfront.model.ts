import mongoose, { Schema } from 'mongoose';


// Define the schema for geoCoordinates
const geoCoordinatesSchema = new Schema({
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
});

// Define the main schema
const DoorfrontSchema = new Schema({
  object_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  image_id: {
    type: String,  // UUID as a string
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  human_label_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  label_id: {
    type: String,  // UUID as a string
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  subtype: {
    type: String,
    required: true,
  },
  labeledby: {
    type: String,
    required: true,
  },
  markerpov_heading: {
    type: Number,
    required: false,
  },
  markerpov_pitch: {
    type: Number,
    required: false,
  },
  markerpov_zoom: {
    type: Number,
    required: false,
  },
  geoCoordinates: {
    type: geoCoordinatesSchema, // This is the nested geospatial data
    required: true,
  },
});

// Create and export the model
const Doorfront = mongoose.model('Doorfront', DoorfrontSchema);
export default Doorfront 
