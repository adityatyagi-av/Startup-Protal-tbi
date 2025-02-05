import TYPES from '../constant';
const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

const getAdminDetalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.Admin_Detail:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TYPES.Admin_Detail_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        success: true,
      };
    case TYPES.Admin_Detail_FAILURE:
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

export default getAdminDetalsReducer;
