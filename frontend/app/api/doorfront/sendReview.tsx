import axios from 'axios';
// import { LocationType } from '@/app/components/MapService/interfaces';
import { apiRoutes } from '@/app/utils/routes';
import { GoogleLocation, ReviewData } from '@/app/components/Review/interfaces';

export const sendReview = async (data: ReviewData) => {

    const response = await axios.post(`${apiRoutes.SEND_REVIEW}/`, data);
    console.log(response)
    return response.data;
};

export const fetchReview = async (location:GoogleLocation) => {

    const response = await axios.post(`${apiRoutes.FETCH_REVIEW}/`,location);
    
    return response.data;
};
