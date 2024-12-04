import axios from 'axios';
// import { LocationType } from '@/app/components/MapService/interfaces';
import { apiRoutes } from '../../utils/routes';
import { LocationData, Geolocation, ReviewData, } from '@/app/store/interfaces';

export const sendReview = async (geolocation: Geolocation, reviewData: ReviewData) => {
    const response = await axios.post(`${apiRoutes.SEND_REVIEW}/`, { geolocation, reviewData });
    return response.data;
};

export const fetchReviewHistory = async (newGeolocation: Geolocation) => {
    console.time("fetchReviewHistory"); // Start the timer
    try {
        const response = await axios.post(apiRoutes.FETCH_REVIEW_HISTORY, { geolocation: newGeolocation });
        console.timeEnd("fetchReviewHistory"); // End the timer and log the elapsed time
        console.log(response.status, response.status === 204)
        if (response.status === 204) {
            // Handle 204 No Content response
            // Update your UI to inform the user that no locations were found
            alert('No nearby locations found');
            return null;
        }
        const { isNearby } = response.data;
        const newLocationData = response.data.locationData
        const { formatted_address, geoCoordinates, name, place_id, reviewHistory } = newLocationData;

        const geolocation: Geolocation = {
            geoCoordinates,
            formatted_address,
            name,
            place_id,
        };
        const locationData: LocationData = {
            geolocation,
            reviewHistory,
            isNearby,
        }

        return locationData

    } catch (error) {
        console.timeEnd("fetchReviewHistory"); // Ensure the timer ends even if there's an error
        console.error("Error fetching review history:", error);
        throw error;
    }
};


export const updateReview = async (reviewData: ReviewData) => {

    const response = await axios.post(apiRoutes.UPDATE_REVIEW, { reviewData });
    return response.data;
};

