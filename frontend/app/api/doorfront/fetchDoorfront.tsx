import axios from 'axios';
import { LocationType } from '@/app/components/MapService/interface';
import { apiRoutes } from '@/app/utils/routes';

export const fetchDoorfront = async (destination: LocationType) => {
  const response = await axios.get(`${apiRoutes.GET_DOORFRONT}/${destination}`);
  return response.data;
};
