import axios from 'axios';
// import { LocationType } from '@/app/components/MapService/interfaces';
import { apiRoutes } from '../../utils/routes';
import { LocationData, Geolocation, } from '@/app/store/interfaces';

export const sendReview = async (data: LocationData) => {
    console.log(data)
    const response = await axios.post(`${apiRoutes.SEND_REVIEW}/`, data);
    console.log(response)
    return response.data;
};

export const fetchReviews = async (geolocation: Geolocation) => {

    const response = await axios.post(apiRoutes.FETCH_REVIEW_HISTORY, { geolocation });
    return response.data;
};

export const likeReview = async (data: LocationData) => {
    console.log("like")
    const response = await axios.post(apiRoutes.FETCH_REVIEW_HISTORY, { location: data });

    return response.data;
};

