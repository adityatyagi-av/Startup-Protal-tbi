// reducer.js
import TYPES from '../constant';

const initialState = {
  newToken: {},
  error: null,
  loading: true,
  success: false,
};

const RefreshAcessTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.Refresh_Access_Token:
      return {
        ...state,
        loading: true,
      };
    case TYPES.Refresh_Access_Token_SUCCESS:
      return {
        ...state,
        newToken: action.payload,
        loading: false,
        success: true,
        error: null,
      };
    case TYPES.Refresh_Access_Token_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default RefreshAcessTokenReducer;
