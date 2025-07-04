import React from 'react';

export const Profile = ({ imageurl, name }) => {
  return (
    <div
      className="
        flex cursor-pointer flex-row items-center justify-evenly
        rounded-lg bg-white px-3 py-1 hover:bg-[#1E3A8A] hover:text-white
        sm:drop-shadow-lg
        w-80 h-24  // <-- Set width (w-80 = 320px), height (h-24 = 96px)
        sm:w-96 sm:h-28  // <-- Larger on small screens and up
        "
      style={{ minWidth: 0 }}
    >
      {/* <img
        src={imageurl}
        className="object-cover w-16 h-16 rounded-full sm:w-20 sm:h-20"
        alt="Profile"
      /> */}
      <div className="hidden h-full w-full truncate pl-2 pt-[5px] font-bold sm:block">
        {name}
      </div>
      <img
        src="/shape.svg"
        className="hidden pl-4 pt-[4%] sm:block"
        alt=""
      />
    </div>
  );
};
