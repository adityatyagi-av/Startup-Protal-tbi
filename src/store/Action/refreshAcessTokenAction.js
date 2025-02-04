'use client';
import axios from 'axios';
import TYPES from '../constant';
import { Refresh_Access_Token } from '../../../APiEndPoints/ApiEndPoints';

export const getAccessToken = () => {
  return async dispatch => {
    console.log('action');
    dispatch({ type: TYPES.Refresh_Access_Token }); // Set loading state to true

    // Fetch access and refresh tokens from local storage inside the action

    const refreshToken = localStorage.getItem('refreshTokenAdmin');

    if (!refreshToken) {
      console.log('local storage empty');
      dispatch({
        type: TYPES.Refresh_Access_Token_FAILURE,
        payload: 'Tokens not found in localStorage',
      });
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${Refresh_Access_Token}`,
        {
          headers: {
            // Send access token
            Refresh: refreshToken, // Send refresh token
          },
          withCredentials: true,
        },
      );

      const success = response?.data?.success || false;

      if (success) {
        // Update local storage with new tokens if present in response
        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        localStorage.setItem('accessTokenAdmin', newAccessToken);
        localStorage.setItem('refreshTokenAdmin', newRefreshToken);

        dispatch({
          type: TYPES.Refresh_Access_Token_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: TYPES.Refresh_Access_Token_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.log('error in action below');
      console.log(error);
      dispatch({
        type: TYPES.Refresh_Access_Token_FAILURE,
        payload: error.message,
      });
    }
  };
};
