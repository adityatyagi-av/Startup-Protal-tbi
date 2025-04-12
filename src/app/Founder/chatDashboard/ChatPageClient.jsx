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
    const params = new URLSearchParams(window.location.search);
    console.log(params)
    params.set("user", userId);
    // This doesn't trigger a full page reload but updates the URL
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Handle user ID changes from URL parameter
  useEffect(() => {
    if (user && users.length > 0) {
      setActiveUserId(user);
      const userFound = users.find(u => u.id === user);
      if (userFound) {
        setActiveUser(userFound);
        dispatch(resetUnreadChatUser(user));
      }
    }
  }, [user]);

  // Fetch chat users if not available
  useEffect(() => {
    if (chatUsers.length === 0) {
      dispatch(FetchChatUser());
    } else {
      setUsers(chatUsers);
    }
  }, [chatUsers, dispatch]);

  // Handle active user ID changes
  useEffect(() => {
    if (!activeUserId || activeUserId !== user) {

      setActiveUserId(parseInt(user))
      dispatch(changeActiveUser(user));
      toast.success("User switched");


      const userFound = users.find(u => u.id == user);
      if (userFound) {
        setActiveUser(userFound);
      }
    }
  }, [user]);

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
    <div className="h-[88vh] w-full flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile menu button */}
        {isMobile && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-10 p-2 bg-white rounded-md shadow-md"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Sidebar */}
        {(sidebarOpen || !isMobile) && (
          <div className={`${isMobile ? 'absolute z-20 h-full' : 'relative'}`}>
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
        <ChatArea
          activeUser={activeUser}
          isMobile={isMobile}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
    </div>
  );
}