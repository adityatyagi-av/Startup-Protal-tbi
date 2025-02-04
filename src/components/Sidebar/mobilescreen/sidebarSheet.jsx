'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Sidebar } from '..';
import { Menu, X } from 'lucide-react';
import { SidebarItem } from './mobilesidbarmenu';

import { AdditionSidebarItem } from './mobileScreenaddionalLink';
import Link from 'next/link';
export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="ml-4 text-3xl">
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <div className="no-scrollbar mx-[1%] flex h-full flex-col items-start justify-start overflow-x-hidden bg-[#FDFDFD]">
          {/* Logo section */}
          <div className="mt-[50px] flex w-full flex-row items-center justify-center">
            <img src="/kiet.svg" className="mr-3 h-[57px]" />
            <img src="/tbi.svg" className="h-[57px]" />
          </div>

          {/* Divider */}
          <div className="mt-[20px] flex w-full justify-center">
            <hr className="h-[2.3px] w-[200px] bg-[#EAECF0]" />
          </div>

          {/* Sidebar items */}
          <div className="mt-[13px] w-full">
            <SidebarItem
              imgSrc="/projects1.svg" // Default image
              hoverImgSrc="/projects.svg" // Image on hover
              label="Admin"
              link="/admin/dashboard"
            />
          </div>

          {/* Incubation */}
          <div className="mt-[10px] w-full">
            <SidebarItem
              imgSrc="/projects1.svg" // Default image
              hoverImgSrc="/projects.svg" // Image on hover
              label="Incubation"
              link="/admin/incubation"
            />
            <div className="flex w-full flex-col justify-center">
              <AdditionSidebarItem
                imgSrc="/inactive.svg" // Default image
                hoverImgSrc="/projects.svg" // Image on hover
                label="Startup Facilities"
                link="/admin/incubation/facilities"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Office Space"
                link="/admin/incubation/space"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Schedule Meeting"
                link="/admin/incubation/schedule-meet"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Infrastructure"
                link="/admin/incubation/infrastructure"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Reports"
                link="/admin/incubation/reports"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Manage Profiles"
                link="/admin/incubation/manage-profiles"
              />
            </div>
          </div>

          {/* Program */}
          <div className="mt-[10px] w-full">
            <SidebarItem
              imgSrc="/projects1.svg" // Default image
              hoverImgSrc="/projects.svg" // Image on hover
              label="Program"
              link="/admin/program"
            />
            <div className="flex w-full flex-col justify-center">
              <AdditionSidebarItem
                imgSrc="/inactive.svg" // Default image
                hoverImgSrc="/projects.svg" // Image on hover
                label="Review Startups"
                link="/admin/program/review-startups"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Panel Members"
                link="/admin/program/panel"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Evaluation Question"
                link="/evaluation-questions"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Manage Notifications"
                link="/manage-notifications"
              />
            </div>
          </div>

          {/* Investment */}
          <div className="mt-[10px] w-full">
            <SidebarItem
              imgSrc="/projects1.svg" // Default image
              hoverImgSrc="/projects.svg" // Image on hover
              label="Investment"
              link="/admin"
            />
            <div className="flex w-full flex-col justify-center">
              <AdditionSidebarItem
                imgSrc="/inactive.svg" // Default image
                hoverImgSrc="/projects.svg" // Image on hover
                label="Startup Profiles"
                link="/startup-profiles"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Funding Records"
                link="/funding-records"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Investment Records"
                link="/investment-records"
              />
              <AdditionSidebarItem
                imgSrc="/inactive.svg"
                hoverImgSrc="/projects.svg"
                label="Generate Reports"
                link="/generate-reports"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="mt-[30px] flex w-full justify-center">
            <hr className="h-[2.3px] w-[200px] bg-[#EAECF0]" />
          </div>

          {/* Quick Links */}
          <div className="text-stroke ml-[20%] mt-[20px] text-xl font-bold text-[#92929D] drop-shadow-md">
            Quick link
          </div>
          <div className="flex w-full flex-col justify-start pt-[20px] text-[#0A1629]">
            <Link
              href="/review-startups"
              className="ml-[23%] text-lg hover:underline"
            >
              Review Startup
            </Link>
            <Link
              href="/startup-facilities"
              className="ml-[23%] mt-[15px] text-lg hover:underline"
            >
              Startup Facilities
            </Link>
            <Link
              href="/evaluation-questions"
              className="ml-[23%] mt-[15px] text-lg hover:underline"
            >
              Evaluation Question
            </Link>
            <Link
              href="/funding-records"
              className="ml-[23%] mt-[15px] text-lg hover:underline"
            >
              Funding Records
            </Link>
            <Link
              href="/investment-records"
              className="ml-[23%] mt-[15px] text-lg hover:underline"
            >
              Investment Records
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
