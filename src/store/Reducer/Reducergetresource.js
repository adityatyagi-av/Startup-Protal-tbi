import TYPES from '../constant.js'

const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

// Resource Details Reducer
const getResourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.Resource_Detail:
      return { ...state, loading: true, error: null, success: false };

    case TYPES.Resource_Detail_SUCCESS:
      return { ...state, loading: false, data: action.payload, success: true };

    case TYPES.Resource_Detail_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};


const requestResourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_RESOURCE_LOADING:
      return { ...state, loading: true, success: false, error: null };

    case TYPES.REQUEST_RESOURCE_SUCCESS:
      return { ...state, loading: false, success: true, error: null };

    case TYPES.REQUEST_RESOURCE_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export { getResourceReducer, requestResourceReducer };
