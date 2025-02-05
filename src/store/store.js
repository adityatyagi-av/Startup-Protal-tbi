import { combineReducers } from 'redux'; // Import combineReducers to combine multiple reducers
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
// Import your Admin detail reducer
import RefreshAcessTokenReducer from './Reducer/refreshAcessToken_Reducer';





const rootReducer = combineReducers({
  token: RefreshAcessTokenReducer,

  


});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
