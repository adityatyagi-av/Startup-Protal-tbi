// SidebarItem.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SheetClose } from '../../ui/sheet';

// Reusable SidebarItem component
export function SidebarItem({ imgSrc, hoverImgSrc, label, link }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <SheetClose asChild>
      <Link href={link}>
        <div
          className="ml-[2px] mt-[13px] flex h-[40px] w-[91%] cursor-pointer flex-row items-center justify-start px-3 text-lg font-semibold text-[#0A1629] hover:bg-[#1E3A8A] hover:text-white"
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false
        >
          {/* Change the image based on hover state */}
          <img
            src={isHovered ? hoverImgSrc : imgSrc} // Dynamic image source based on hover state
            className="drop-shadow-4xl h-[30px]"
          />
          <div className="ml-[10%]">{label}</div>
        </div>
      </Link>
    </SheetClose>
  );
}
