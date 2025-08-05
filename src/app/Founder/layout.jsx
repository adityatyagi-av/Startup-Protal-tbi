'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Requestcards from '@/components/component/dashboardcards'
import { Sidebar } from '@/components/Sidebar';
import { Nav } from '@/components/Navbar';
import { SheetDemo } from '@/components/Sidebar/mobilescreen/sidebarSheet';
import { StatsBar } from '@/components/Statsbar';
import toast, { Toaster } from 'react-hot-toast';
import { AnouncementTable } from '@/components/Tables/Announcement';
// Load local fonts
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FetchChatUser } from '@/store/Action/chatAction';
import { initSocket } from '@/store/webSocketAction/webSocketAction';
export default function Layout({ children }) {


  // const { chatToken, flagSocketConnection,
  // } = useSelector((state) => state.chatReducer)
  // const dispatch = useDispatch();
  // let count = 1;
  // useEffect(() => {
  //   if (chatToken && !flagSocketConnection) {
  //     toast.success("intiatin socket ", count)
  //     count++;

  //     dispatch(initSocket(chatToken))
  //   }
  //   else if (!chatToken) {
  //     dispatch(FetchChatUser())
  //   }


  // }, [chatToken, flagSocketConnection
  // ])




  return (
    <div className="flex h-full w-full flex-row bg-[#FDFDFD] text-[#1b1b1b]">

      <div className="no-scrollbar mx-[.5%] hidden h-screen w-[20%] overflow-y-auto rounded-md  shadow-xl [box-shadow:4px_0_6px_rgba(0,0,0,0.1)] lg:fixed lg:block">
        <Sidebar />
      </div>


      <div className="flex w-full flex-col overflow-hidden lg:ml-[21%] lg:w-[80%]">

        <div className="fixed z-20 flex h-[12vh] w-full items-center justify-start bg-white lg:w-[81%]">
          <div className="mb-[12px] mt-0 lg:mb-8 lg:hidden">
            <SheetDemo />
          </div>
          <Nav />
        </div>

        <div className="no-scrollbar mt-[12vh] flex max-h-[88vh] w-full flex-col justify-start bg-[#FDFDFD]">


          <div className="flex-1 overflow-auto  no-scrollbar">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}
