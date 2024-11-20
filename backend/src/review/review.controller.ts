import { Request, Response } from 'express';
import Review from './review.model'; // Import Review model
import Location from '../location/location.model'; // Import Location model

export const saveReview = async (req: Request, res: Response) => {
  const { geolocation, reviewData } = req.body;
  const { clueDescriptions, review } = reviewData;

  try {
    // Create a new review document
    const newReview = await Review.create({ clueDescriptions, review });

    // Try to find the location in the Location collection
    let locationDoc = await Location.findOne({
      "geoCoordinates.coordinates": [geolocation.lng, geolocation.lat], // Update to match the coordinates schema
    });

    if (locationDoc) {
      // If the location exists, add the new review's ObjectId to the reviewHistory array
      locationDoc.reviewHistory.push(newReview._id);
      await locationDoc.save();
    } else {
      // If the location doesn't exist, create a new location document with the review
      locationDoc = await Location.create({
        geoCoordinates: { // Use geoCoordinates for location data
          type: 'Point',
          coordinates: [geolocation.lng, geolocation.lat],
        },
        formatted_address:geolocation.formatted_address,
        name:geolocation.name,
        reviewHistory: [newReview._id],
      });
    }

    res.status(201).json({
      message: 'Review saved successfully',
      review: newReview,
      location: locationDoc,
    });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Error saving review', error });
  }
};


export const fetchReviewHistory = async (req: Request, res: Response) => {
  try {
    const { geolocation } = req.body;
    // Find the location by latitude and longitude
    console.log(geolocation)
    let locationDoc = await Location.findOne({
      "geoCoordinates.coordinates": [geolocation.lng, geolocation.lat], // Update to match the coordinates schema
    }).populate('reviewHistory');
    console.log("find exaction location", locationDoc);
    
    if (!locationDoc) {
      const nearbyLocations = await findLocationByProximity(geolocation.lat, geolocation.lng);
      console.log("find close location", nearbyLocations);
      if (!nearbyLocations.length) {
        res.status(404).json({ message: 'Location not found' });
        return;
      } 

      res.status(200).json({ reviewHistory: nearbyLocations[0].reviewHistory });
      return
    }
    // Return the reviews associated with the location
    res.status(200).json({ reviewHistory: locationDoc.reviewHistory });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const findLocationByProximity = async (lat: number, lng: number) => {
  try {
    const query = {
      geoCoordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: 100000, // Adjust this distance (in meters) as needed
        },
      },
    };
    
    // Find and return up to 5 nearby locations
    const results = await Location.find(query).limit(5).populate("reviewHistory");
    return results;
  } catch (error) {
    console.error('Error in proximity search:', error);
    return [];
  }
};
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { reviewData } = req.body;
    console.log("Received review data:", reviewData, reviewData._id);

    // Use findOneAndUpdate to locate the review by _id and update its data
    const reviewDoc = await Review.findOneAndUpdate(
      { _id: reviewData._id }, // Match by review ID
      {
        $set: {
          clueDescriptions: reviewData.clueDescriptions,
          review: reviewData.review,
          likes: reviewData.likes
        }
      },
      { new: true } // Return the updated document
    );

    if (!reviewDoc) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully", updatedReview: reviewDoc
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  saveReview,
  fetchReviewHistory,
  updateReview,
}