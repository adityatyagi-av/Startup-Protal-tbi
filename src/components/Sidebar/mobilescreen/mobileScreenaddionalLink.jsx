// AdditionSidebarItem.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SheetClose } from '@/components/ui/sheet'; // Import SheetClose

// Reusable AdditionSidebarItem component
export function AdditionSidebarItem({ imgSrc, hoverImgSrc, label, link }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <SheetClose asChild>
      <Link href={link}>
        <div
          className="ml-[15%] mt-[3%] flex h-[35px] w-[75%] flex-row items-center justify-start px-[2%] text-[#667085] hover:bg-[#1E3A8A] hover:text-white"
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false
        >
          {/* Change the image based on hover state */}
          <img
            src={isHovered ? hoverImgSrc : imgSrc} // Dynamic image source based on hover state
            className="drop-shadow-4xl h-[20px]"
          />
          <div className="ml-[10%]">{label}</div>
        </div>
      </Link>
    </SheetClose>
  );
}
