'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResourceDetails } from "@/store/Action/getresourceAction";
import { requestOfficeSpace } from "@/store/Action/Request_Office_Space_Action";
import RequestFacilities from "./requestFacilityDialog";
import Spinner from "@/components/component/spinner";

export default function FacilitiesRequest() {
  const dispatch = useDispatch();
  const { data: facilities, loading, error } = useSelector(state => state.resource);
  const { loading: reqResLoading } = useSelector((state) => state.requestResource);
  const { officeSpaceData = [] } = useSelector((state) => state.requestOfficeSpace || {});

  const [isOfficeSpaceRequested, setIsOfficeSpaceRequested] = useState(false);

  useEffect(() => {
    dispatch(getResourceDetails());

    const storedRequestStatus = localStorage.getItem("officeSpaceRequested");
    if (storedRequestStatus === "true") {
      setIsOfficeSpaceRequested(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (officeSpaceData?.status === "requested" || officeSpaceData?.status === "approved") {
      setIsOfficeSpaceRequested(true);
      localStorage.setItem("officeSpaceRequested", "true");
    }
  }, [officeSpaceData]);

  const handleRequestOfficeSpace = () => {
    dispatch(requestOfficeSpace({ date: new Date().toISOString() }));
    setIsOfficeSpaceRequested(true);
    localStorage.setItem("officeSpaceRequested", "true");
  };

  const officeSpaceArray = Array.isArray(officeSpaceData) ? officeSpaceData : [officeSpaceData];

  return (
    <div className="w-full min-h-screen px-4 py-8 mx-auto max-w-7xl bg-gray-50 sm:px-6 md:px-8">
      <div className="flex flex-col items-center justify-between gap-4 mb-6 sm:flex-row">
        <h1 className="text-2xl font-semibold text-gray-800 sm:text-3xl">Request Facilities</h1>
        <button
          className={`w-full sm:w-auto px-5 py-2 rounded-md transition-colors duration-300 text-white ${
            isOfficeSpaceRequested
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleRequestOfficeSpace}
          disabled={isOfficeSpaceRequested}
        >
          Request Office Space
        </button>
      </div>

      {(loading || reqResLoading) && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {error && <p className="mb-4 text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {facilities?.length > 0 ? (
          facilities.map((facility, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-between p-5 bg-white border rounded-lg shadow-md sm:flex-row sm:items-center"
            >
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-500">Facility Name</p>
                <h2 className="text-xl font-semibold text-gray-800">{facility?.resourceName}</h2>
              </div>

              {facility.availability === "available" ? (
                <RequestFacilities id={facility.id} />
              ) : (
                <p className="px-6 py-2 text-white bg-red-400 rounded-md whitespace-nowrap">
                  Not available
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No facilities available.</p>
        )}
      </div>
    </div>
  );
}
