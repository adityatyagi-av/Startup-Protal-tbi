import TYPES from "../constant";

const initialState = {
  loading: false,
  successMessage: null,
  error: null,
};

const uploadDocReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.UPLOAD_DOC_REQUEST:
      return { ...state, loading: true, successMessage: null, error: null };

    case TYPES.UPLOAD_DOC_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload, error: null };

    case TYPES.UPLOAD_DOC_FAILURE:
      return { ...state, loading: false, successMessage: null, error: action.payload };

    default:
      return state;
  }
};

export  {uploadDocReducer};
