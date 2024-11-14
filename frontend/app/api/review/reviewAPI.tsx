import axios from 'axios';
// import { LocationType } from '@/app/components/MapService/interfaces';
import { apiRoutes } from '../../utils/routes';
import { LocationData, Geolocation, ReviewData, } from '@/app/store/interfaces';

export const sendReview = async (data: LocationData) => {
    const response = await axios.post(`${apiRoutes.SEND_REVIEW}/`, data);
    return response.data;
};

export const fetchReviewHistory = async (geolocation: Geolocation) => {

    const response = await axios.post(apiRoutes.FETCH_REVIEW_HISTORY, { geolocation });
    console.log(response)
    return response.data;
};

export const updateReview = async (reviewData: ReviewData) => {
    
    const response = await axios.post(apiRoutes.UPDATE_REVIEW, {reviewData});
    return response.data;
};

