import {
  GET_CHAT_USER,
  GET_CHAT_MESSAGES,
  SEARCH_CHAT_USER,
} from '../../../APiEndPoints/ApiEndPoints';
import TYPES from '../constant';
import toast from 'react-hot-toast';
import api from '@/services/api';

export const FetchChatUser = () => async dispatch => {
  try {
    dispatch({ type: TYPES.FETCH_CHAT_USERS_LOADING });
    // toast.success("scheme id" ,schemeId)

    const response = await api.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}${GET_CHAT_USER}`,

      {
        withCredentials: true,
      },
    );
    console.log(response, '\n data', response.data.data);

    if (response?.data?.success) {
      localStorage.setItem('chatToken', response?.data?.data?.chatToken);
      dispatch({
        type: TYPES.FETCH_CHAT_USERS_SUCCESS,
        payload: response?.data?.data,
      });
    } else {
      dispatch({
        type: TYPES.FETCH_CHAT_USERS_FAILURE,
        payload: response.data.message,
      });
      toast.error(
        response.data.message || 'Failed to fetch evaluation questions',
      );
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: TYPES.FETCH_CHAT_USERS_FAILURE,
      payload: error.response?.data?.message || 'Something went wrong',
    });
    toast.error(error.response?.data?.message || 'Something went wrong');
  }
};

export const fetchMessages =
  (conversationId, itemsPerPage = 10, currentPage = 1) =>
  async dispatch => {
    dispatch({ type: TYPES.FETCH_MESSAGES_LOADING });

    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${GET_CHAT_MESSAGES}/${conversationId}?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`,
        {
          withCredentials: true,
        },
      );
      console.log(res.data.message);
      dispatch({
        type: TYPES.FETCH_MESSAGES_SUCCESS,
        payload: res.data?.message || [],
      });
    } catch (err) {
      dispatch({
        type: TYPES.FETCH_MESSAGES_FAILURE,
        payload: err?.response?.data?.message || 'Failed to fetch messages',
      });
    }
  };
export const changeActiveUser = id => dispatch => {
  dispatch({
    type: TYPES.SET_ACTIVE_CHATUSER,
    payload: id,
  });
};
export const FetchChatUserQuesry = query => async dispatch => {
  try {
    dispatch({ type: TYPES.SEARCH_CHATUSERS_LOADING });

    const response = await api.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}${SEARCH_CHAT_USER}?q=${query}`,

      {
        withCredentials: true,
      },
    );

    if (response?.data?.success) {
      dispatch({
        type: TYPES.SEARCH_CHATUSERS_SUCCESS,
        payload: response?.data?.data,
      });
    } else {
      dispatch({
        type: TYPES.SEARCH_CHATUSERS_FAILURE,
        payload: response.data.message,
      });
      toast.error(response.data.message || 'Failed to fetch query');
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: TYPES.SEARCH_CHATUSERS_FAILURE,
      payload: error.response?.data?.message || 'Something went wrong',
    });
    toast.error(error.response?.data?.message || 'Something went wrong');
  }
};

export const updateChatUser = user => async dispatch => {
  dispatch({
    type: TYPES.UPDATE_CHAT_USER,
    payload: user,
  });
};

export const deleteMessages = messageIds => async dispatch => {
  dispatch({ type: TYPES.DELETE_MESSAGES_LOADING });

  const toastId = toast.loading('Deleting message(s)...');

  try {
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/chat/deleteMessages`,

      {
        messages: messageIds,
      },
      {
        withCredentials: true,
      },
    );

    toast.success('Message(s) deleted successfully!', { id: toastId });

    dispatch({ type: TYPES.DELETE_MESSAGES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    toast.error('Failed to delete message(s)', { id: toastId });

    dispatch({
      type: TYPES.DELETE_MESSAGES_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const resetUnreadChatUser = userId => async dispatch => {
  dispatch({
    type: TYPES.RESET_UNREAD_CHATUSER,
    payload: userId,
  });
};
