"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/component/spinner";
import { useRouter } from "next/navigation";


const TestPage = () => {
  const router = useRouter();



  useEffect(() => {
     router.push("/Founder/dashboard")
  }, []);

  
  
  

  return (
    <div>
     <Spinner/>
    </div>
  );
};

export default TestPage;
