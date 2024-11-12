import { Request, Response } from 'express';
import Review from './review.model'; // Import Review model
import Location from '../location/location.model'; // Import Location model

export const saveReview = async (req: Request, res: Response) => {
  console.log("received")
  const { geolocation, reviewData } = req.body;
  const { clueDescriptions, review } = reviewData;
  console.log(req.body)
  console.log(reviewData)
  console.log(clueDescriptions, review)
  try {
    // Create a new review document
    const newReview = await Review.create({ clueDescriptions, review });
    // Try to find the location in the Location collection
    let locationDoc = await Location.findOne({
      lat: geolocation.lat,
      lng: geolocation.lng,
    });

    if (locationDoc) {
      // If the location exists, add the new review's ObjectId to the reviews array
      locationDoc.reviewHistory.push(newReview._id);
      await locationDoc.save();
    } else {
      // If the location doesn't exist, create a new location document with the review
      locationDoc = await Location.create({
        ...geolocation,
        reviewHistory: [newReview._id],
      });
    }

    res.status(201).json({
      message: 'Review saved successfully',
      review: newReview,
      location: locationDoc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving review', error });
  }
};

export const fetchAllReviews = async (req: Request, res: Response) => {
  try {
    const { geolocation } = req.body;
    console.log(geolocation)
    // Find the location by latitude and longitude
    const locationDoc = await Location.findOne({
      lat: geolocation.lat,
      lng: geolocation.lng,
    }).populate('reviewHistory'); 

    if (!locationDoc) {
       res.status(404).json({ message: 'Location not found' });
       return 
    }
    // Return the reviews associated with the location
    res.status(200).json({ reviewHistory: locationDoc.reviewHistory});
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  saveReview,
  fetchAllReviews,
}