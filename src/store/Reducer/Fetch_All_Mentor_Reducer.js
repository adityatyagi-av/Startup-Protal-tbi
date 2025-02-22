import TYPES from '../constant';

const initialState = {
  mentors: [],
  loading: false,
  error: null,
};

const fetchAllMentorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_ALL_MENTORS_LOADING:
      return { ...state, loading: true, error: null };
    case TYPES.FETCH_ALL_MENTORS_SUCCESS:
      return { ...state, mentors: action.payload, loading: false, error: null };
    case TYPES.FETCH_ALL_MENTORS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_MENTOR_REQUEST_STATUS':
      return {
        ...state,
        mentors: state.mentors.map((mentor, index) =>
          index === action.payload ? { ...mentor, status: 'Already Requested' } : mentor
        ),
      };
    default:
      return state;
  }
};

export { fetchAllMentorsReducer };

