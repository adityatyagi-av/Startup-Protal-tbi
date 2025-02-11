'use client';
import axios from 'axios';
import TYPES from '../constant';
import { Resource_Detail } from '../../../APiEndPoints/ApiEndPoints';
import { getHeaders } from '@/utils/authHeaders';
import toast from 'react-hot-toast';
export const getResourceDetails = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.Resource_Detail });

      const refreshToken = localStorage.getItem('refreshTokenFounder');
      const accessToken = localStorage.getItem('accessTokenFounder');

      if (!refreshToken || !accessToken) {
        console.log('Tokens missing in localStorage');
        dispatch({
          type: TYPES.Resource_Detail_FAILURE,
          payload: 'Tokens not found in localStorage',
        });
        return;
      }

      
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${Resource_Detail}`,
        {
          headers: {
            Refresh: refreshToken,
            Access: accessToken,
          },
          withCredentials: true,
        },
      );

      const success = response?.data?.success || false;

      if (success) {
        console.log(response.data.data);
        dispatch({
          type: TYPES.Resource_Detail_SUCCESS,
          payload: response.data.data,
        });
      } else {
        console.log('API responded with failure:', response);
        dispatch({
          type: TYPES.Resource_Detail_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error occurred during API call:', error);
      dispatch({
        type: TYPES.Resource_Detail_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};
export const requestResource = (resourceId, requestedQuantity) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.REQUEST_RESOURCE_LOADING });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/requestResources`,
        { resourceId, 
          requestedQuantity 
        },
        {
          headers: getHeaders(),
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        dispatch({ type: TYPES.REQUEST_RESOURCE_SUCCESS });
        toast.success("Resource request submitted successfully!");
      } else {
        dispatch({
          type: TYPES.REQUEST_RESOURCE_FAILURE,
          payload: response?.data?.message,
        });
        toast.error(response?.data?.message || "Failed to request resource");
      }
    } catch (error) {
      dispatch({
        type: TYPES.REQUEST_RESOURCE_FAILURE,
        payload: error?.message,
      });
      toast.error(error?.message || "Error occurred while requesting resource");
    }
  };
};