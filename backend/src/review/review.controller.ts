// import { LocationType } from '@/app/components/MapService/interfaces';
// import { Geolocation } from '@/app/store/interfaces';
import { Request, Response } from 'express';
import Review from './review.model'; // Import Review model
import Location from '../location/location.model'; // Import Location model
import { distance, latlng, lnglat, normalizeAddress, reverse } from '../util/mapHelper';
import { User, GeolocationType } from "../../../shared/interface"

export const saveReview = async (req: Request, res: Response) => {
  const { geolocation, reviewData } = req.body;
  const { coordinates } = geolocation.geoCoordinates

  const { clueDescriptions, review } = reviewData;
  try {
    // Create a new review document
    const newReview = await Review.create({ clueDescriptions, review });

    // Try to find the location in the Location collection
    let locationDoc = await Location.findOne({
      "geoCoordinates.coordinates": coordinates, // Update to match the coordinates schema
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
          coordinates: coordinates,
        },
        formatted_address: geolocation.formatted_address,
        name: geolocation.name,
        reviewHistory: [newReview._id],
      });
    }
    locationDoc = await Location.findById(locationDoc._id).populate('reviewHistory');

    res.status(201).json({
      message: 'Review saved successfully',
      locationData: locationDoc,
    });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Error saving review', error });
  }
};

export const fetchReviewHistory = async (req: Request, res: Response) => {
  console.log("fetch")

  try {
    const { geolocation } = req.body;
    const { coordinates } = geolocation.geoCoordinates
    const { formatted_address } = geolocation
    // console.log(coordinates, formatted_address)
    let locationDoc = await Location.findOne({
      "geoCoordinates.coordinates": coordinates, // Update to match the coordinates schema
    }).populate('reviewHistory');
    console.log("find exaction location", locationDoc);

    let isNearby = false;
    if (!locationDoc) {
      const nearbyLocations = await findLocationByProximity(coordinates, formatted_address);
      if (!nearbyLocations.length) {
        res.status(204).json({ message: 'No nearby locations found' });
        return;
      }
      // filterLocation(formatted_address, nearbyLocations)
      isNearby = !isNearby,
        // console.log(nearbyLocations[0].reviewHistory)

        res.status(200).json({ locationData: nearbyLocations[0], isNearby });
      return
    }
    // Return the reviews associated with the location
    res.status(200).json({ locationData: locationDoc, isNearby });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const findLocationByProximity = async (coordinates: lnglat, formatted_address: string) => {
  try {
    const query = {
      geoCoordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          $maxDistance: 100, // Adjust this distance (in meters) as needed
        },
      },
    };

    // Find and return up to 5 nearby locations
    const results = await Location.find(query).limit(10).populate("reviewHistory");
    console.log("input", coordinates)
    const resultsWithDistance = results.map(location => {
        // Normalize the addresses
        const normalizedLocationAddress = normalizeAddress(location!.formatted_address!);
        const normalizedInputAddress = normalizeAddress(formatted_address);

        // Calculate the geoDistance
        const geoDistance = distance(reverse(coordinates), reverse(location!.geoCoordinates!.coordinates as lnglat));
        console.log(geoDistance)
        // Only return the location if the normalized addresses match
        // if (normalizedLocationAddress === normalizedInputAddress) {
         
        // }

        // If the addresses don't match, return null or skip it
        return { ...location.toObject(), geoDistance };
      }).filter(location => location !== null);
    // console.log(resultsWithDistance[0].reviewHistory)
    return resultsWithDistance;
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

