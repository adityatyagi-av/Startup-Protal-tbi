"use client";
import { useState } from "react";

export default function DocumentRequest() {
  const documents = Array(10).fill({
    name: "Chair",
    date: "09/04/2024",
    uploaded: "dggg.pdf",
  });

  return (
    <div className="flex items-center justify-center w-full h-full p-6 bg-gray-100">
      <div className="w-[85vw] h-[80vh] bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Requested DOC from the TBI</h1>
        <p className="mb-4 text-gray-500 text-md">Submit the Documents Requested by TBI</p>

        <div className="w-full overflow-auto max-h-[70%]">
          <table className="w-full text-left border-collapse">
            <thead className="text-gray-700 bg-gray-200">
              <tr>
                <th className="p-3">Sr no</th>
                <th className="p-3">Requested DOC</th>
                <th className="p-3">Date</th>
                <th className="p-3">Uploaded doc</th>
                <th className="p-3">Upload</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{doc.name}</td>
                  <td className="p-3">{doc.date}</td>
                  <td className="p-3">{doc.uploaded}</td>
                  <td className="p-3">
                    <button className="py-2 text-sm text-white bg-blue-900 rounded-md w-28 hover:bg-blue-800">
                      Upload Doc
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
