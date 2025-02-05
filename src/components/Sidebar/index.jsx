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
          imgSrc="/projects1.svg" 
          hoverImgSrc="/projects.svg" 
          label="Founder"
          link="/Founder/dashboard"
        />
      </div>

      {/* Incubation */}
      <div className="mt-[10px] w-full">
        <SidebarItem
          imgSrc="/projects1.svg" 
          hoverImgSrc="/projects.svg" 
          label="Dashboard"
          link="/Founder/dashboard"
        />
        <div className="flex flex-col justify-center w-full">
          <AdditionSidebarItem
            imgSrc="/inactive.svg" 
            hoverImgSrc="/projects.svg" 
            label=" Request Fcilities"
            link="/Founder/RequestFacilities"
          />
          <AdditionSidebarItem
            imgSrc="/inactive.svg"
            hoverImgSrc="/projects.svg"
            label="Funding Request"
            link="/Founder/RequestFunding"
          />
          <AdditionSidebarItem
            imgSrc="/inactive.svg"
            hoverImgSrc="/projects.svg"
            label="Upload DOC"
            link="/Founder/RequestDoc"
          />
          <AdditionSidebarItem
            imgSrc="/inactive.svg"
            hoverImgSrc="/projects.svg"
            label="Request Mentoring"
            link="/Founder/RequestedItems"
          />
          {/* <AdditionSidebarItem
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
          /> */}
        </div>
      </div>

      
    

      
      
    
      
    </div>
  );
}
