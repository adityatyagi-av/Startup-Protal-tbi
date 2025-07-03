import TYPES from '../constant';
import { Founder_Detail } from '../../../APiEndPoints/ApiEndPoints';
import api from '@/services/api';

export const getFounderDetails = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.Founder_Detail });

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${Founder_Detail}?schemeName=allSchemes`,
        {
          withCredentials: true,
        },
      );
      const success = response?.data?.success || false;

      if (success) {
        console.log(response.data.data);
        dispatch({
          type: TYPES.Founder_Detail_SUCCESS,
          payload: response.data.data,
        });
      } else {
        console.log('API responded with failure:', response);
        dispatch({
          type: TYPES.Founder_Detail_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error occurred during API call:', error);
      dispatch({
        type: TYPES.Founder_Detail_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};
