// import TYPES from "../constant";

// const initialState = {
//   loading: false,
//   data: [], 
//   error: null,
//   success: false,
// };

// const fetchAllRequestsReducer = (state = initialState, action) => {
//   switch (action.TYPES) {
//     case TYPES.FETCH_ALL_REQUESTS_LOADING:
//       return { ...state, loading: true, success: false, error: null };

//     case TYPES.FETCH_ALL_REQUESTS_SUCCESS:
//       return { ...state, loading: false, data: action.payload, success: true };

//     case TYPES.FETCH_ALL_REQUESTS_FAILURE:
//       return { ...state, loading: false, success: false, error: action.payload };

//     default:
//       return state;
//   }
// };

// export { fetchAllRequestsReducer };
