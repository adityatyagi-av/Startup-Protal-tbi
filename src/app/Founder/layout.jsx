'use client';
import { usePathname } from 'next/navigation';
import Requestcards from '@/components/component/dashboardcards'
import { Sidebar } from '@/components/Sidebar';
import { Nav } from '@/components/Navbar';
import { SheetDemo } from '@/components/Sidebar/mobilescreen/sidebarSheet';
import { StatsBar } from '@/components/Statsbar';
import toast, { Toaster } from 'react-hot-toast';
// Load local fonts

export default function Layout({ children }) {
  return (
    <div className="flex h-full w-full flex-row bg-[#FDFDFD]">
      <div className="no-scrollbar mx-[.5%] hidden h-screen w-[20%] overflow-y-auto rounded-md drop-shadow-md lg:fixed lg:block">
        <Sidebar />
      </div>

      <div className="flex w-full flex-col overflow-hidden lg:ml-[20%] lg:w-[80%]">
        <div className="fixed z-20 flex h-[12vh] w-full items-center justify-start bg-white lg:w-[81%]">
          <div className="mb-[12px] mt-0 lg:mb-8 lg:hidden">
            <SheetDemo />
          </div>
          <Nav />
        </div>

        <div className="no-scrollbar mt-[12vh] flex h-full min-h-screen w-full flex-col justify-start bg-[#FDFDFD]">
          <div className="h-[170px] w-full">
            <StatsBar />

          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
