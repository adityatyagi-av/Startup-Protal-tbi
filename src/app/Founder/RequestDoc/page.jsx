"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestedDocs } from "@/store/Action/Fetch_All_Doc_Action";
import DocsubmitModal from "@/components/component/docsubmit";

export default function DocumentRequest() {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector((state) => state.requestedDocs);
  
  useEffect(() => {
    dispatch(fetchRequestedDocs());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="px-4 py-6 border-b border-gray-200 sm:px-6 lg:px-8">
            <h1 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
              Requested DOC from the TBI
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Submit the Documents Requested by TBI
            </p>
          </div>

          {/* Content Section */}
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {/* Loading and Error States */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="text-sm text-blue-600 sm:text-base">
                  Loading documents...
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-4 mb-6 border border-red-200 rounded-md bg-red-50">
                <p className="text-sm text-red-700 sm:text-base">{error}</p>
              </div>
            )}

            {/* Table Section */}
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                        Sr no
                      </th>
                      <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                        Document Title
                      </th>
                      <th className="hidden px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell sm:px-6">
                        Description
                      </th>
                      <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                        Status
                      </th>
                      <th className="px-3 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase sm:px-6">
                        Upload
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.length > 0 ? (
                      documents.map((doc, index) => (
                        <tr key={index} className="transition-colors hover:bg-gray-50">
                          <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap sm:px-6">
                            {index + 1}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900 sm:px-6">
                            <div className="font-medium">{doc.docTitle}</div>
                            {/* Show description on mobile below title */}
                            <div className="mt-1 text-xs text-gray-500 md:hidden">
                              {doc.description}
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell sm:px-6">
                            {doc.description}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap sm:px-6">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              doc.status === "requested" 
                                ? "bg-white text-yellow-800" 
                                : "bg-green-100 text-green-800"
                            }`}>
                              {doc.status === "requested" ? "Pending" : "Uploaded"}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-center whitespace-nowrap sm:px-6">
                            <DocsubmitModal id={doc.id} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      !loading && (
                        <tr>
                          <td colSpan="5" className="px-3 py-12 text-sm text-center text-gray-500 sm:px-6">
                            <div className="flex flex-col items-center">
                              <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <p className="text-base text-gray-500">No documents found.</p>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}