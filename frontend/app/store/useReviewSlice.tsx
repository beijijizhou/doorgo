/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand';
import { LocationData, Geolocation, ReviewData, LocationDataAPI, geolocation } from './interfaces';
import { fetchReviewHistory, updateReview } from '../api/review/reviewAPI';
import { MapSlice } from './useMapSlice';



const defaultDestinationData: LocationData = {
    geolocation,
    reviewHistory: [],
}
export interface ReviewSlice {
    destinationData: LocationData | null;
    sortedReviewsHistory: ReviewData[]; // Add sorted reviews to the store
    currentIndex: number; // Index for pagination
    reviewsPerPage: number;
    setCurrentIndex: (index: number) => void;
    setDestination: (newDestination: Geolocation) => void;
    updateReview: (review: ReviewData) => void;
    sortReviewHistory: (criteria: "default" | "likes" | "time") => void;
}

export const createReviewSlice: StateCreator<ReviewSlice & MapSlice, [], [], ReviewSlice> = (set, get) => ({
    destinationData: defaultDestinationData,
    sortedReviewsHistory: [], // Initialize sorted reviews
    currentIndex: 1, // Start at the first page
    reviewsPerPage: 5,
    setCurrentIndex: (index) => set({ currentIndex: index }),
    setDestination: async (newDestination: Geolocation) => {
        const map = get().map; // Access map from combined store
        if (map) {
            map.setCenter({
                lat: newDestination.geoCoordinates.coordinates[1],
                lng: newDestination.geoCoordinates.coordinates[0],
            });
        }

        const data: LocationDataAPI = await fetchReviewHistory(newDestination);
        set({
            destinationData: {
                geolocation: newDestination,
                reviewHistory: data.locationData.reviewHistory,
            },
            sortedReviewsHistory: data.locationData.reviewHistory, // Set sorted reviews to default
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
                sortedReviewsHistory: state.sortedReviewsHistory.map((review) =>
                    review._id === updatedReview._id ? updatedReview : review
                ),
            }));
        }
    },

    sortReviewHistory: (criteria) => {
        const state = get();
        if (!state.destinationData?.reviewHistory) return;

        let sortedReviews = [...state.destinationData.reviewHistory]; // Copy the review history

        if (criteria === "likes") {
            sortedReviews.sort((a, b) => b.likes - a.likes); // Sort by likes (descending)
        } else if (criteria === "time") {
            sortedReviews.sort(
                (a, b) =>
                    (Date.parse(b.createdAt || "") || 0) - (Date.parse(a.createdAt || "") || 0)
            );
        } else {
            // Reset to default order
            sortedReviews = [...state.destinationData.reviewHistory];
        }

        set({ sortedReviewsHistory: sortedReviews, currentIndex: 1 });
    },
});
