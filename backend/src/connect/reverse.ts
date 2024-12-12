import mongoose from 'mongoose';
import Location from '../location/location.model';
import { connectDB } from './mongodb';
import axios from 'axios';
import ReverseGeocodingResponse from '../Nominatim/reverse.model';
// Replace this with the actual reverse geocoding service (e.g., Nominatim or Google Maps)
const REVERSE_GEOCODING_URL = 'http://localhost:8080/reverse'; // Example for Nominatim

const convert = async () => {
    await connectDB();
    await Location.deleteMany({});
    await ReverseGeocodingResponse.deleteMany({});
    try {
        // Find all documents in the DoorfrontData collection
        const doorfrontData = await mongoose.connection.db!.collection('doorfront').find().toArray();
        // const partData = doorfrontData.slice(0,1)
        // Iterate over each document
        for (const data of doorfrontData) {
            const { coordinates } = data.geoCoordinates;

            // Fetch the formatted address using reverse geocoding
            const geoResponse = await axios.get(REVERSE_GEOCODING_URL, {
                params: {
                    lat: coordinates[1], // Latitude
                    lon: coordinates[0], // Longitude
                    format: 'json',
                    addressdetails: 1,
                },
            });

            const reverseGeodingData = geoResponse.data
            const savedReverseGeocoding = await new ReverseGeocodingResponse(reverseGeodingData).save();
            // console.log(savedReverseGeocoding)
            // Create a new Location document
            const newLocation = new Location({
                geoCoordinates: data.geoCoordinates,
                reviewHistory: [],
                doorType: reverseGeodingData.subtype,
                reverseGeocoding: savedReverseGeocoding._id,
            });

            // Save the new Location document
            await newLocation.save();
        }

        console.log('GeoCoordinates and addresses copied successfully!');
    } catch (error) {
        console.error('Error during conversion:', error);
    } finally {
        mongoose.connection.close();
    }
};

convert();
