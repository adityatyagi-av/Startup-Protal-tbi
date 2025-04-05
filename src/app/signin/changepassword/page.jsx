'use client';
import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '@/store/Action/ChangePasswordAction'; 
import TYPES from '@/store/constant'; // To reset state if needed

export default function ChangePassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const { loading, success, error } = useSelector((state) => state.changePassword || {});

  useEffect(() => {
    if (success) {
      toast.success(success);
      setTimeout(() => {
        router.push('/Founder/dashboard');
      }, 2000);
    }

    if (error) {
      toast.error(error);
    }

    return () => {
      dispatch({ type: TYPES.Change_Password_RESET });
    };
  }, [success, error, dispatch, router]);

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      return toast.error('New password must be at least 6 characters long');
    }

    if (newPassword !== confirmPassword) {
      return toast.error('New passwords do not match');
    }

    const passwordData = {
      currentPassword: sha256(currentPassword),
      newPassword: sha256(newPassword),
    };

    dispatch(changePassword(passwordData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Current Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPasswords"
              checked={showPasswords}
              onChange={togglePasswordVisibility}
              className="mr-2"
            />
            <label htmlFor="showPasswords" className="text-sm text-gray-600">Show Passwords</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg font-medium transition ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z" />
                </svg>
                Changing...
              </span>
            ) : (
              'Change Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

