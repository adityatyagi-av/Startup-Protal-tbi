'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMentors, requestMentor } from '@/store/Action/FetchAllMentorsAction';
import CommonTable from '@/components/CommonTable/page';

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

  const columns = [
    { header: "Sr no", accessor: "index", render: (_, item, i) => i + 1 },
    { header: "Mentor Name", accessor: "name" },
    { header: "Position", accessor: "role" }
  ];

  return (
    <div className="container max-w-6xl p-2 mx-auto mt-2 bg-white rounded-lg shadow-2xl md:mt-6 md:p-6">
      <h1 className="px-2 py-2 mb-2 text-lg font-semibold text-gray-800 md:px-6 md:text-2xl">
        Request Mentoring
      </h1>
      {loading ? (
        <p className="text-center">Loading mentors...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <CommonTable
          columns={columns}
          data={mentors}
          onCustomAction={handleRequest}
          customActionLabel="Request"
          customActionDisableCheck={(item) =>
            requestedMentors[item.id] || item.status === 'Requested'
          }
          customActionLoadingCheck={(item) => requesting[item.id]}
        />
      )}
    </div>
  );
}
