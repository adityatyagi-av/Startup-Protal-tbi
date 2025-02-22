import TYPES from "../constant";

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

const fetchRequestedDocsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_REQUESTED_DOCS_REQUEST:
      return { ...state, loading: true, error: null };

    case TYPES.FETCH_REQUESTED_DOCS_SUCCESS:
      return { ...state, loading: false, documents: action.payload };

    case TYPES.FETCH_REQUESTED_DOCS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export  {fetchRequestedDocsReducer};
