import TYPES from '../constant';

const initialState = {
  loading: false,
  officeSpaceData: null,
  error: null,
};

const requestOfficeSpaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_OFFICE_SPACE_LOADING:
      return { ...state, loading: true, error: null };

    case TYPES.REQUEST_OFFICE_SPACE_SUCCESS:
      return { ...state, loading: false, officeSpaceData: action.payload, error: null };

    case TYPES.REQUEST_OFFICE_SPACE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export {requestOfficeSpaceReducer} ;
