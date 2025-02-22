import axios from 'axios';
import TYPES from '../constant';
import { getHeaders } from '@/utils/authHeaders';
import toast from 'react-hot-toast';

export const fetchAllRequests = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.FETCH_ALL_REQUESTS_LOADING });

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/fetchAllRequests`,
        {
          headers: getHeaders(),
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        dispatch({
          type: TYPES.FETCH_ALL_REQUESTS_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type:TYPES.FETCH_ALL_REQUESTS_FAILURE,
          payload: response?.data?.message || 'Failed to fetch requests.',
        });
        toast.error(response?.data?.message || 'Failed to fetch requests.');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while fetching requests.';
      dispatch({ type: TYPES.FETCH_ALL_REQUESTS_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
    }
  };
};
