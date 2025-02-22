import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFounderDetails } from '@/store/Action/getFounderDetailAction';
import { Input } from '@/components/ui/input';
import { CiSearch } from 'react-icons/ci';
import { Profile } from '../component/userProfile';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import { getAccessToken } from '@/store/Action/refreshAcessTokenAction';

export const Nav = () => {
  const [greet, setGreet] = useState('Good morning');
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.founderDetails);
   
  console.log(data)

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    if (hours >= 0 && hours < 12) {
      setGreet("Good Morning !");
    } else if (hours >= 12 && hours < 18) {
      setGreet("Good Afternoon !");
    } else {
      setGreet("Good Evening !");
    }
  }, []);

  useEffect(() => {
    dispatch(getFounderDetails()); 
  }, [dispatch]);

  async function handleLogout() {
    localStorage.setItem('accessTokenFounder', '');
    localStorage.setItem('refreshTokenFounder', '');
    dispatch(getAccessToken())
    toast.success('Logout successfully');
  }

  return (
    <div className="navbar mt-0 flex h-full w-full flex-row justify-between bg-[#FDFDFD] pt-[10px]">
      <div className="ml-[2%] h-[50px] w-[17%] pt-[3%] sm:pt-0">
        <div className="font-lg truncate gap-0 overflow-hidden text-xl font-bold text-[#1b1b1b} lg:text-2xl">
          {greet}
          <div className="ml-[2px] mt-[0px] w-fit gap-0 text-sm text-[#A2A1A8] lg:text-lg">
            Administrator
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="ml-[3%] hidden h-[40px] w-[30%] sm:block lg:w-[40%]">
        <div className="mt-[1%] flex items-center justify-between rounded-md">
          <div className="relative w-full rounded-md drop-shadow-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 rounded-md">
              <CiSearch className="w-5 h-5 text-gray-500 bg-white rounded-md" />
            </span>
            <Input
              type="search"
              placeholder="Search"
              className="h-[50px] w-full rounded-md border border-gray-100 bg-white pl-10 placeholder:text-[#1b1b1b} focus:border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Profile & Logout */}
      <div className="flex ml-0 h-[60px] w-full items-center justify-end gap-[4%] pr-[4.4%] sm:w-[40%]">
        <div
          onClick={handleLogout}
          className="ml-[1.5%] group cursor-pointer mt-[0.5%] flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-white hover:bg-[#1E3A8A] sm:h-[50px] sm:w-[45px] sm:drop-shadow-md"
        >
          <LogOut className="h-[25px] w-[80%] group-hover:text-white" />
        </div>

       
        <Link href="/Founder/profile">
          <div className="ml-[2%] mt-[0.5%] flex h-[50px] w-fit text-wrap">
            <Profile 
              imageurl={data?.avatar || '/photo.svg'} 
              name={data?.name || 'Adarsh'} 
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
