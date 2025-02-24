'use client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequests } from "@/store/Action/Fetch_All_request_Action"; 
import { fetchAllMentorshipRequests } from "@/store/Action/Fetch_All_Mentorship_Request"; 
import { requestOfficeSpace } from "@/store/Action/Request_Office_Space_Action";
import RequestedItems from "../RequestedItems1/page";
import RequestedMentors from "../RequestedMentor/page";
import RequestedDocs from "../RequestedDoc/page";


export default function RequestTable() {
  const [activeTab, setActiveTab] = useState("Requested Item");
  const dispatch = useDispatch();

  
  const { requests = [], loading: requestsLoading, error: requestsError } = useSelector((state) => state.requestData || {});
  const { mentors = [], loading: mentorshipLoading, error: mentorshipError } = useSelector((state) => state.mentorshipRequests);
  const { officeSpaceData, loading: officespaceloading, error: officespaceError } = useSelector((state) => state.requestOfficeSpace);

  useEffect(() => {
    dispatch(fetchAllRequests()); 
    dispatch(fetchAllMentorshipRequests()); 
    dispatch(requestOfficeSpace({ date: new Date().toISOString() }));
  }, [dispatch]);


  const officeSpaceArray = Array.isArray(officeSpaceData) ? officeSpaceData : [officeSpaceData];

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
    
        <div className="flex justify-center mb-6">
          {["Requested Item", "Requested Doc", "Requested Mentors"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 mx-2 text-lg font-bold border-b-4 transition-all duration-300 ${
                activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading & Error Handling */}
        {(requestsLoading || mentorshipLoading || officespaceloading) ? (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : (requestsError || mentorshipError || officespaceError) ? (
          <p className="font-medium text-center text-red-500">Error: {requestsError || mentorshipError || officespaceError}</p>
        ) : (
          <>
            {activeTab === "Requested Item" && <RequestedItems items={requests} />}
            {activeTab === "Requested Doc" && <RequestedDocs docs={officeSpaceArray} />}
            {activeTab === "Requested Mentors" && <RequestedMentors mentors={mentors} />}
          </>
        )}
      </div>
    </div>
  );
}

