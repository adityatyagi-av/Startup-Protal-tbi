"use client"

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Menu } from 'lucide-react';
import { ChatSidebar } from './chatComponent';
import { ChatArea } from './chatArea';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveUser, FetchChatUser, resetUnreadChatUser } from '@/store/Action/chatAction';
import toast from 'react-hot-toast';

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeUserId, setActiveUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const dispatch = useDispatch();
  const { loading, chatUsers = [] } = useSelector((state) => state.chatReducer);
  
  // Function to update URL parameters
  const changeUser = (userId) => {
    router.push(`?user=${userId}`, { scroll: false });
  };
  
  // Handle user ID changes from URL parameter
  useEffect(() => {
    if (user && chatUsers.length > 0) {
      const userId = parseInt(user);
      setActiveUserId(userId);
      const userFound = chatUsers.find(u => u.id === userId);
      if (userFound) {
        setActiveUser(userFound);
        dispatch(resetUnreadChatUser(userId));
      }
    }
  }, [user, chatUsers, dispatch]);
  
  // Fetch chat users if not available
  useEffect(() => {
    if (chatUsers.length === 0) {
      dispatch(FetchChatUser());
    } else {
      setUsers(chatUsers);
    }
  }, [chatUsers, dispatch]);
  
  // Handle active user change in Redux
  useEffect(() => {
    if (user) {
      const userId = parseInt(user);
      dispatch(changeActiveUser(userId));
    }
  }, [user, dispatch]);
  
  // Handle responsive layout
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return (
    <div className="h-[88vh] w-full flex flex-col overflow-hidden">
      <div className="flex flex-1 w-full h-full overflow-hidden">
        {/* Mobile menu button */}
        {isMobile && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute z-10 p-2 bg-white rounded-md shadow-md top-4 left-4"
          >
            <Menu size={24} />
          </button>
        )}
        
        {/* Sidebar */}
        {(sidebarOpen || !isMobile) && (
          <div className={`${isMobile ? 'absolute z-20 h-full w-64' : 'relative h-full w-64'} flex-shrink-0`}>
            <ChatSidebar
              users={users}
              setUsers={setUsers}
              activeUserId={activeUserId}
              setActiveUserId={changeUser}
              isMobile={isMobile}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        )}
        
        {/* Chat area */}
        <div className="flex-grow h-full overflow-hidden">
          <ChatArea
            activeUser={activeUser}
            isMobile={isMobile}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      </div>
    </div>
  );
}