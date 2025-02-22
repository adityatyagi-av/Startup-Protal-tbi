import TYPES from '../constant';

const initialState = {
  requests: [],
  loading: false,
  error: null,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_ALL_REQUESTS_LOADING:
      return { ...state, loading: true, error: null };

    case TYPES.FETCH_ALL_REQUESTS_SUCCESS:
      return { ...state, loading: false, requests: action.payload };

    case TYPES.FETCH_ALL_REQUESTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export {requestReducer};