'use client';
import axios from 'axios';
import TYPES from '../constant';
import toast from 'react-hot-toast';

const getTokens = () => {
  if (typeof window !== 'undefined') {
    return {
      refreshToken: localStorage.getItem('refreshTokenFounder'),
      accessToken: localStorage.getItem('accessTokenFounder'),
    };
  }
  return { refreshToken: null, accessToken: null };
};

// Fetch all mentorship requests
export const fetchAllMentorshipRequests = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_LOADING });

      const { refreshToken, accessToken } = getTokens();

      if (!refreshToken || !accessToken) {
        console.warn('Tokens missing in localStorage');
        return dispatch({
          type: TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_FAILURE,
          payload: 'Authentication tokens are missing.',
        });
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/fetchAllMentorShipRequests`,
        {
          headers: {
            Refresh: refreshToken,
            Access: accessToken,
          },
          withCredentials: true,
        }
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
          payload: response?.data?.message || 'Failed to fetch mentorship requests.',
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
