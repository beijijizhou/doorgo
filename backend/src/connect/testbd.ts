import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Location from './../location/location.model'; // Adjust to your schema path
import Review from './../review/review.model';
import { DB_URL } from './mongodb';

const seedDatabase = async () => {
    await mongoose.connect(DB_URL); // Adjust to your connection string

    // Clear existing data
    await Location.deleteMany({});
    await Review.deleteMany({});
    const testCoordinate: [number, number] = [40.7656066, -73.9553663]; // Explicitly type as a tuple

    // Generate locations
    // Convert the generated strings to numbers if needed

  

    for (let i = 0; i < 10; i++) {
        const nearbyCoordinate = faker.location.nearbyGPSCoordinate({ origin: testCoordinate, radius: 1, isMetric: true })

        const newLocation = new Location({
            geoCoordinates: {
                type: 'Point',
                coordinates: nearbyCoordinate,
            },
            formatted_address: faker.location.streetAddress(),
            name: faker.company.name(),
            reviewHistory: [],
        });

        // // Generate reviews for each location
        for (let j = 0; j < 5; j++) {
            const newReview = await Review.create({
                clueDescriptions: {
                    [faker.lorem.word()]: faker.lorem.text(),
                },
                review: faker.lorem.paragraph(),
                likes: faker.number.int({ min: 10, max: 100 }),
            });
            newLocation.reviewHistory.push(newReview._id);
        }

        await newLocation.save();
    }

    console.log('Database seeded successfully!');
    mongoose.connection.close();
};

seedDatabase();
