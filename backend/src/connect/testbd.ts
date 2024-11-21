import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Location from './../location/location.model'; // Adjust to your schema path
import Review from './../review/review.model';
import { DB_URL } from './mongodb';
import { distance, latlng, reverse } from '../util/map';
const testCoordinate: latlng = [40.7178742, -74.0117827]; // BMCC


const seedDatabase = async () => {
    await mongoose.connect(DB_URL); // Adjust to your connection string

    // Clear existing data
    await Location.deleteMany({});
    await Review.deleteMany({});


    // Generate locations
    // Convert the generated strings to numbers if needed
    const size = 1000;
    const distance_array = Array(size).fill(0);


    for (let i = 0; i < size; i++) {
        const nearbyCoordinate = faker.location.nearbyGPSCoordinate({ origin: testCoordinate, radius: 0.01, isMetric: true })
        const lnglat = reverse(nearbyCoordinate);
        const newLocation = new Location({
            geoCoordinates: {
                type: 'Point',
                coordinates: lnglat,
            },
            formatted_address: faker.location.streetAddress(),
            name: faker.company.name(),
            reviewHistory: [],
        });
        distance_array[i] = distance(nearbyCoordinate, testCoordinate)

        // // Generate reviews for each location
        for (let j = 0; j < 5; j++) {
            const newReview = await Review.create({
                clueDescriptions: {
                    [faker.lorem.word()]: faker.lorem.word(),
                },
                review: faker.lorem.paragraph(),
                likes: faker.number.int({ min: 10, max: 100 }),
            });
            newLocation.reviewHistory.push(newReview._id);
        }

        await newLocation.save();
    }
    const minDistance = Math.min(...distance_array);
    console.log(minDistance);
    console.log('Database seeded successfully!');
    mongoose.connection.close();
};

const test = () => {
    const nearbyCoordinate = faker.location.nearbyGPSCoordinate({ origin: testCoordinate, radius: 1, isMetric: true })

    const lnglat = [nearbyCoordinate[1], nearbyCoordinate[0]]
    console.log(testCoordinate, nearbyCoordinate, lnglat)
    const dinstace = distance(nearbyCoordinate, testCoordinate)
    console.log(dinstace)
}
seedDatabase();
// test()
