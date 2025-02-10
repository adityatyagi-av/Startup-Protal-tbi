"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResourceDetails } from "@/store/Action/getresourceAction";

export default function FacilitiesRequest() {
  const dispatch = useDispatch();
  const { data: facilities, loading, error } = useSelector(state => state.resource);

  useEffect(() => {
    dispatch(getResourceDetails());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen p-8 mx-auto max-w-7xl bg-gray-50">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Request Facilities</h1>

      {loading && <p className="text-gray-600">Loading facilities...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {facilities?.length > 0 ? (
          facilities.map((facility, index) => (
            <div key={index} className="p-5 bg-white border rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Facilities name</p>
              <h2 className="text-xl font-semibold text-gray-800">{facility.name}</h2>

              <div className="flex justify-between pt-3 mt-3 text-sm text-gray-600 border-t">
                <p>Available item: <span className="font-semibold">{facility.available}</span></p>
                <p>Assigned item: <span className="font-semibold">{facility.assigned}</span></p>
                <p>Total item: <span className="font-semibold">{facility.total}</span></p>
              </div>

              <button className="w-full py-2 mt-4 text-white transition bg-blue-900 rounded-lg hover:bg-blue-800">
                Request
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No facilities available.</p>
        )}
      </div>
    </div>
  );
}
