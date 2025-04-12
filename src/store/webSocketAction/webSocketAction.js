"use client";
import TYPES from "../constant";
import toast from 'react-hot-toast';

export let socket;

export const initSocket = (token) => (dispatch) => {
  if (socket) return;

  socket = new WebSocket(`wss://tbierpbackend.duckdns.org/ws?token=${token}`);

  socket.onopen = (data) => {
   console.log("socket connected",data)
    dispatch({
      type:TYPES.SET_SOCKET_CONNECTION_SUCCESS,
      payload:data?.onlineUsers
    })
    console.log("WebSocket connected");
  };

  socket.onclose = () => {
    dispatch({
      type:TYPES.SET_SOCKET_CONNECTION_FAILURE
    })
  
    console.log(socket)
    console.log("WebSocket disconnected");
    socket = null;
  };

  socket.onerror = (e) => console.error("WebSocket error:", e);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data, "------------in socket");

    switch (data.type) {
      case "savedMessage":
       
        dispatch({
          type: TYPES.SEND_MESSAGE_SUCCESS,
          payload: data.message,
        });
        break;

      case "newMessage":
         
         dispatch({
            type:TYPES.NEW_MESSAGE_RECEIVED,
            payload: data.message,
         })
        break;

      case "markAsSeen":
         dispatch({
          type:TYPES.MESSAGE_MARKED_AS_SEEN,
          payload:{
             id :data.messageId,
             userId:data.receiverId,


          },
         })
        break;
      case "onlineUsers":
        console.log("socket connected",data)
    dispatch({
      type:TYPES.SET_SOCKET_CONNECTION_SUCCESS,
      payload:data?.onlineUsers
    })

      case "userConnected":
        console.log("user connected" ,data)
        dispatch({
          type:TYPES.SET_ACTIVE_USER,
          payload:data?.id
        })
        break;
      case "userDisconnected":
        console.log("user diconnected" ,data)
        dispatch({
          type:TYPES.RESET_ACTIVE_USER,
          payload:data?.id
        })

      default:
        console.log("Unhandled message type:", data.type);
    }
  };
};

export const socketSendMessage = (receiverId, message) => {
   
  socket?.send(
    JSON.stringify({
      type: "sendMessage",
      receiverId,
      message,
    })
  );
};
export const socketMarkAsSeen = (id) =>{
   
      socket?.send(
        JSON.stringify(
          {
            type: "markAsSeen",
            messageId:id,
          }
        )
      )
}


