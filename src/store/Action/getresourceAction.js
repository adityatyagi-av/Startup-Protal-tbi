'use client';
import TYPES from '../constant';
import { Resource_Detail } from '../../../APiEndPoints/ApiEndPoints';
import toast from 'react-hot-toast';
import api from '@/services/api';

// Fetch Resource Details
export const getResourceDetails = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.Resource_Detail });

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${Resource_Detail}`,
        {
          withCredentials: true,
        },
      );
      if (Boolean(response?.data?.success)) {
        dispatch({
          type: TYPES.Resource_Detail_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: TYPES.Resource_Detail_FAILURE,
          payload:
            response?.data?.message || 'Failed to fetch resource details.',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({
        type: TYPES.Resource_Detail_FAILURE,
        payload: error?.response?.data?.message || 'An error occurred.',
      });
    }
  };
};

export const requestResource = (resourceId, requestedQuantity) => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.REQUEST_RESOURCE_LOADING });

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/requestResources`,
        { resourceId, requestedQuantity },
        {
          withCredentials: true,
        },
      );

      if (Boolean(response?.data?.success)) {
        dispatch({ type: TYPES.REQUEST_RESOURCE_SUCCESS });
        toast.success('Resource request submitted successfully!');
      } else {
        const errorMessage =
          response?.data?.message || 'Failed to request resource';
        dispatch({
          type: TYPES.REQUEST_RESOURCE_FAILURE,
          payload: errorMessage,
        });
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        'An error occurred while requesting the resource.';
      dispatch({ type: TYPES.REQUEST_RESOURCE_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
    }
  };
};
