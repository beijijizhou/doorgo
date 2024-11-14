/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand';
import { LocationData, Geolocation, ReviewData } from './interfaces';
import { fetchReviewHistory, updateReview } from '../api/review/reviewAPI';

const geolocation = {
    lat: 40.7656066,
    lng: -73.9553663,
    formatted_address: "1305 York Ave, New York, NY 10021, USA",
    name: "1305 York Ave",
    place_id: "ChIJdbJa3MNYwokRbt4-Xg85VBY",
}
const defaultDestinationData: LocationData = {
    geolocation,
    reviewHistory: [],
}
export interface ReviewSlice {
    destinationData: LocationData | null,
    setDestination: (newDestination: Geolocation) => void;
    setReviewHistory: () => void;
    updateReview: (review: ReviewData) => void;
}

export const createReviewSlice: StateCreator<ReviewSlice, [], []> = (set, get) => ({
    destinationData: defaultDestinationData,
    map: null,
    setDestination: async (newDestination: Geolocation) => {
        // set({ destinationData: newDestination })
        // console.log(newDestination)
        // fetchReviewHistory(newDestination);
        // const data = await fetchReviewHistory(destinationData!.geolocation)
        const data = await fetchReviewHistory(newDestination)
        set({
            destinationData: {
                geolocation: newDestination,
                reviewHistory: data.reviewHistory,
            },
        });
    },
    setReviewHistory: async () => {
        const { destinationData } = get()
        const data = await fetchReviewHistory(destinationData!.geolocation)
        set({
            destinationData: {
                ...destinationData!,
                reviewHistory: data.reviewHistory,
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