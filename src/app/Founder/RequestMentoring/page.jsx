'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMentors, requestMentor } from '../../../store/Action/FetchAllMentorsAction';

export default function MentoringRequests() {
  const dispatch = useDispatch();
  const { mentors, loading, error } = useSelector(state => state.fetchAllMentors);
  const [requesting, setRequesting] = useState({}); // Track which mentor is being requested
  const [requestedMentors, setRequestedMentors] = useState({}); // Track already requested mentors

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  const handleRequest = async (mentorId, index) => {
    setRequesting(prev => ({ ...prev, [mentorId]: true })); 

    const response = await dispatch(requestMentor(mentorId)); 
    if (response?.success) {
      setRequestedMentors(prev => ({ ...prev, [mentorId]: true })); 
    }

    setRequesting(prev => ({ ...prev, [mentorId]: false })); 
  };

  return (
    <div className="container max-w-6xl mx-auto mt-1 bg-white rounded-lg shadow-2xl">
      <h1 className="px-6 py-2 mb-2 text-2xl font-semibold text-gray-800">
        Request Mentoring
      </h1>

      <div className="px-24 overflow-x-auto">
        {loading ? (
          <p className="text-lg font-semibold text-center text-gray-700">Loading mentors...</p>
        ) : error ? (
          <p className="text-lg font-semibold text-center text-red-600">{error}</p>
        ) : (
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
              {mentors.map((mentor, index) => (
                <tr key={mentor.id} className="text-center border-b">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{mentor.name}</td>
                  <td className="p-3 border">{mentor.date}</td>
                  <td className="p-3 border">{mentor.position}</td>
                  <td className="p-3 border">
                    <button
                      className={`px-4 py-2 text-white rounded-lg ${
                        requesting[mentor.id]
                          ? 'bg-gray-500 cursor-not-allowed' 
                          : requestedMentors[mentor.id] || mentor.status === 'Requested'
                          ? 'bg-green-500' 
                          : 'bg-blue-900 hover:bg-blue-700' 
                      }`}
                      onClick={() => handleRequest(mentor.id, index)}
                      disabled={requesting[mentor.id] || requestedMentors[mentor.id] || mentor.status === 'Requested'}
                    >
                      {requesting[mentor.id] ? 'Requesting...' : requestedMentors[mentor.id] || mentor.status === 'Requested' ? 'Requested' : 'Request'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


