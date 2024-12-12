import mongoose from 'mongoose';
import Location from './../location/location.model';
import Doorfront from '../doorfront/doorfront.model';
import { connectDB } from './mongodb';
const convert = async () => {
    await connectDB();
    await Location.deleteMany({})
    // const rawDoorfrontData = await mongoose.connection.db!.collection('doorfront').find();
    // console.log('Raw doorfront data:', rawDoorfrontData);

    try {
        // Find all documents in the DoorfrontData collection
        const doorfrontData =await mongoose.connection.db!.collection('doorfront').find().toArray();

        // Iterate over each document
        for (const data of doorfrontData) {
            // Create a new Location document
            const newLocation = new Location({
                geoCoordinates: data.geoCoordinates,
                formatted_address: "", // Set default values or map accordingly
                name: "",
                place_id: "",
                reviewHistory: [],
                subtype: data.subtype
            });

            // Save the new Location document
            await newLocation.save();
        }

        console.log('GeoCoordinates copied successfully!');
    } catch (error) {
        console.error('Error copying GeoCoordinates:', error);
    } finally {
        mongoose.connection.close();
    }
}

convert();
