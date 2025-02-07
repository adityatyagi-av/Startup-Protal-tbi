'use client';
import { useState } from 'react';

export default function MentoringRequests() {
  const mentors = Array(12).fill({
    name: 'Mr. Saurabh Sharma',
    date: '09/04/2024',
    position: 'Director',
    status: 'Request',
  });

  mentors[0].position = 'Head of TBI';
  mentors[10].status = 'Already Requested';
  mentors[11].status = 'Already Requested';

  const [requests, setRequests] = useState(mentors);

  const handleRequest = (index) => {
    setRequests((prev) =>
      prev.map((mentor, i) =>
        i === index ? { ...mentor, status: 'Already Requested' } : mentor
      )
    );
  };

  return (
    <div className="container max-w-6xl mx-auto mt-1 bg-white rounded-lg shadow-2xl">
      <h1 className="mb-2 text-2xl font-semibold text-gray-800 ">Request Mentoring</h1>
      <p className="mb-6 text-gray-500">Request for 1:1 mentoring session</p>

      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="text-gray-700 bg-gray-100">
              <th className="p-3 border">Sr no</th>
              <th className="p-3 border">Mentor Name</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Position</th>
              <th className="p-3 border">Request Mentor</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((mentor, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{mentor.name}</td>
                <td className="p-3 border">{mentor.date}</td>
                <td className="p-3 border">{mentor.position}</td>
                <td className="p-3 border">
                  {mentor.status === 'Request' ? (
                    <button
                      className="px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-700"
                      onClick={() => handleRequest(index)}
                    >
                      Request
                    </button>
                  ) : (
                    <span className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg">
                      Already Requested
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//shadow to some ui's 
//routing.
//dropazone.
//major changes. 
//---integration api.