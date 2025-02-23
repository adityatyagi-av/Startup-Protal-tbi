'use client';
import axios from 'axios';
import TYPES from '../constant';
import { FETCH_ALL_MENTORS } from '../../../APiEndPoints/ApiEndPoints';
import { getHeaders } from '@/utils/authHeaders';
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

// Fetch All Mentors
export const fetchAllMentors = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.FETCH_ALL_MENTORS_LOADING });

      const { refreshToken, accessToken } = getTokens();

      if (!refreshToken || !accessToken) {
        console.warn('Tokens missing in localStorage');
        return dispatch({
          type: TYPES.FETCH_ALL_MENTORS_FAILURE,
          payload: 'Authentication tokens are missing.',
        });
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/fetchAllMentors`,
        {
          headers: {
            Refresh: refreshToken,
            Access: accessToken,
          },
          withCredentials: true,
        }
      );

      if (Boolean(response?.data?.success)) {
        dispatch({
          type: TYPES.FETCH_ALL_MENTORS_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: TYPES.FETCH_ALL_MENTORS_FAILURE,
          payload: response?.data?.message || 'Failed to fetch mentors.',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({
        type: TYPES.FETCH_ALL_MENTORS_FAILURE,
        payload: error?.response?.data?.message || 'An error occurred.',
      });
    }
  };
};

export const requestMentor = (mentorId) => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.REQUEST_MENTOR_LOADING });
      
      const currentDate = new Date().toISOString().split('T')[0];

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/requestMentorSession`,
        { mentorId, date: currentDate }, // ✅ Sending both mentorId and date
        {
          headers: getHeaders(),
          withCredentials: true,
        }
      );

      if (Boolean(response?.data?.success)) {
        dispatch({ type: TYPES.REQUEST_MENTOR_SUCCESS 
          

        });
        toast.success('Mentor request submitted successfully!');
      } else {
        const errorMessage = response?.data?.message || 'Failed to request mentor';
        dispatch({ type: TYPES.REQUEST_MENTOR_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while requesting a mentor.';
      dispatch({ type: TYPES.REQUEST_MENTOR_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
    }
  };
};












