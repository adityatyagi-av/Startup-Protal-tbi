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
    <Card className="w-11/12 p-5 mx-auto mt-10 border rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-12">
        <div className="flex flex-col items-center w-1/4">
          <div className="relative w-32 h-32 mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="object-cover w-full h-full border-4 border-blue-700 rounded-full"
            />
            <label htmlFor="imageUpload" className="absolute bottom-0 right-0 cursor-pointer">
              <Camera className="w-10 h-10 p-1 text-gray-700 bg-white rounded-full" />
            </label>
            <input id="imageUpload" type="file" className="hidden" accept="image/*" />
          </div>
        </div>
        <div className="grid w-3/4 grid-cols-2 gap-6">
          <div className="w-3/4 col-span-1">
            <Label>Full Name</Label>
            <Input className="w-full" value={data?.name || ''} readOnly />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Username</Label>
            <Input className="w-full" value={data?.username || ''} readOnly />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Email</Label>
            <Input className="w-full" value={data?.email || ''} readOnly />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Phone</Label>
            <Input className="w-full" value={data?.phone || ''} readOnly />
          </div>
          <div className="relative w-3/4 col-span-1">
            <Label>DOB</Label>
            <Input className="w-full" type="date" value={data?.DOB?.split('T')[0] || ''} readOnly />
            <Calendar className="absolute w-6 h-6 text-gray-400 right-4 top-9" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Postal Address</Label>
            <Input className="w-full" value={data?.postalAddress || ''} readOnly />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Education</Label>
            <Input className="w-full" value={data?.education || ''} readOnly />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Experience</Label>
            <Input className="w-full" value={data?.experience || ''} readOnly />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Delete</Button>
        <Button className="bg-blue-900">Edit</Button>
      </CardFooter>
      <p className="mt-4 text-sm text-center text-gray-500">
        Created at {new Date(data?.createdAt).toLocaleString() || 'N/A'} <br /> 
        Updated at {new Date(data?.updatedAt).toLocaleString() || 'N/A'}
      </p>
    </Card>
  );
}
