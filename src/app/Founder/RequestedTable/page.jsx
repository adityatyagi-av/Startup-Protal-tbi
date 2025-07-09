'use client'
import { useState, useEffect } from "react";
import RequestedItems from "../RequestedItems/page";
import RequestedMentors from "../RequestedMentors/page";
import RequestedDocs from "../RequestedDocs/page";
import RequestTabs from "../RequestTabs/page";


const mockRequests = [
  { resource: { resourceName: "Laptop Dell XPS 13" }, createdAt: "2024-01-15", status: "pending" },
  { resource: { resourceName: "Office Chair" }, createdAt: "2024-01-14", status: "approved" },
  { resource: { resourceName: "Monitor 24 inch" }, createdAt: "2024-01-13", status: "rejected" },
];

const mockMentors = [
  { mentorId: "M001", createdAt: "2024-01-15", status: "pending" },
  { mentorId: "M002", createdAt: "2024-01-14", status: "approved" },
  { mentorId: "M003", createdAt: "2024-01-13", status: "pending" },
];

const mockOfficeSpace = [
  { resource: { resourceName: "Conference Room A" }, createdAt: "2024-01-15", status: "pending" },
  { resource: { resourceName: "Hot Desk 12" }, createdAt: "2024-01-14", status: "approved" },
];

export default function RequestTable() {
  const [activeTab, setActiveTab] = useState("Requested Item");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requests = mockRequests;
  const mentors = mockMentors;
  const officeSpaceData = mockOfficeSpace;

  const officeSpaceArray = Array.isArray(officeSpaceData) ? officeSpaceData : [officeSpaceData];
  const mentorIds = mentors.map((mentor) => mentor.mentorId);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="w-full min-h-screen px-2 py-4 bg-white sm:px-4 lg:px-6">
      <div className="w-full mx-auto max-w-7xl">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          
          <div className="px-4 py-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
              Request Management
            </h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Manage all your requests in one place
            </p>
          </div>

          
          <RequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                  <p className="mt-4 text-sm text-gray-600">Loading requests...</p>
                </div>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <div className="mb-2 text-lg font-medium text-red-500">Error occurred</div>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : (
              <div className="w-full">
                
                {activeTab === "Requested Item" && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Requested Items</h2>
                      <div className="text-sm text-gray-500">
                        {
                          Array.isArray(requests)
                            ? requests.filter((req) => req.resource?.resourceName).length
                            : 0
                        }{" "}
                        items
                      </div>
                    </div>
                    <RequestedItems
                      items={
                        Array.isArray(requests)
                          ? requests
                              .filter((req) => req.resource?.resourceName)
                              .map((req) => ({
                                name: req.resource.resourceName,
                                createdAt: req.createdAt,
                                status: req.status,
                              }))
                          : []
                      }
                    />
                  </div>
                )}

              
                {activeTab === "Requested Office Space" && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Office Space Requests</h2>
                      <div className="text-sm text-gray-500">{officeSpaceArray.length} spaces</div>
                    </div>
                    <RequestedDocs
                      items={officeSpaceArray.map((doc) => ({
                        name: doc?.resource?.resourceName || "Unknown",
                        createdAt: doc?.createdAt || "No date available",
                        status: doc?.status || "pending",
                      }))}
                    />
                  </div>
                )}

                
                {activeTab === "Requested Mentors" && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Mentorship Requests</h2>
                      <div className="text-sm text-gray-500">{mentors.length} mentors</div>
                    </div>

                    <RequestedMentors
                      mentors={mentors.map((mentor) => ({
                        mentorId: mentor.mentorId,
                        date: mentor.createdAt,
                        status: mentor.status,
                      }))}
                    />

                   
                    <div className="p-4 mt-6 rounded-lg bg-gray-50">
                      <h3 className="mb-2 text-base font-semibold text-gray-900">Mentor IDs Summary</h3>
                      <div className="flex flex-wrap gap-2">
                        {mentorIds.map((id, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {id}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
