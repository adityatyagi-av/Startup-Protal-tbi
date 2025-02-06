import React from 'react';

export const Profile = ({ imageurl, name }) => {
  return (
    <div className="flex h-full w-full cursor-pointer flex-row items-center justify-evenly rounded-lg bg-white px-3 py-1 hover:bg-[#1E3A8A] hover:text-white sm:drop-shadow-lg">
      <img src={imageurl} alt="Profile" />
      <div className="hidden h-full w-full truncate pl-2 pt-[5px] font-bold sm:block">
        {name}
      </div>
      <img src="/shape.svg" className="hidden pl-4 pt-[4%] sm:block" />
    </div>
  );
};
