import { combineReducers } from 'redux'; // Import combineReducers to combine multiple reducers
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
// Import your Admin detail reducer
import RefreshAcessTokenReducer from './Reducer/refreshAcessToken_Reducer';
import screeningQuestionReducer from './Reducer/FetchALl_Screening_Question_Reducer';
import FetchShemesReducer from './Reducer/fetch_All_Schems_Reducer';
import createSchemeReducer from './Reducer/Create_Scheme_Reducer';
import getAdminDetalsReducer from './Reducer/Get_Admin_Details_Reducer';
import { editAdminDetailsReducer ,changePasswordReducer } from './Reducer/Get_Admin_Details_Reducer';
import FetchProgramReducer from './Reducer/fetch_Program_Reducer';
import { fetchRegistrationReducer } from './Reducer/Registration_Reducer';

import { directReviewReducer,  finalReviewReducer, deleteChangeReducer, fetchStartupReducer, requestChangeRegistrationReducer } from './Reducer/Startup_Reducer';
import {
  assignActivityUserReducer,
  assignActivityReducer,
  fetchActivityReducer,
  deleteActivityReducer,
} from './Reducer/Add_Activity_Reducer';

import {
  addAnnouncementReducer,
  deleteAnnouncementReducer,
  getAnnouncementReducer,
} from './Reducer/Anouncement_Reducer';
import {
  getManagerDetalsReducer,
  FetchAllManagersReducer,
  AssignManagerReducer,
  RemoveManagerReducer,
  UpdateManagerDetailsReducer,
  AddManagerReducer,
  DeleteManagerReducer,
} from './Reducer/managerReducer';
import {
  fetchPanelMemberReducer,
  addPanelMemberReducer,
  removePanelMemberReducer,
  createGuestReducer,
} from './Reducer/PANEL_MEMBER_Reducer';
import { fetchEvaluationQuestionReducer , addEvaluationQuestion, removeEvaluationReducer } from './Reducer/Evalution_Question_Reduce';
const rootReducer = combineReducers({
  token: RefreshAcessTokenReducer,
  screeningQuestion: screeningQuestionReducer,

  createScheme: createSchemeReducer,
  fetchShemes: FetchShemesReducer,
  getAdminDetals: getAdminDetalsReducer,
  fetchProgram: FetchProgramReducer,
  fetchAllManager: FetchAllManagersReducer,
  assignManager: AssignManagerReducer,
  removeManager: RemoveManagerReducer,
  getManagerDetals: getManagerDetalsReducer,
  updateManagerDetails: UpdateManagerDetailsReducer,
  addManager: AddManagerReducer,
  deleteManager: DeleteManagerReducer,
  assignActivityUser: assignActivityUserReducer,
  assignActivity: assignActivityReducer,
  fetchActivity: fetchActivityReducer,
  deleteActivity: deleteActivityReducer,
  addAnouncement: addAnnouncementReducer,
  deleteAnouncement: deleteAnnouncementReducer,
  getAnouncement: getAnnouncementReducer,
  fetchPanelMember: fetchPanelMemberReducer,
  addPanelMember: addPanelMemberReducer,
  removePanelMember: removePanelMemberReducer,
  createGuest: createGuestReducer,
  fetchRegistration:fetchRegistrationReducer,
  getStartupDetail:fetchStartupReducer,
  requestChangeStartup:requestChangeRegistrationReducer,
  editAdmin:editAdminDetailsReducer,
  changePassword:changePasswordReducer,
  changesQuery:finalReviewReducer,
  deleteChange: deleteChangeReducer,
  directReview:directReviewReducer,
  fetchEvalutionQuestion:fetchEvaluationQuestionReducer,
  addEvaluationQuestion:addEvaluationQuestion,
  removeEvaluation:removeEvaluationReducer



});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
