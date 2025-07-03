'use client';
import TYPES from '../constant';
import api from '@/services/api';

export const requestMentorSession = sessionData => {
  return async dispatch => {
    dispatch({ type: TYPES.REQUEST_MENTOR_SESSION_LOADING });

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/requestMentorSession`,
        sessionData,
        {
          withCredentials: true,
        },
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
