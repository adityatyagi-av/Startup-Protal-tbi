import TYPES from '../constant';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const requestMentorSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_MENTOR_SESSION_LOADING:
      return { ...state, loading: true, error: null };
    case TYPES.REQUEST_MENTOR_SESSION_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case TYPES.REQUEST_MENTOR_SESSION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export {requestMentorSessionReducer};