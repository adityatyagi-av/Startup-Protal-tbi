'use client';
import TYPES from '../constant';
import toast from 'react-hot-toast';
import api from '@/services/api';

// Fetch All Mentors
export const fetchAllMentors = () => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.FETCH_ALL_MENTORS_LOADING });

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/fetchAllMentors`,
        {
          withCredentials: true,
        },
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

export const requestMentor = mentorId => {
  return async dispatch => {
    try {
      dispatch({ type: TYPES.REQUEST_MENTOR_LOADING });

      const currentDate = new Date().toISOString().split('T')[0];

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/requestMentorSession`,
        { mentorId, date: currentDate },
        {
          withCredentials: true,
        },
      );

      if (Boolean(response?.data?.success)) {
        dispatch({ type: TYPES.REQUEST_MENTOR_SUCCESS });
        toast.success('Mentor request submitted successfully!');
      } else {
        const errorMessage =
          response?.data?.message || 'Failed to request mentor';
        dispatch({ type: TYPES.REQUEST_MENTOR_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        'An error occurred while requesting a mentor.';
      dispatch({ type: TYPES.REQUEST_MENTOR_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
    }
  };
};
