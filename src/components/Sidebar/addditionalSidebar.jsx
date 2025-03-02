import Link from 'next/link';
import React from 'react';

export const AddditionalSidebar = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start rounded-md bg-white p-1">
      <Link
        href="#"
        className="my-3 flex w-full flex-row justify-start rounded-md px-3 py-2 text-[#1b1b1b} hover:bg-[#acbff3f6] hover:text-[#1E3A8A]"
      >
        <img
          src="inactive.svg"
          className="mr-2 hover:brightness-0 hover:invert"
        />

        <div className="ml-[3%] text-xl"> Activity </div>
      </Link>
      <Link
        href="#"
        className="my-3 flex w-full flex-row justify-start rounded-md px-3 py-2 text-[#1b1b1b} hover:bg-[#acbff3f6] hover:text-[#1E3A8A]"
      >
        <img src="inactive.svg" className="mr-2" />
        <div className="ml-[3%] text-xl"> Activity</div>
      </Link>
      <Link
        href="#"
        className="my-3 flex w-full flex-row justify-start rounded-md px-3 py-2 text-[#1b1b1b} hover:bg-[#acbff3f6] hover:text-[#1E3A8A]"
      >
        <img src="inactive.svg" className="mr-2" />
        <div className="ml-[3%] text-xl"> Activity</div>
      </Link>
    </div>
  );
};
