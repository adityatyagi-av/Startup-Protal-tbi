import { Type } from 'lucide-react';
import TYPES from '../constant';
import { sendMessage } from '../webSocketAction/webSocketAction';

const initialState = {
  
  searchUser:[],
  loading: false,
  chatUsers: [],
  messages: [],
  allMsgFlag: 0,
  currPage: 0,
  error: null,
  chatToken:null,
  sendMessage:null,
  newMessage:null,
  unreadChatUser:{},
  messageMarkedAsSeen:null,
  flagSocketConnection:false,
  intialActiveUser:[],
  setActiveUser:null,
  resetActiveUser:null,


  
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_CHAT_USERS_LOADING:
    // case TYPES.FETCH_MESSAGES_LOADING:
    case TYPES.SEARCH_CHATUSERS_LOADING:
      return { ...state, loading: true, error: null };

    case TYPES.SEARCH_CHATUSERS_SUCCESS:
      return{
        ...state,
        searchUser: action.payload,
      }
    case TYPES.SET_ACTIVE_USER:
      return{
        ...state, 
        setActiveUser: action.payload,
      }
    case TYPES.RESET_ACTIVE_USER:
      return{
        ...state,
        resetActiveUser: action.payload,
      }
    case TYPES.UPDATE_CHAT_USER:
      return{
        ...state,
        chatUsers: [...state.chatUsers, action.payload],
      }
    case TYPES.FETCH_CHAT_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        chatUsers: action.payload.users,
        chatToken: action.payload.chatToken,
      };
    case TYPES.SEND_MESSAGE_SUCCESS:
      return{
        ...state,
        messages: [...(state.messages || []), action.payload],
        sendMessage:action.payload
      }
    case TYPES.NEW_MESSAGE_RECEIVED:
      return{
        ...state,
        messages: [...(state.messages || []), action.payload],
        unreadChatUser:{
          ...state.unreadChatUser,
          [action.payload?.senderId]: true,
        },
        newMessage:action.payload
      }
    case TYPES.MESSAGE_MARKED_AS_SEEN:
      return{
        ...state,
        messageMarkedAsSeen:action.payload
      }
    case TYPES.RESET_UNREAD_CHATUSER:
      return{
        ...state,
        unreadChatUser:{
          ...state.unreadChatUser,
          [action.payload]:false,
        }
      }
    case TYPES.SET_SOCKET_CONNECTION_SUCCESS:
      console.log("active user ----------" , action.payload)
      return {
        ...state,
        flagSocketConnection:true,
        intialActiveUser:action.payload
        ,
      }
    case TYPES.SET_SOCKET_CONNECTION_FAILURE:
      return{
        ...state,
        flagSocketConnection:false
      }

    case TYPES.FETCH_MESSAGES_SUCCESS:
      console.log("payload ", action.payload);
      const isFirstPage = action.payload.pagination.currentPage === 1;
      return {
        ...state,
        loading: false,
        success: true,
        messages: isFirstPage 
          ? action.payload.messages || []
          : [...(action.payload.messages || []), ...(state.messages || [])],
        allMsgFlag: action.payload?.messages?.length>0?0:1,
        currPage: action.payload.pagination.currentPage,
      };

    case TYPES.SET_ACTIVE_CHATUSER:
      
      return {
        ...state,
        messages: [], 
        allMsgFlag: 0, 
        currPage: 0, 
        sendMessage:null,
      };

    case TYPES.FETCH_CHAT_USERS_FAILURE:
    case TYPES.FETCH_MESSAGES_FAILURE:
    case TYPES.SEARCH_CHATUSERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default chatReducer;
