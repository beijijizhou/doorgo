import axios from 'axios';
// import { LocationType } from '@/app/components/MapService/interfaces';
import { apiRoutes } from '../../utils/routes';
import { GoogleLocation, ReviewData } from '@/app/components/Review/interfaces';

export const sendReview = async (data: ReviewData) => {
    const response = await axios.post(`${apiRoutes.SEND_REVIEW}/`, data);
    return response.data;
};

export const fetchReviews = async (location: GoogleLocation) => {

    const response = await axios.post(`${apiRoutes.FETCH_REVIEW}/`, location);
    console.log(response.data)
    return response.data;
};
