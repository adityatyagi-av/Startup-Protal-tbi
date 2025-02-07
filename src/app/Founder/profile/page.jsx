'use client';
import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Camera } from 'lucide-react';

export default function Profile() {
  const [profileImage, setProfileImage] = useState('/photo.svg');
  
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
            <Label>First name</Label>
            <Input className="w-full" defaultValue="Adarsh" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Last name</Label>
            <Input className="w-full" defaultValue="Sharma" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Mentor name</Label>
            <Input className="w-full" defaultValue="Abhishek Sharma" />
          </div>
          <div className="relative w-3/4 col-span-1">
            <Label>DOB</Label>
            <Input className="w-full" type="date" placeholder="dd/mm/yyyy" />
            <Calendar className="absolute w-6 h-6 text-gray-400 right-4 top-9" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Phone</Label>
            <Input className="w-full" placeholder="XXXXXXXXXX" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Email</Label>
            <Input className="w-full" placeholder="XXXXXXXXXX" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Country</Label>
            <Input className="w-full" placeholder="Enter" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>City</Label>
            <Input className="w-full" placeholder="Enter" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Total funding received</Label>
            <Input className="w-full" defaultValue="₹ 3000000" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Total Startup members</Label>
            <Input className="w-full" defaultValue="23" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Startup status</Label>
            <Input className="w-full" defaultValue="Small scale" />
          </div>
          <div className="w-3/4 col-span-1">
            <Label>Password</Label>
            <Input className="w-full" type="password" placeholder="Enter" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Delete</Button>
        <Button className="bg-blue-900">Edit</Button>
      </CardFooter>
      <p className="mt-4 text-sm text-center text-gray-500">
        Created at 19 Nov, 2024 | 1:00 AM <br /> Updated at 20 Nov, 2024 | 11:00 AM
      </p>
    </Card>
  );
}
