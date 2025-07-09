'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMentors, requestMentor } from '../../../store/Action/FetchAllMentorsAction';

export default function MentoringRequests() {
  const dispatch = useDispatch();
  const { mentors, loading, error } = useSelector(state => state.fetchAllMentors);
  const [requesting, setRequesting] = useState({});
  const [requestedMentors, setRequestedMentors] = useState({});

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  const handleRequest = async (mentorId) => {
    setRequesting(prev => ({ ...prev, [mentorId]: true }));
    const response = await dispatch(requestMentor(mentorId));
    if (response?.success) {
      setRequestedMentors(prev => ({ ...prev, [mentorId]: true }));
    }
    setRequesting(prev => ({ ...prev, [mentorId]: false }));
  };

  return (
    <div className="container max-w-6xl p-2 mx-auto mt-2 bg-white rounded-lg shadow-2xl md:mt-6 md:p-6">
      <h1 className="px-2 py-2 mb-2 text-lg font-semibold text-gray-800 md:px-6 md:text-2xl">
        Request Mentoring
      </h1>
      <div className="w-full px-2 overflow-x-auto sm:px-4 md:px-12 lg:px-24">
        {loading ? (
          <p className="text-base font-semibold text-center text-gray-700 md:text-lg">Loading mentors...</p>
        ) : error ? (
          <p className="text-base font-semibold text-center text-red-600 md:text-lg">{error}</p>
        ) : (
          <table className="w-full min-w-[800px] border border-collapse border-gray-300 text-xs md:text-sm">
            <thead>
              <tr className="text-gray-700 bg-gray-100">
                <th className="p-2 border md:p-3">Sr no</th>
                <th className="p-2 border md:p-3">Mentor Name</th>
                <th className="p-2 border md:p-3">Position</th>
                <th className="p-2 border md:p-3">Request Mentor</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor, index) => (
                <tr key={mentor.id} className="text-center border-b">
                  <td className="p-2 border md:p-3">{index + 1}</td>
                  <td className="p-2 border md:p-3">{mentor?.name || "Unknown"}</td>
                  <td className="p-2 border md:p-3">{mentor?.role || "Not specified"}</td>
                  <td className="p-2 border md:p-3">
                    <button
                      className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-base text-white rounded-lg transition-all duration-300 ${
                        requesting[mentor.id]
                          ? 'bg-gray-500 cursor-not-allowed'
                          : requestedMentors[mentor.id] || mentor?.status === 'Requested'
                          ? 'bg-green-500'
                          : 'bg-blue-900 hover:bg-blue-700'
                      }`}
                      onClick={() => handleRequest(mentor.id)}
                      disabled={requesting[mentor.id] || requestedMentors[mentor.id] || mentor?.status === 'Requested'}
                    >
                      {requesting[mentor.id] ? 'Requesting...' : requestedMentors[mentor.id] || mentor?.status === 'Requested' ? 'Requested' : 'Request'}
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
