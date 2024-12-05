/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand';
import { LocationData, Geolocation, ReviewData } from './interfaces';
import { fetchReviewHistory, updateReview, sendReview } from '../api/review/reviewAPI';
import { MapSlice } from './useMapSlice';




export interface ReviewSlice {
    geolocation: Geolocation | null;
    locationData: LocationData | null;
    currentIndex: number; // Index for pagination
    reviewsPerPage: number;
    showReviewHistory: boolean;
    setCurrentIndex: (index: number) => void;
    setDestination: (newDestination: Geolocation) => void;
    updateReview: (review: ReviewData) => void;
    sortReviewHistory: (criteria: "default" | "likes" | "time") => void;
    setShowReviewHistory: () => void;
    setNewReview: (review: ReviewData) => void;
}

export const createReviewSlice: StateCreator<ReviewSlice & MapSlice, [], [], ReviewSlice> = (set, get) => ({
    geolocation: null,
    locationData: null,
    currentIndex: 1, // Start at the first page
    reviewsPerPage: 5,
    showReviewHistory: true,
    setCurrentIndex: (index) => set({ currentIndex: index }),
    setShowReviewHistory: () => set((state) => ({ showReviewHistory: !state.showReviewHistory })),

    setNewReview: async (review: ReviewData) => {
        const { geolocation } = get();
        const data: LocationData = await sendReview(geolocation!, review);
        console.log(data)
        set({
            showReviewHistory: true,
            locationData: data,
        });

    },
    setDestination: async (newGeolocation: Geolocation) => {
        const { map, geolocation } = get(); // Access map from combined store
        if (map) {
            map.setCenter({
                lat: newGeolocation.geoCoordinates.coordinates[1],
                lng: newGeolocation.geoCoordinates.coordinates[0],
            });
        }
        const data: LocationData | null = await fetchReviewHistory(newGeolocation);
        
        set({
            showReviewHistory: true,
            geolocation: newGeolocation,
            locationData: data,
        });
    },

    updateReview: async (updatedReview: ReviewData) => {
        const response = await updateReview(updatedReview);
        if (response.success) {
            set((state) => ({
                locationData: {
                    ...state.locationData!,
                    reviewHistory: state.locationData!.reviewHistory.map((review) =>
                        review._id === updatedReview._id ? updatedReview : review
                    ),
                },

            }));
        }
    },

    sortReviewHistory: (criteria) => {
        const { locationData: destinationData } = get();
        if (!destinationData) return;

        const sortedReviews = [...destinationData.reviewHistory];

        if (criteria === "likes") {
            sortedReviews.sort((a, b) => b.likes - a.likes); // Sort by likes (descending)
        } else if (criteria === "time") {
            sortedReviews.sort(
                (a, b) =>
                    (Date.parse(b.createdAt || "") || 0) - (Date.parse(a.createdAt || "") || 0)
            );
        } else {
            // Reset to default order
            sortedReviews.sort((a, b) => {
                if (a._id && b._id) {
                    return a._id.localeCompare(b._id); // Compare _id if both are defined
                }
                // If either _id is missing, handle it (optional)
                return 0; // No sorting if _id is missing
            });

        }

        set({
            locationData: {
                ...destinationData,
                reviewHistory: sortedReviews,
            },
            currentIndex: 1, // Reset to first page on sorting
        });
    },
});
