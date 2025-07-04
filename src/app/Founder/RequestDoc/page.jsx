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
    <div className="flex items-center justify-center w-full min-h-screen px-2 py-4 bg-gray-100">
      <div className="flex flex-col w-full max-w-6xl p-2 bg-white rounded-lg shadow-lg sm:p-4 md:p-6">
        <h1 className="text-lg font-semibold text-gray-800 sm:text-xl md:text-2xl">
          Requested DOC from the TBI
        </h1>
        <p className="mb-4 text-sm text-gray-500 sm:text-base">
          Submit the Documents Requested by TBI
        </p>

        {loading && <p className="text-sm text-blue-500 sm:text-base">Loading documents...</p>}
        {error && <p className="text-sm text-red-500 sm:text-base">{error}</p>}

        <div className="flex-1 w-full overflow-x-auto">
          <table className="min-w-[600px] w-full text-left border-collapse">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="p-2 text-xs sm:p-3 sm:text-sm">Sr no</th>
                <th className="p-2 text-xs sm:p-3 sm:text-sm">Requested Document Title</th>
                <th className="p-2 text-xs sm:p-3 sm:text-sm">Description</th>
                <th className="p-2 text-xs sm:p-3 sm:text-sm">Status</th>
                <th className="p-2 text-xs text-center sm:p-3 sm:text-sm">Upload</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-xs sm:p-3 sm:text-sm">{index + 1}</td>
                    <td className="p-2 text-xs sm:p-3 sm:text-sm">{doc.docTitle}</td>
                    <td className="p-2 text-xs sm:p-3 sm:text-sm">{doc.description}</td>
                    <td className="p-2 text-xs sm:p-3 sm:text-sm">
                      {doc.status === "requested" ? "Not uploaded yet" : "Uploaded"}
                    </td>
                    <td className="flex justify-center p-2 sm:p-3">
                      <DocsubmitModal id={doc.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-2 text-xs text-center text-gray-500 sm:p-3 sm:text-sm">
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
