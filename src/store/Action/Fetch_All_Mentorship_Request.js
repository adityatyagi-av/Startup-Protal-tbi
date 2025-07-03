'use client';
import TYPES from '../constant';
import api from '@/services/api';



// Fetch all mentorship requests
export const fetchAllMentorshipRequests = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_LOADING });

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/fetchAllMentorShipRequests`,
        {
          withCredentials: true,
        },
      );

      if (Boolean(response?.data?.success)) {
        console.log(response.data.data);
        dispatch({
          type: TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_FAILURE,
          payload:
            response?.data?.message || 'Failed to fetch mentorship requests.',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({
        type: TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_FAILURE,
        payload: error?.response?.data?.message || 'An error occurred.',
      });
    }
  };
};
