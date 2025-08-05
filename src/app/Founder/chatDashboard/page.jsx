"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import {
  Search,
  Send,
  MessageCircle,
  Users,
  X,
  Menu,
  ChevronDown,
  Plus
} from 'lucide-react';
import { FetchChatUser, fetchMessages, FetchChatUserQuesry } from '@/store/Action/chatAction';
import { socketSendMessage } from '@/store/webSocketAction/webSocketAction';
import TYPES from '@/store/constant';
import NewChatModal from '@/modals/newChatModal/page';

const ChatPage = () => {
  const dispatch = useDispatch();
  const {
    chatToken,
    flagSocketConnection,
    loading,
    chatUsers,
    messages,
    searchUser,
    sendMessage: sentMessage,
    newMessage: receivedMessage,
    unreadChatUser,
    currPage,
    allMsgFlag
  } = useSelector(state => state.chatReducer);

  // Local state management
  const [socket, setSocket] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);

  // Refs
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const sendMessageTimeoutRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    if (chatToken && !socket) {
      console.log("Initializing socket connection with token:", chatToken);
      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:5000", {
        auth: {
          token: chatToken  // 👈 pass token here
        },
        transports: ['websocket'],
        timeout: 20000,
        forceNew: true
      });

      // Connection events
      newSocket.on('connect', () => {
        console.log('Connected to server with socket ID:', newSocket.id);
        setIsConnected(true);
        dispatch({ type: TYPES.SET_SOCKET_CONNECTION_SUCCESS, payload: [] });
      });

      newSocket.on('disconnect', (reason) => {
        console.log('Disconnected from server, reason:', reason);
        setIsConnected(false);
        setSendingMessage(false);
        dispatch({ type: TYPES.SET_SOCKET_CONNECTION_FAILURE });
      });

      // Message events
      newSocket.on('newMessage', (messageData) => {
        console.log('Received new message:', messageData);
        dispatch({ type: TYPES.NEW_MESSAGE_RECEIVED, payload: messageData });
      });

      newSocket.on('savedMessage', (messageData) => {
        console.log('Message saved successfully:', messageData);
        if (sendMessageTimeoutRef.current) {
          clearTimeout(sendMessageTimeoutRef.current);
        }
        dispatch({ type: TYPES.SEND_MESSAGE_SUCCESS, payload: messageData });
        setSendingMessage(false);
      });

      newSocket.on('messageSent', (messageData) => {
        console.log('Message sent confirmation:', messageData);
        if (sendMessageTimeoutRef.current) {
          clearTimeout(sendMessageTimeoutRef.current);
        }
        dispatch({ type: TYPES.SEND_MESSAGE_SUCCESS, payload: messageData });
        setSendingMessage(false);
      });

      // Error handling
      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setIsConnected(false);
        setSendingMessage(false);
        dispatch({ type: TYPES.SET_SOCKET_CONNECTION_FAILURE });
      });

      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
        setSendingMessage(false);
      });

      // Handle message sending errors
      newSocket.on('messageError', (error) => {
        console.error('Message sending error:', error);
        setSendingMessage(false);
        // You might want to show an error toast here
      });

      setSocket(newSocket);

      return () => {
        console.log('Cleaning up socket connection');
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [chatToken]);

  // Fetch chat users and token on mount
  useEffect(() => {
    if (!chatToken) {
      dispatch(FetchChatUser());
    }
  }, []);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, localMessages]);

  // Handle search with debouncing - only for local chat users
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // No API calls needed - we're just filtering locally
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (sendMessageTimeoutRef.current) {
        clearTimeout(sendMessageTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Reset unread messages when new message is received
  useEffect(() => {
    if (receivedMessage && activeUser && receivedMessage.senderId === activeUser.id) {
      dispatch({ type: TYPES.RESET_UNREAD_CHATUSER, payload: activeUser.id });
    }
  }, [receivedMessage, activeUser, dispatch]);


  useEffect(() => {
    if (sentMessage) {

      setLocalMessages(prev => prev.filter(msg => {
        if (!msg.isTemporary) return true;

        const messageSentRecently = Date.now() - new Date(msg.createdAt).getTime() < 60000;
        return !(msg.message === sentMessage.message && messageSentRecently);
      }));
    }
  }, [sentMessage]);

  // Utility functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Event handlers
  const handleUserSelect = (user) => {
    setActiveUser(user);
    setLocalMessages([]); // Clear local messages when switching users
    dispatch({ type: TYPES.SET_ACTIVE_CHATUSER });
    dispatch(fetchMessages(user.id, 10, 1));

    // Reset unread count
    if (unreadChatUser[user.id]) {
      dispatch({ type: TYPES.RESET_UNREAD_CHATUSER, payload: user.id });
    }

    // Clear search when selecting a user
    if (searchQuery.trim()) {
      setSearchQuery('');
    }

    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle new chat from modal
  const handleNewChatSelect = (userId) => {
    // Find the user from search results (from NewChatModal)
    const user = searchUser?.find(u => u.id === userId);

    if (user) {
      handleUserSelect(user);
    }
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();

    if (!newMessage.trim() || !socket || !activeUser || sendingMessage) {
      console.log('Send message blocked:', {
        hasMessage: !!newMessage.trim(),
        hasSocket: !!socket,
        hasActiveUser: !!activeUser,
        isSending: sendingMessage
      });
      return;
    }

    console.log('Sending message:', newMessage.trim(), 'to user:', activeUser.id);
    setSendingMessage(true);

    // Create message data
    const messageData = {
      receiverId: activeUser.id,
      message: newMessage.trim(),
      // timestamp: new Date().toISOString()
    };

    // Send message through socket
    if (socket && socket.connected) {
      socket.emit('sendMessage', messageData);
      console.log('Message sent via socket:', messageData);

      // Set a timeout to reset sending state if no confirmation received
      if (sendMessageTimeoutRef.current) {
        clearTimeout(sendMessageTimeoutRef.current);
      }

      sendMessageTimeoutRef.current = setTimeout(() => {
        console.log('Message sending timeout, resetting state');
        setSendingMessage(false);
      }, 10000); // 10 second timeout

    } else {
      console.error('Socket not connected');
      setSendingMessage(false);
      return;
    }

    // Clear input and focus
    setNewMessage('');
    messageInputRef.current?.focus();

    // Add message to local state immediately for better UX
    const tempMessage = {
      id: Date.now(), // temporary ID
      message: messageData.message,
      senderId: 'current_user', // This should be the current user's ID
      recipientId: activeUser.id,
      createdAt: new Date().toISOString(), // Fix: Always set current timestamp
      isTemporary: true
    };

    // Add to local messages array for immediate display
    setLocalMessages(prev => [...prev, tempMessage]);
  };

  const handleLoadMore = () => {
    if (!loading && !allMsgFlag && activeUser) {
      dispatch(fetchMessages(activeUser.id, 10, currPage + 1));
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get user role and avatar based on the new data structure
  const getUserInfo = (user) => {
    if (user.manager) {
      return {
        role: user.manager.role,
        avatar: user.manager.avatar,
      };
    } else if (user.admin) {
      return {
        role: user.admin.role,
        avatar: user.admin.avatar,
      };
    } else if (user.founder) {
      return {
        role: user.founder.role,
        avatar: user.founder.avatar,
      };
    }
    return { role: 'user', avatar: null };
  };

  // Get users to display - only filter existing chat users locally
  const usersToDisplay = useMemo(() => {
    if (!searchQuery.trim()) {
      return chatUsers || [];
    }

    // When searching, only filter through existing chat users (no API call)
    return (chatUsers || []).filter(user =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chatUsers, searchQuery]);

  // Combine Redux messages with local messages and remove duplicates
  const allMessages = useMemo(() => {
    const combined = [...(messages || []), ...localMessages];
    // Remove duplicates based on message content and timestamp proximity
    const unique = combined.filter((message, index, arr) => {
      if (!message.isTemporary) return true;

      // Check if there's a non-temporary message with the same content
      const hasRealMessage = arr.some((msg, i) =>
        !msg.isTemporary &&
        msg.message === message.message &&
        Math.abs(new Date(msg.createdAt).getTime() - new Date(message.createdAt).getTime()) < 60000 // Within 1 minute
      );

      return !hasRealMessage;
    });

    // Sort by createdAt to maintain chronological order
    return unique.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [messages, localMessages]);

  const MessageBubble = ({ message, isOwn }) => (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isOwn
        ? `bg-blue-500 text-white rounded-br-sm ${message.isTemporary ? 'opacity-70' : ''}`
        : 'bg-gray-200 text-gray-800 rounded-bl-sm'
        }`}>
        <p className="text-sm">{message.message}</p>
        <div className="flex items-center justify-between">
          <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
            {formatTime(message.createdAt)}
          </p>
          {message.isTemporary && (
            <div className="ml-2">
              <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const UserListItem = ({ user, isActive, onClick }) => {
    const hasUnread = unreadChatUser[user.id];
    const userInfo = getUserInfo(user);

    return (
      <div
        onClick={onClick}
        className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 ${isActive ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
          }`}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            {user.avatar || userInfo.avatar ? (
              <img
                src={user.avatar || userInfo.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {user.name?.charAt(0)?.toUpperCase() == "null null" ? 'U' : user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            )}
            {/* Online indicator */}
            {isActive && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className={`font-medium truncate ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                  {user.name || 'Unknown User'}
                </h3>
                {userInfo.role && (
                  <span className="text-xs text-blue-600 capitalize">
                    {userInfo.role.replace(/_/g, ' ')}
                  </span>
                )}
              </div>
              {user.lastMessageTime && (
                <span className={`text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {formatTime(user.lastMessageTime)}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-1">
              <p className={`text-sm truncate ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                {user.lastMessage || user.email || 'No messages yet'}
              </p>
              {hasUnread && (
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading && !chatToken) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] bg-gray-50 flex overflow-hidden" onClick={() => { console.log('Clicked outside', chatToken, "h") }}>
      {/* Sidebar */}
      <div className={`${isMobile
        ? `fixed inset-y-0 left-0 z-50 w-80 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`
        : 'w-80'
        } bg-white border-r border-gray-200 flex flex-col h-full`}>

        {/* Fixed Sidebar Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
            <div className="flex items-center space-x-2">
              <NewChatModal setActiveUserId={handleNewChatSelect} />
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Connection Status */}
          <div className="flex items-center mt-3">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Connected' : 'Connecting...'}
            </span>
            {chatToken && (
              <span className="text-xs text-gray-400 ml-2">
                {socket ? 'Socket Ready' : 'No Socket'}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Users List */}
        <div className="flex-1 overflow-y-auto">
          {/* Show search results indicator */}
          {searchQuery.trim() && (
            <div className="sticky top-0 px-4 py-2 bg-blue-50 border-b border-blue-100 z-10">
              <p className="text-xs text-blue-700">
                {usersToDisplay.length} conversation{usersToDisplay.length !== 1 ? 's' : ''} found for "{searchQuery}"
              </p>
            </div>
          )}

          {loading && !chatUsers ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">
                Loading conversations...
              </p>
            </div>
          ) : usersToDisplay && usersToDisplay.length > 0 ? (
            <div className="pb-4">
              {/* Show all users - just local filtering, no sections needed */}
              {usersToDisplay.map(user => (
                <UserListItem
                  key={user.id}
                  user={user}
                  isActive={activeUser?.id === user.id}
                  onClick={() => handleUserSelect(user)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p>{searchQuery ? 'No matching conversations found' : 'No conversations yet'}</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-blue-500 hover:text-blue-600 text-sm"
                >
                  Clear search
                </button>
              )}
              {!searchQuery && !chatUsers?.length && (
                <p className="text-sm mt-2">Use the "New Chat" button to start a conversation</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {activeUser ? (
          <>
            {/* Fixed Chat Header */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center">
                {isMobile && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="mr-3 p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Menu size={20} />
                  </button>
                )}

                {activeUser.avatar ? (
                  <img
                    src={activeUser.avatar}
                    alt={activeUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {activeUser.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}

                <div className="ml-3">
                  <h2 className="font-medium text-gray-900">{activeUser.name || 'Unknown User'}</h2>
                  <p className="text-sm text-gray-500">
                    {activeUser.email && `${activeUser.email} • `}
                    {isConnected ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-gradient-to-b from-gray-50 to-gray-100">
              {/* Load More Button */}
              {!allMsgFlag && messages.length > 0 && (
                <div className="flex justify-center py-2">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 rounded-full text-sm text-gray-700 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                    ) : (
                      <ChevronDown size={16} className="mr-2" />
                    )}
                    {loading ? "Loading..." : "Load More Messages"}
                  </button>
                </div>
              )}

              {allMessages.length > 0 ? (
                <>
                  {allMessages.map((message, index) => {
                    const showDateSeparator = index === 0 ||
                      formatDate(allMessages[index - 1].createdAt) !== formatDate(message.createdAt);

                    return (
                      <div key={message.id || index}>
                        {showDateSeparator && (
                          <div className="text-center my-4">
                            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-600">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        )}
                        <MessageBubble
                          message={message}
                          isOwn={message.senderId !== activeUser.id}
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="font-medium">No messages yet</p>
                    <p className="text-sm">Start a conversation with {activeUser.name}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Fixed Message Input */}
            <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={messageInputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                    placeholder="Type a message..."
                    disabled={!isConnected || sendingMessage}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !isConnected || sendingMessage}
                  className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {sendingMessage ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="mb-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center mx-auto"
                >
                  <Menu size={18} className="mr-2" />
                  Open Conversations
                </button>
              )}
              <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No conversation selected</h3>
              <p className="text-gray-500 max-w-sm">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;