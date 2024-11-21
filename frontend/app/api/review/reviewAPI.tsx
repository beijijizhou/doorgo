import axios from 'axios';
// import { LocationType } from '@/app/components/MapService/interfaces';
import { apiRoutes } from '../../utils/routes';
import { LocationData, Geolocation, ReviewData, } from '@/app/store/interfaces';

export const sendReview = async (data: LocationData) => {
    const response = await axios.post(`${apiRoutes.SEND_REVIEW}/`, data);
    return response.data;
};

export const fetchReviewHistory = async (geolocation: Geolocation) => {
    console.time("fetchReviewHistory"); // Start the timer
    console.log(geolocation)
    try {
        const response = await axios.post(apiRoutes.FETCH_REVIEW_HISTORY, { geolocation });
        console.timeEnd("fetchReviewHistory"); // End the timer and log the elapsed time
        return response.data;
    } catch (error) {
        console.timeEnd("fetchReviewHistory"); // Ensure the timer ends even if there's an error
        console.error("Error fetching review history:", error);
        throw error;
    }
};


export const updateReview = async (reviewData: ReviewData) => {
    
    const response = await axios.post(apiRoutes.UPDATE_REVIEW, {reviewData});
    return response.data;
};

