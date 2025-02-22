'use client';
import axios from 'axios';
import TYPES from '../constant';
import { getHeaders } from '@/utils/authHeaders';
import toast from 'react-hot-toast';

// Request Office Space Action
export const requestOfficeSpace = (spaceDetails) => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.REQUEST_OFFICE_SPACE_LOADING });

      console.log("Requesting Office Space:", spaceDetails); // Debugging

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/requestOfficeSpace`,
        spaceDetails, // ✅ Send office space request details
        {
          headers: getHeaders(),
          withCredentials: true,
        }
      );

      if (Boolean(response?.data?.success)) {
        dispatch({
          type: TYPES.REQUEST_OFFICE_SPACE_SUCCESS,
          payload: response.data.data,
        });

        toast.success('Office space request submitted successfully!');
      } else {
        const errorMessage = response?.data?.message || 'Failed to request office space';
        dispatch({ type: TYPES.REQUEST_OFFICE_SPACE_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while requesting office space.';
      dispatch({ type: TYPES.REQUEST_OFFICE_SPACE_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
    }
  };
};
