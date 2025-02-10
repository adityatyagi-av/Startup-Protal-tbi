import { combineReducers } from 'redux'; 
import { configureStore } from '@reduxjs/toolkit'; 

// Import reducers
import RefreshAcessTokenReducer from './Reducer/refreshAcessToken_Reducer';
import getResourceReducer from './Reducer/Reducergetresource'; 

const rootReducer = combineReducers({
  token: RefreshAcessTokenReducer,
  resource: getResourceReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
