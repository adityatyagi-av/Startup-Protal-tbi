"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { HomeIcon } from 'lucide-react';

const NotFound = () => {
  const router = useRouter();

  const handleReturn = () => {
    toast.success('Redirecting to dashboard...', {
      duration: 2000,
      position: 'top-center',
    });
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        
        <div className="mt-4">
          <div className="relative">
            <div className="h-2 w-48 mx-auto bg-gradient-to-r from-purple-400 to-blue-500 rounded-full" />
          </div>
        </div>
        
        <h2 className="mt-8 text-3xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        
        <p className="mt-4 text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <button
          onClick={handleReturn}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg 
                   flex items-center justify-center mx-auto space-x-2 hover:opacity-90 transition-opacity"
        >
          <HomeIcon size={20} />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;