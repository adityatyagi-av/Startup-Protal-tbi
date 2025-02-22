import TYPES from '../constant';

const initialState = {
  mentors: [],
  loading: false,
  error: null,
};

const fetchAllMentorshipRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_SUCCESS:
      return {
        ...state,
        mentorshipRequests: action.payload,
        loading: false,
        error: null,
      };
    case TYPES.FETCH_ALL_MENTORSHIP_REQUESTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { fetchAllMentorshipRequestsReducer };
