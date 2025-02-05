'use client';
import axios from 'axios';
import TYPES from '../constant';
import { Admin_Detail, Founder_Detail } from '../../../APiEndPoints/ApiEndPoints';

export const getAdminDetals = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.Admin_Detail });

      const refreshToken = localStorage.getItem('refreshTokenAdmin');
      const accessToken = localStorage.getItem('accessTokenAdmin');

      if (!refreshToken || !accessToken) {
        console.log('Tokens missing in localStorage');
        dispatch({
          type: TYPES.Admin_Detail_FAILURE,
          payload: 'Tokens not found in localStorage',
        });
        return;
      }

      // Indicate loading state

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${Founder_Detail}?schemeName=allSchemes`,
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
          type: TYPES.Admin_Detail_SUCCESS,
          payload: response.data.data,
        });
      } else {
        console.log('API responded with failure:', response);
        dispatch({
          type: TYPES.Admin_Detail_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error occurred during API call:', error);
      dispatch({
        type: TYPES.Admin_Detail_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};
