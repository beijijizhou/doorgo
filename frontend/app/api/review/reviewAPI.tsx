import axios from 'axios';
// import { LocationType } from '@/app/components/MapService/interfaces';
import { apiRoutes } from '../../utils/routes';
import { LocationType, ReviewData } from '@/app/store/interfaces';

export const sendReview = async (data: ReviewData) => {
    const response = await axios.post(`${apiRoutes.SEND_REVIEW}/`, data);
    return response.data;
};

export const fetchReviews = async (location: LocationType) => {
    const response = await axios.post(apiRoutes.FETCH_REVIEWS, { location });
    return response.data;
};

export const likeReview = async (location: LocationType) => {
    console.log("like")
    const response = await axios.post(apiRoutes.FETCH_REVIEWS, { location });

    return response.data;
};

