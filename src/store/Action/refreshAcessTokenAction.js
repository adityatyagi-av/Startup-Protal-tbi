'use client';
import axios from 'axios';
import TYPES from '../constant';
import { Refresh_Access_Token } from '../../../APiEndPoints/ApiEndPoints';

export const getAccessToken = () => {
  return async dispatch => {
    console.log('action');
    dispatch({ type: TYPES.Refresh_Access_Token }); 


    const refreshToken = localStorage.getItem('refreshTokenFounder');

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
           
            Refresh: refreshToken, 
          },
          withCredentials: true,
        },
      );

      const success = response?.data?.success || false;

      if (success) {
        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        localStorage.setItem('accessTokenFounder', newAccessToken);
        localStorage.setItem('refreshTokenFounder', newRefreshToken);

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
