"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResourceDetails } from "@/store/Action/getresourceAction";
import RequestFacilities from "./requestFacilityDialog";
import Spinner from "@/components/component/spinner";

export default function FacilitiesRequest() {
  const dispatch = useDispatch();
  const { data: facilities, loading, error } = useSelector(state => state.resource);
  const { loading: reqResLoading } = useSelector((state) => state.requestResource)

  useEffect(() => {
    dispatch(getResourceDetails());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen p-8 mx-auto max-w-7xl bg-gray-50">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Request Facilities</h1>

      {(loading || reqResLoading) && <Spinner />}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {facilities?.length > 0 ? (
          facilities.map((facility, index) => (
            <div key={index} className="p-5 flex  justify-between bg-white border rounded-lg shadow-md">
              <div>
                <p className="text-sm text-gray-500">Facilities name</p>
                <h2 className="text-xl font-semibold text-gray-800">{facility?.resourceName}</h2>
              </div>



              {facility.availability == "available" ? <RequestFacilities id={facility.id} /> : (
                <>
                  <p className=" bg-red-400 h-fit px-6 py-2 rounded-md text-white">
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
