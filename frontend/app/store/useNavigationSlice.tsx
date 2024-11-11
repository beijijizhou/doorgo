import { StateCreator } from 'zustand';
import { LocationType, ReviewData } from './interfaces';
import { fetchReviews } from '../api/review/reviewAPI';

export interface NavigationSlice {
    destination: LocationType | null,
    reviewList: ReviewData[] | [],
    setDestination: (newDestination: LocationType) => void;
    setReviewList: ()=>void;
}
const defaultDestination = {
    lat: 40.7656066,
    lng: -73.9553663,
    formatted_address: "1305 York Ave, New York, NY 10021, USA",
    name: "1305 York Ave",
    place_id: "ChIJdbJa3MNYwokRbt4-Xg85VBY",
}
export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set, get) => ({
    destination: defaultDestination,
    map: null,
    reviewList: [],
    setDestination: (newDestination: LocationType) => {
        set({ destination: newDestination })
        // fetchReviews(newDestination);
        // map.setCenter(newDestination as google.maps.LatLngLiteral);
    },
    setReviewList: async () => {
        const { destination } = get()
        const data = await fetchReviews(destination!)
        console.log(data)
        set({ reviewList: data});
    }
});