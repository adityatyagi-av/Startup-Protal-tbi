import { MessageBubble } from "@/components/chatComponet/messageBubble";
import { deleteMessages, fetchMessages } from "@/store/Action/chatAction";
import { socketSendMessage } from "@/store/webSocketAction/webSocketAction";
import { MessageCircle, Menu, ChevronUp, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ChatArea = ({ activeUser, isMobile, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { loading, allMsgFlag, messages, currPage, sendMessage, newMessage: newMessageReceived, messageMarkedAsSeen } = useSelector((state) => state.chatReducer);
  const [newMessage, setNewMessage] = useState('');
  const [sendDisabled, setSendDisabled] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const currentUserId = activeUser?.id;
  
  // Optimize message deduplication and sorting
  useEffect(() => {
    if (messages.length > 0) {
      setMessageList(prevMessages => {
        const combinedMessages = [...prevMessages, ...messages];
        return combinedMessages
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .filter((msg, index, self) => 
            self.findIndex(m => m.id === msg.id) === index
          );
      });
    }
  }, [messages]);
  
  // Handle auto-scrolling
  useEffect(() => {
    if (messagesEndRef.current && currPage === 1) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList, currPage]);

  // Reset state when active user changes
  useEffect(() => {
    if (activeUser?.id) {
      setMessageList([]);
      setSendDisabled(false);
      setNewMessage("");
      dispatch(fetchMessages(activeUser.id, 10, 1));
    }
  }, [activeUser, dispatch]);

  // Handle messages marked as seen
  useEffect(() => {
    if (messageMarkedAsSeen?.userId === activeUser?.id) {
      setMessageList(prevMessages =>
        prevMessages.map(msg =>
          msg?.id === messageMarkedAsSeen.id ? { ...msg, isSeen: true } : msg
        )
      );
    }
  }, [messageMarkedAsSeen, activeUser?.id]);
  
  // Handle loading more messages
  const handleLoadMoreMessages = useCallback(() => {
    if (!loading && !allMsgFlag) {
      dispatch(fetchMessages(activeUser.id, 10, parseInt(currPage) + 1));
    }
  }, [loading, allMsgFlag, activeUser?.id, currPage, dispatch]);

  // Handle sending messages with improved button control
  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || sendDisabled) return;
    
    socketSendMessage(activeUser?.id, newMessage);
    setNewMessage('');
    setSendDisabled(true);
  }, [activeUser?.id, newMessage, sendDisabled]);

  // Handle message deletion
  const handleDelete = useCallback((messageID) => {
    dispatch(deleteMessages([messageID])).then(() => {
      setMessageList(prevMessages => prevMessages.filter(msg => msg.id !== messageID));
    });
  }, [dispatch]);

  // Format message date
  const formatMessageDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);
  
  // Handle sent message updates
  useEffect(() => {
    if (sendMessage) {
      setMessageList(prev => [...prev, sendMessage]);
      setSendDisabled(false);
      
      setTimeout(() => {
        messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [sendMessage]);
  
  // Handle new messages received
  useEffect(() => {
    if (newMessageReceived?.senderId === currentUserId) {
      setMessageList(prev => [...prev, newMessageReceived]);
      setTimeout(() => {
        messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [newMessageReceived?.id, currentUserId]);

  // Memoize the button disabled state for better performance
  const isSendButtonDisabled = sendDisabled || newMessage.trim().length === 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      {activeUser ? (
        <>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm">
            <div className="flex items-center">
              {isMobile && (
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="mr-3 p-1 text-gray-500 hover:text-gray-700"
                >
                  <Menu size={20} />
                </button>
              )}
              <div className="relative">
                {activeUser.avatar ? (
                  <img 
                    src={activeUser.avatar} 
                    alt={activeUser.name}
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-lg font-medium text-white">
                      {activeUser.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                
                {activeUser.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="ml-3">
                <h3 className="font-medium">{activeUser.name}</h3>
                <div className="flex items-center text-sm">
                  <span className={`${activeUser.online ? 'text-green-600' : 'text-gray-500'}`}>
                    {activeUser.online ? 'Online' : 'Last seen recently'}
                  </span>
                  {activeUser.startupName && (
                    <span className="ml-2 text-gray-500">• {activeUser.startupName}</span>
                  )}
                </div>
              </div>
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div 
            ref={messagesContainerRef} 
            className="flex-1 overflow-y-auto p-4 space-y-2 bg-gradient-to-b from-gray-50 to-gray-100"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%239C92AC\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')" }}
          >
            {/* Load More button at the top */}
            {!allMsgFlag && messageList.length > 0 && (
              <div className="flex justify-center py-2">
                <button
                  onClick={handleLoadMoreMessages}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 rounded-full text-sm text-gray-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                  ) : (
                    <ChevronUp size={16} className="mr-2" />
                  )}
                  {loading ? "Loading..." : "Load More Messages"}
                </button>
              </div>
            )}
            
            {allMsgFlag && messageList.length > 0 && (
              <div className="w-full text-center text-sm text-gray-500 py-2 inline-block px-4">
                Beginning of conversation
              </div>
            )}
            
            {messageList.length > 0 ? (
              <>
                {messageList.map((msg) => (
                  <MessageBubble
                    key={msg?.id || Date.now()}
                    message={msg}
                    currentUserId={currentUserId}
                    formatDate={formatMessageDate}
                    handleDeleteMessage={handleDelete}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <MessageCircle size={48} className="text-blue-400" />
                </div>
                <p className="font-medium text-gray-600">No messages yet</p>
                <p className="text-sm mt-1">Start the conversation with {activeUser.name}</p>
              </div>
            )}
          </div>
       
          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-l-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sendDisabled}
              />
              <button
                disabled={isSendButtonDisabled}
                type="submit"
                className={`px-6 rounded-r-full transition-colors ${
                  isSendButtonDisabled 
                    ? "bg-blue-300 text-white cursor-not-allowed" 
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
          <div className="bg-white p-6 rounded-full shadow-sm mb-4">
            <MessageCircle size={64} className="text-blue-400" />
          </div>
          <h3 className="text-xl font-medium mb-2 text-gray-700">No conversation selected</h3>
          <p className="text-center max-w-md text-gray-500">
            Select a user from the sidebar to start chatting
          </p>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm"
            >
              Open Contacts
            </button>
          )}
        </div>
      )}
    </div>
  );
};