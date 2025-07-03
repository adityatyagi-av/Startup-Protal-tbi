'use client';
import TYPES from '../constant';
import api from '@/services/api';

const API_ENDPOINT = '/startup/fetchRequestedDocs';

export const fetchRequestedDocs = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.FETCH_REQUESTED_DOCS_REQUEST });

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${API_ENDPOINT}`,
        {
          withCredentials: true,
        },
      );
      if (response?.data?.success) {
        dispatch({
          type: TYPES.FETCH_REQUESTED_DOCS_SUCCESS,
          payload: response.data.data, // API response data
        });
      } else {
        dispatch({
          type: TYPES.FETCH_REQUESTED_DOCS_FAILURE,
          payload:
            response?.data?.message || 'Failed to fetch requested documents.',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({
        type: TYPES.FETCH_REQUESTED_DOCS_FAILURE,
        payload: error?.response?.data?.message || 'An error occurred.',
      });
    }
  };
};
