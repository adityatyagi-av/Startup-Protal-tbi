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
    <div className="flex items-center justify-center w-full h-full p-6 bg-gray-100">
      <div className="w-[85vw] h-[80vh] bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800">Requested DOC from the TBI</h1>
        <p className="mb-4 text-gray-500 text-md">Submit the Documents Requested by TBI</p>

       
        {loading && <p className="text-blue-500">Loading documents...</p>}

        
        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full overflow-auto max-h-[70%] flex-grow">
          <table className="w-full text-left border-collapse">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="p-3">Sr no</th>
                <th className="p-3">Requested DOC</th>
                <th className="p-3">Date</th>
                <th className="p-3">Uploaded doc</th>
                <th className="flex justify-center p-3">Upload</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{doc.name}</td>
                    <td className="p-3">{doc.date}</td>
                    <td className="p-3">{doc.uploaded || "Not uploaded yet"}</td>
                    <td className="flex justify-center p-3">
                      <DocsubmitModal  id={doc.id}/>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
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



