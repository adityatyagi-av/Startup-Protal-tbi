import React from 'react';
import { ChevronDown } from 'lucide-react';
export const Profile = ({ imageurl, name }) => {
  return (
    <div className="flex h-full w-full cursor-pointer flex-row items-center justify-evenly rounded-lg bg-white px-3 py-1 hover:bg-[#1E3A8A] hover:text-white sm:drop-shadow-lg">
      <img src={imageurl} className='w-[25px] rounded-full' alt="Profile" />
      <div className="h-full w-full truncate pl-2 pt-[5px] font-bold  text-center mt-2">
        {name}
      </div>
      <ChevronDown />
    </div>
  );
};
