import axios from 'axios';
// import { LocationType } from '@/app/components/MapService/interfaces';
import { apiRoutes } from '@/app/utils/routes';
import { ReviewData } from '@/app/components/Review/interfaces';

export const sendReview = async (data: ReviewData) => {

    const response = await axios.post(`${apiRoutes.SEND_REVIEW}/`, data);

    return response.data;
};
