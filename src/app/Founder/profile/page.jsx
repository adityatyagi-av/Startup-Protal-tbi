'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFounderDetails } from '@/store/Action/getFounderDetailAction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Camera } from 'lucide-react';

export default function Profile() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.founderDetails);
  const [profileImage, setProfileImage] = useState('/photo.svg');

  useEffect(() => {
    dispatch(getFounderDetails());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setProfileImage(data.avatar || '/photo.svg');
    }
  }, [data]);

  return (
    <Card className="w-full max-w-3xl px-2 py-4 mx-auto mt-6 border rounded-lg shadow-lg sm:mt-10 sm:p-5">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 md:flex-row md:gap-12">
        {/* Profile Image */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="relative mb-4 w-28 h-28 sm:w-32 sm:h-32 sm:mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="object-cover w-full h-full border-4 border-blue-700 rounded-full"
            />
            <label htmlFor="imageUpload" className="absolute bottom-0 right-0 cursor-pointer">
              <Camera className="w-8 h-8 p-1 text-gray-700 bg-white rounded-full sm:w-10 sm:h-10" />
            </label>
            <input id="imageUpload" type="file" className="hidden" accept="image/*" />
          </div>
        </div>
        {/* Profile Details */}
        <div className="grid w-full grid-cols-1 gap-4 md:w-2/3 sm:grid-cols-2 sm:gap-6">
          <div>
            <Label>Full Name</Label>
            <Input className="w-full" value={data?.name || ''} readOnly />
          </div>
          <div>
            <Label>Username</Label>
            <Input className="w-full" value={data?.username || ''} readOnly />
          </div>
          <div>
            <Label>Email</Label>
            <Input className="w-full" value={data?.email || ''} readOnly />
          </div>
          <div>
            <Label>Phone</Label>
            <Input className="w-full" value={data?.phone || ''} readOnly />
          </div>
          <div className="relative">
            <Label>DOB</Label>
            <Input className="w-full" type="date" value={data?.DOB?.split('T')[0] || ''} readOnly />
            <Calendar className="absolute w-5 h-5 text-gray-400 pointer-events-none right-3 top-10" />
          </div>
          <div>
            <Label>Postal Address</Label>
            <Input className="w-full" value={data?.postalAddress || ''} readOnly />
          </div>
          <div>
            <Label>Education</Label>
            <Input className="w-full" value={data?.education || ''} readOnly />
          </div>
          <div>
            <Label>Experience</Label>
            <Input className="w-full" value={data?.experience || ''} readOnly />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
        <Button variant="destructive" className="w-full sm:w-auto">Delete</Button>
        <Button className="w-full bg-blue-900 sm:w-auto">Edit</Button>
      </CardFooter>
      <p className="mt-4 text-xs text-center text-gray-500 sm:text-sm">
        Created at {data?.createdAt ? new Date(data?.createdAt).toLocaleString() : 'N/A'} <br /> 
        Updated at {data?.updatedAt ? new Date(data?.updatedAt).toLocaleString() : 'N/A'}
      </p>
    </Card>
  );
}
