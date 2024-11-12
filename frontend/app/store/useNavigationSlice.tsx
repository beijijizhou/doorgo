import { StateCreator } from 'zustand';
import { LocationData, Geolocation, ReviewData } from './interfaces';
import { fetchReviews as fetchReviewHistory } from '../api/review/reviewAPI';
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
export interface NavigationSlice {
    destinationData: LocationData | null,
    reviewList: ReviewData[] | [],
    setDestination: (newDestination: Geolocation) => void;
    setReviewList: () => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set, get) => ({
    destinationData: defaultDestinationData,
    map: null,
    reviewList: [],
    setDestination: (newDestination: Geolocation) => {
        // set({ destinationData: newDestination })
        fetchReviewHistory(newDestination);
        // map.setCenter(newDestination as google.maps.LatLngLiteral);
    },
    setReviewList: async () => {
        const { destinationData } = get()
        const data = await fetchReviewHistory(destinationData!.geolocation)
       
        set({ reviewList: data.reviewHistory });
    }
});