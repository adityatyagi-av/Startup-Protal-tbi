'use client';
import { StatsBar } from '@/components/Statsbar';
import { useSelector } from 'react-redux';
import Spinner from '@/components/component/spinner';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

export default function Home() {
  const [slider, setSlider] = useState(0);
  const dispatch = useDispatch();
  const [announData, setAnnounData] = useState([]);
  const [data, setData] = useState([]);
  

 

  const [searchParam, setSearchParam] = useState('');
  const [announcementSearchParam, setAnnouncementSearchParam] = useState('');
  const [refresh, setRefresh] = useState(false);
  
  
  

 
 
   
 

  
  

  

  //announcement
 

 
 
 
  //anouncement
  

  //refresh page


  return (
    <>
     
      <div className="flex flex-col w-full h-full">
        <div className="mb-[10px] flex h-[40px] w-full flex-row justify-start px-[2%] font-semibold">
          <button
            onClick={() => {
              setSlider(0);
            }}
            className={`mr-[4%] h-full w-[148px] rounded-2xl border border-gray-300 text-center text-lg shadow-sm hover:bg-[#1E3A8A] hover:text-white ${slider == 0 && 'bg-[#1E3A8A] text-white'} `}
          >
            Activites
          </button>
          <button
            onClick={() => {
              setSlider(1);
            }}
            className={`mr-[4%] h-full w-[148px] rounded-2xl border border-gray-300 text-center text-lg shadow-sm hover:bg-[#1E3A8A] hover:text-white ${slider == 1 && 'bg-[#1E3A8A] text-white'}`}
          >
            Anouncement
          </button>
        </div>
        {slider == 0 && (
          <div className="w-full px-[2%]">
            
          </div>
        )}
        {slider == 1 && (
          <div className="w-full px-[2%]">
            
          </div>
        )}
        <div className="w-full h-fit"></div>

        <div className="h-[900px] w-full"></div>
        <div className="h-[900px] w-full"></div>
      </div>
    </>
  );
}
