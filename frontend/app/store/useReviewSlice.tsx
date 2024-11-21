/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand';
import { LocationData, Geolocation, ReviewData, LocationDataAPI } from './interfaces';
import { fetchReviewHistory, updateReview } from '../api/review/reviewAPI';
import { MapSlice } from './useMapSlice';

const geolocation:Geolocation = {
    geoCoordinates: {
        type: "Point",
        coordinates: [-73.9553663, 40.7656066], // [longitude, latitude]
    },
    formatted_address: "1305 York Ave, New York, NY 10021, USA",
    name: "1305 York Ave",
    place_id: "ChIJdbJa3MNYwokRbt4-Xg85VBY",
};

const defaultDestinationData: LocationData = {
    geolocation,
    reviewHistory: [],
}
export interface ReviewSlice {
    destinationData: LocationData | null,
    setDestination: (newDestination: Geolocation) => void;
    updateReview: (review: ReviewData) => void;
}

export const createReviewSlice: StateCreator<ReviewSlice & MapSlice, [], [], ReviewSlice> = (set, get) => ({
    destinationData: defaultDestinationData,
    setDestination: async (newDestination: Geolocation) => {
        const map = get().map; // Access map from combined store
        if (map) {
            map.setCenter({ lat: newDestination.geoCoordinates.coordinates[1], lng: newDestination.geoCoordinates.coordinates[0] });
        }
        const data: LocationDataAPI = await fetchReviewHistory(newDestination)
        // if (!data.isExact) {
        //     alert("Clostest location")
        // }
        console.log(data)
        set({
            destinationData: {
                geolocation: newDestination,
                reviewHistory: data.locationData.reviewHistory,
            },
        });
    },

    updateReview: async (updatedReview: ReviewData) => {
        const response = await updateReview(updatedReview);
        if (response.success) {
            set((state) => ({
                destinationData: {
                    ...state.destinationData!,
                    reviewHistory: state.destinationData!.reviewHistory.map((review) =>
                        review._id === updatedReview._id ? updatedReview : review
                    ),
                },
            }));
        }
    },
});