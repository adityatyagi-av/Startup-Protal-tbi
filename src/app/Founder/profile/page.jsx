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
    <Card className="w-full max-w-3xl p-6 mx-auto mt-10 border rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6">
        <div className="flex flex-col items-center w-1/3">
          <div className="relative w-24 h-24 mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="object-cover w-full h-full border-4 border-blue-700 rounded-full"
            />
            <label htmlFor="imageUpload" className="absolute bottom-0 right-0 cursor-pointer">
              <Camera className="w-8 h-8 p-1 text-gray-700 bg-white rounded-full" />
            </label>
            <input id="imageUpload" type="file" className="hidden" accept="image/*" />
          </div>
        </div>
        <div className="grid w-2/3 grid-cols-2 gap-4">
          <div>
            <Label>First name</Label>
            <Input defaultValue="Adarsh" />
          </div>
          <div>
            <Label>Last name</Label>
            <Input defaultValue="Sharma" />
          </div>
          <div>
            <Label>Mentor name</Label>
            <Input defaultValue="Abhishek Sharma" />
          </div>
          <div className="relative">
            <Label>DOB</Label>
            <Input type="date" placeholder="dd/mm/yyyy" />
            <Calendar className="absolute w-5 h-5 text-gray-400 right-3 top-9" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input placeholder="XXXXXXXXXX" />
          </div>
          <div>
            <Label>Email</Label>
            <Input placeholder="XXXXXXXXXX" />
          </div>
          <div>
            <Label>Country</Label>
            <Input placeholder="Enter" />
          </div>
          <div>
            <Label>City</Label>
            <Input placeholder="Enter" />
          </div>
          <div>
            <Label>Total funding received</Label>
            <Input defaultValue="₹ 3000000" />
          </div>
          <div>
            <Label>Total Startup members</Label>
            <Input defaultValue="23" />
          </div>
          <div>
            <Label>Startup status</Label>
            <Input defaultValue="Small scale" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter" />
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
