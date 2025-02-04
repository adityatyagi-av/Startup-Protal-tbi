'use client'; // Make sure this is included for Next.js 13+ to handle client-side components properly

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdditionSidebarItem({ imgSrc, hoverImgSrc, label, link }) {
  const [isHovered, setIsHovered] = useState(false);

  const path = usePathname();

  // Encode the label for use in the URL
  const encodedLabel = encodeURIComponent(label);

  return (
    <Link href={`${link}`}>
      <div
        className={`ml-[15%] mt-[3%] flex h-[35px] w-[75%] flex-row items-center justify-start rounded-md px-[2%] text-[#667085] hover:bg-[#1E3A8A] hover:text-white ${path === `/admin/program/${encodedLabel}` && 'bg-[#1E3A8A] text-white'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={path === `/admin/program/${encodedLabel}` || isHovered ? hoverImgSrc : imgSrc}
          className="drop-shadow-4xl h-[20px]"
        />
        <div className="ml-[10%] truncate">{label}</div>
      </div>
    </Link>
  );
}
