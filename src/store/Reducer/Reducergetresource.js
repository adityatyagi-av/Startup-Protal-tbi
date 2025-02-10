import TYPES from '../constant';

const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

const getResourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.Resource_Detail:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TYPES.Resource_Detail_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        success: true,
      };
    case TYPES.Resource_Detail_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default getResourceReducer;
