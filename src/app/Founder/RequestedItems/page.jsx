'use client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequests } from "@/store/Action/Fetch_All_request_Action"; 
import { fetchAllMentorshipRequests } from "@/store/Action/Fetch_All_Mentorship_Request"; 
import { requestOfficeSpace } from "@/store/Action/Request_Office_Space_Action";

export default function RequestTable() {
  const [activeTab, setActiveTab] = useState("Requested Item");
  const [officeSpaceRequested, setOfficeSpaceRequested] = useState(false);
  const dispatch = useDispatch();

  // ✅ Ensure default values to avoid undefined errors
  const { requests = [], loading, error } = useSelector((state) => state.requestData || {});
  const { mentorshipRequests = [], mentorshipLoading, mentorshipError } = useSelector((state) => state.fetchAllMentorshipRequests || {});

  // 🛠 Debugging: Check fetched data
  console.log("Active Tab:", activeTab);
  console.log("Requests Data:", requests);
  console.log("Mentorship Requests Data:", mentorshipRequests);
  console.log("Loading Status:", loading, mentorshipLoading);
  console.log("Error Status:", error, mentorshipError);

  useEffect(() => {
    if ((activeTab === "Requested Item" || activeTab === "Requested Doc") && requests.length === 0) {
      console.log("Fetching all requests...");
      dispatch(fetchAllRequests());
    }
    if (activeTab === "Requested Mentors" && mentorshipRequests.length === 0) {
      console.log("Fetching all mentorship requests...");
      dispatch(fetchAllMentorshipRequests());
    }
    if (activeTab === "Requested Doc" && !officeSpaceRequested) {
      console.log("Requesting office space...");
      dispatch(requestOfficeSpace({ date: new Date().toISOString() }));
      setOfficeSpaceRequested(true);
    }
  }, [activeTab, dispatch, officeSpaceRequested, requests.length, mentorshipRequests.length]);

  // ✅ Filter requests safely
  const filteredRequests = requests.filter((request) => {
    if (activeTab === "Requested Item") return request.type === "resource";
    if (activeTab === "Requested Doc") return request.type === "document";
    return false;
  });

  console.log("Filtered Requests:", filteredRequests);

  // ✅ Status color mapping
  const getStatusClass = (status) => {
    const statusMap = {
      approved: "text-green-600",
      pending: "text-yellow-600",
      rejected: "text-red-600",
    };
    return statusMap[status] || "text-gray-600";
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
        
        {/* Tabs */}
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
        {(loading || mentorshipLoading) ? (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : (error || mentorshipError) ? (
          <p className="font-medium text-center text-red-500">Error: {error || mentorshipError}</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full bg-white border-collapse shadow-sm">
              <thead>
                <tr className="text-blue-900 bg-blue-100">
                  <th className="p-4 text-left">Sr No</th>
                  <th className="p-4 text-left">{activeTab}</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === "Requested Item" || activeTab === "Requested Doc") && filteredRequests.length > 0 ? (
                  filteredRequests.map(({ requestedItem, date, status }, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{requestedItem || "N/A"}</td>
                      <td className="p-4">{date ? new Date(date).toLocaleDateString() : "N/A"}</td>
                      <td className={`p-4 font-medium ${getStatusClass(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </td>
                    </tr>
                  ))
                ) : activeTab === "Requested Mentors" && mentorshipRequests.length > 0 ? (
                  mentorshipRequests.map(({ mentorName, date, status }, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{mentorName || "N/A"}</td>
                      <td className="p-4">{date ? new Date(date).toLocaleDateString() : "N/A"}</td>
                      <td className={`p-4 font-medium ${getStatusClass(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

