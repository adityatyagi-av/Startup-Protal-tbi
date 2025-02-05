'use client';
import { SidebarItem } from './sliderbarLinkcomponent';
import { AddditionalSidebar } from './addditionalSidebar';
import { AdditionSidebarItem } from './sidebaraddiitonallink';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useEffect } from 'react';

export function Sidebar() {

  

  return (
    <div className="mx-[1%] flex h-auto flex-col items-start justify-start overflow-x-hidden overflow-y-hidden bg-[#FDFDFD]">
      {/* Logo section */}
      <div className="mt-[50px] flex w-full flex-row  justify-center  pr-[4%]">
        <img src="/kiet.svg" className="mr-3 h-[57px]" />
        <img src="/tbi.svg" className="h-[57px]" />
      </div>



      {/* Sidebar items */}
      <div className="mt-[13px] w-full">
        <SidebarItem
          imgSrc="/projects1.svg" // Default image
          hoverImgSrc="/projects.svg" // Image on hover
          label="Admin"
          link="/Founder/dashboard"
        />
      </div>

      {/* Incubation */}
      <div className="mt-[10px] w-full">
        <SidebarItem
          imgSrc="/projects1.svg" 
          hoverImgSrc="/projects.svg" 
          label="Incubation"
          link="/admin/incubation"
        />
        <div className="flex flex-col justify-center w-full">
          <AdditionSidebarItem
            imgSrc="/inactive.svg" 
            hoverImgSrc="/projects.svg" 
            label="Facilites Requested"
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
            label="Startup-Facilities"
            link="/admin/incubation/startup-facilites"
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
        <div className="flex flex-col justify-center w-full">
          {/* {Programs.map((program, index) => (

            <AdditionSidebarItem
              key={index}
              imgSrc="/inactive.svg"
              hoverImgSrc="/projects.svg"
              label={program.schemeName}
              link={`/admin/program/${program.id}`}
            />
          ))} */}

          {/* <AdditionSidebarItem
            imgSrc="/inactive.svg"  // Default image
            hoverImgSrc="/projects.svg"  // Image on hover
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
          /> */}
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
        <div className="flex flex-col justify-center w-full">
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


      {/* Quick Links */}
      <div className=" ml-[20%] mt-[20px] text-xl font-bold text-[#92929D] ">
        Quick link
      </div>
      <div className="flex w-full flex-col justify-start pt-[20px] text-[#0A1629]">
        <Link
          href="/admin/createProgram"
          className="ml-[23%] text-lg hover:underline"
        >
          Create-Program
        </Link>
        <Link
          href="/admin/createManager"
          className="ml-[23%] mt-[15px] text-lg hover:underline"
        >
          Create Manager
        </Link>
        <Link
          href="/evaluation-questions"
          className="ml-[23%] mt-[15px] text-lg hover:underline"
        >
          Evaluation Questions
        </Link>
        <Link
          href="/startup-profiles"
          className="ml-[23%] mt-[15px] text-lg hover:underline"
        >
          Startup Profile
        </Link>
        <Link
          href="/investment-records"
          className="ml-[23%] mt-[15px] text-lg hover:underline"
        >
          Investment Records
        </Link>
      </div>
    </div>
  );
}
