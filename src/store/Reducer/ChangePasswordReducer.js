import TYPES from "../constant";

const initialState = {
  loading: false,
  successMessage: "",
  error: null,
};

const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.Change_Password_LOADING:
      return { ...state, loading: true, error: null, successMessage: "" };

    case TYPES.Change_Password_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload };

    case TYPES.Change_Password_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default changePasswordReducer;
