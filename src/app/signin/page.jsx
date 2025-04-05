'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { sha256 } from 'js-sha256';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '@/store/Action/refreshAcessTokenAction';

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setButtonDisabled(!(isValidEmail(email) && password.length >= 3));
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setButtonDisabled(true);
    try {
      const encryptedPassword = await sha256(password);
      const url = process.env.NEXT_PUBLIC_DATABASE_URL;

      const response = await axios.post(
        `${url}/founder/login`,
        {
          email,
          password: encryptedPassword,
        },
        { withCredentials: true },
      );

      if (response.data.statusCode === 200) {
        await localStorage.setItem(
          'accessTokenFounder',
          response.data.data.accessToken,
        );
        await localStorage.setItem(
          'refreshTokenFounder',
          response.data.data.refreshToken,
        );
        toast.success('Successfully logged in');
        await dispatch(getAccessToken());

        setTimeout(() => {
          router.push('/Founder/dashboard');
        }, 4000);
      } else {
        toast.error(response.data.message || "Error occurred");
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage || 'Something went wrong');
    } finally {
      setIsLoading(false);
      setButtonDisabled(!(isValidEmail(email) && password.length >= 3));
    }
  }

  return (
    <div className="flex h-screen w-screen bg-back-rgba p-2 text-[#1b1b1b]">
      <div className="relative flex h-full w-full flex-col items-center justify-center rounded-none bg-white p-4 md:w-[45%] md:items-start md:rounded-l-3xl md:bg-inner-rgba md:bg-transparent md:p-6 lg:p-12">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-50 md:hidden"
          style={{ backgroundImage: "url('/login.png')" }}
        ></div>
        <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto md:items-start">
          <div className="flex gap-4 mb-6 md:mb-10">
            <img className="w-10 h-10 md:h-16 md:w-16" src="/kiet.svg" alt="Logo 1" />
            <img className="w-10 h-10 md:h-16 md:w-16" src="/image3.png" alt="Logo 2" />
          </div>
          <h1 className="text-hd-rgba mb-1 font-[poppins] text-2xl font-semibold md:mb-2 md:text-4xl">
            Sign In
          </h1>
          <p className="text-brdr-rgba mb-4 text-center font-[poppins] text-xs md:mb-10 md:text-left md:text-lg">
            Kindly fill in your details to sign in to your account
          </p>
          <form className="flex flex-col w-full px-2 md:px-0" onSubmit={handleSubmit}>
            <label className="mb-2 text-xs font-medium text-txt-rgba md:text-base">
              Email Address <span className='text-red-500'>*</span>
            </label>
            <input
              type="text"
              className="w-full h-10 pl-4 mb-1 border rounded-lg bg-input-rgba border-brdr-rgba text-brdr-rgba md:h-12"
              placeholder="Enter your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {email && !isValidEmail(email) && (
              <p className="mb-4 text-xs text-red-500">
                Please enter a valid email address
              </p>
            )}

            <label className="mt-6 mb-1 text-xs font-medium text-txt-rgba md:text-base">
              Password<span className='text-red-500'> *</span>
            </label>
            <div className="relative w-full mb-1">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full h-10 pl-4 pr-10 border rounded-lg bg-input-rgba border-brdr-rgba text-brdr-rgba md:h-12"
                placeholder="Enter your Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute text-xs text-gray-500 right-2 top-2"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {password && password.length < 3 && (
              <p className="mb-1 text-xs text-red-500">
                Please enter a valid password
              </p>
            )}

            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => router.push("/signin/changepassword")}
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={buttonDisabled || isLoading}
              className={`mt-2 h-10 w-full rounded-lg font-medium text-white shadow-lg md:h-12 ${buttonDisabled || isLoading
                ? 'cursor-not-allowed bg-gray-400'
                : 'cursor-pointer bg-blue-rgba'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden h-full w-[50%] flex-col items-center justify-center rounded-r-3xl bg-blue-rgba md:flex">
        <h2 className="text-3xl font-bold text-center text-white md:mb-6 md:text-4xl">
          Empowering Startups with Mentors. Resources. Investments.
        </h2>
        <img
          src="/login.png"
          className="max-w-xs mt-6 lg:max-w-md"
          alt="Sign In Visual"
        />
      </div>
    </div>
  );
}
