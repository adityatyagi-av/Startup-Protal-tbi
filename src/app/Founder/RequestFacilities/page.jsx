'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResourceDetails } from "@/store/Action/getresourceAction";
import { requestOfficeSpace } from "@/store/Action/Request_Office_Space_Action";
import RequestFacilities from "./requestFacilityDialog";
import RequestedDocs from "../RequestedDoc/page";
import Spinner from "@/components/component/spinner";

export default function FacilitiesRequest() {
  const dispatch = useDispatch();
  const { data: facilities, loading, error } = useSelector(state => state.resource);
  const { loading: reqResLoading } = useSelector((state) => state.requestResource);
  const { officeSpaceData = [] } = useSelector((state) => state.requestOfficeSpace || {});
  
  const [isOfficeSpaceRequested, setIsOfficeSpaceRequested] = useState(false);
  
  useEffect(() => {
    dispatch(getResourceDetails());
  }, [dispatch]);

  useEffect(() => {
    if (officeSpaceData?.status === "requested" || officeSpaceData?.status === "approved") {
      setIsOfficeSpaceRequested(true);
    } else {
      setIsOfficeSpaceRequested(false);
    }
  }, [officeSpaceData]);

  const handleRequestOfficeSpace = () => {
    dispatch(requestOfficeSpace({ date: new Date().toISOString() }));
  };

  const officeSpaceArray = Array.isArray(officeSpaceData) ? officeSpaceData : [officeSpaceData];

  return (
    <div className="w-full min-h-screen p-8 mx-auto max-w-7xl bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Request Facilities</h1>
        <button 
          className={`px-4 py-2 rounded-md transition-colors duration-300 ${isOfficeSpaceRequested ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`} 
          onClick={handleRequestOfficeSpace}
          disabled={isOfficeSpaceRequested}
        >
          Request Office Space
        </button>
      </div>
      
      {(loading || reqResLoading) && <Spinner />}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {facilities?.length > 0 ? (
          facilities.map((facility, index) => (
            <div key={index} className="flex justify-between p-5 bg-white border rounded-lg shadow-md">
              <div>
                <p className="text-sm text-gray-500">Facilities name</p>
                <h2 className="text-xl font-semibold text-gray-800">{facility?.resourceName}</h2>
              </div>

              {facility.availability == "available" ? <RequestFacilities id={facility.id} /> : (
                <>
                  <p className="px-6 py-2 text-white bg-red-400 rounded-md h-fit">
                    Not available
                  </p>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No facilities available.</p>
        )}
      </div>

      
    </div>
  );
}
