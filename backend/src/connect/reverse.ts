import mongoose from 'mongoose';
import Location from '../location/location.model';
import { connectDB } from './mongodb';
import axios from 'axios';
import ReverseGeocodingResponse from '../Nominatim/reverse.model';

export const REVERSE_GEOCODING_URL = 'http://localhost:8080/reverse'; // Example for Nominatim

const MAX_CONCURRENCY = 10; // Set the maximum number of concurrent requests

// Function to process the items with throttling
const processInBatches = async (items: any[], processItem: (item: any) => Promise<void>) => {
    let i = 0;
    const promises: Promise<void>[] = [];

    while (i < items.length) {
        if (promises.length >= MAX_CONCURRENCY) {
            await Promise.race(promises); // Wait for one to finish
        }

        const promise = processItem(items[i]);
        promises.push(promise);
        promise.finally(() => {
            promises.splice(promises.indexOf(promise), 1); // Remove completed promise
        });

        i++;
    }

    await Promise.all(promises); // Wait for all remaining promises to finish
};

const processItem = async (doorfrontData: any) => {
    const geoCoordinates = {
        type: 'Point',
        coordinates: [doorfrontData.longitude, doorfrontData.latitude], // [longitude, latitude]
    };
    const { coordinates } = geoCoordinates;
    
 
    try {
        // Fetch the formatted address using reverse geocoding
        const geoResponse = await axios.get(REVERSE_GEOCODING_URL, {
            params: {
                lat: coordinates[1], // Latitude
                lon: coordinates[0], // Longitude
                format: 'json',
                addressdetails: 1,
            },
        });

        const reverseGeocodingData = geoResponse.data;
        const savedReverseGeocoding = await new ReverseGeocodingResponse(reverseGeocodingData).save();

        const newLocation = new Location({
            geoCoordinates: geoCoordinates,
            reviewHistory: [],
            doorType: doorfrontData.subtype,
            reverseGeocoding: savedReverseGeocoding._id,
        });
        // Save the new Location document
        await newLocation.save();
    } catch (error) {
        console.error('Error saving reverse geocoding data, skipping this entry:');
       
        console.log('Failed doorfrontData:', doorfrontData);
    }
};

const convert = async () => {
    await connectDB();
    await Location.deleteMany({});
    await ReverseGeocodingResponse.deleteMany({});
    console.time('Conversion Time'); // Start the timer
  
    try {
        // Find all documents in the DoorfrontData collection
        const doorfrontDataArray = await mongoose.connection.db!.collection('doorfront_data').find().toArray();
        console.log(`Length of doorfrontDataArray: ${doorfrontDataArray.length}`);
        
        if (doorfrontDataArray.length === 0) {
            console.log('Did not find the data');
            return;
        }

        console.log('Data found, processing continues...');
        
        // Process the data in batches with concurrency control
        await processInBatches(doorfrontDataArray, processItem);

        console.log('GeoCoordinates and addresses copied successfully!');
    } catch (error) {
        console.error('Error during conversion:', error);
    } finally {
        mongoose.connection.close();
        console.timeEnd('Conversion Time'); // End the timer and log the time taken
    }
};

convert();
