'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use usePathname for path-based checks

// Reusable SidebarItem component
export function SidebarItem({ imgSrc, hoverImgSrc, label, link }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const path = usePathname(); // Get the current pathname

  // Check if the current path starts with '/admin/program' (to capture any dynamic path after `/admin/program/`)
  const isActive = path.startsWith(link);

  // This checks if '/admin/program' is at the beginning of the current path

  return (
    <Link href={link}>
      <div
        className={`ml-[2px] rounded-md mt-[13px] flex h-[40px] w-[91%] cursor-pointer flex-row items-center justify-start px-3 text-lg font-semibold text-[#0A1629] ${isActive ? 'bg-[#1E3A8A] text-white' : 'hover:bg-[#1E3A8A] hover:text-white'}`} // Add active and hover styles
        onMouseEnter={() => setIsHovered(true)} // Set hover state to true
        onMouseLeave={() => setIsHovered(false)} // Set hover state to false
      >
        <img
          src={isHovered || isActive ? hoverImgSrc : imgSrc} // Use hover or active image
          className="drop-shadow-4xl h-[30px]"
        />
        <div className="ml-[10%] truncate">{label}</div>
      </div>
    </Link>
  );
}
