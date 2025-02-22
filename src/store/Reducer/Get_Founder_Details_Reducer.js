import TYPES from '../constant';

const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

const getFounderDetalsReducer = (state = initialState, action) => {
  switch (action.type) {  
    case TYPES.Founder_Detail:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TYPES.Founder_Detail_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        success: true,
      };
    case TYPES.Founder_Detail_FAILURE:
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

export default getFounderDetalsReducer;
