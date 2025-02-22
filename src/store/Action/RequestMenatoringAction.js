'use client';
import axios from 'axios';
import TYPES from '../constant';

export const requestMentorSession = (sessionData) => {
  return async dispatch => {
    dispatch({ type: TYPES.REQUEST_MENTOR_SESSION_LOADING });
    
    try {
      const accessToken = localStorage.getItem('accessTokenAdmin');
      
      if (!accessToken) {
        throw new Error('Access token not found');
      }
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/requestMentorSession`,
        sessionData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      
      dispatch({
        type: TYPES.REQUEST_MENTOR_SESSION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: TYPES.REQUEST_MENTOR_SESSION_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};