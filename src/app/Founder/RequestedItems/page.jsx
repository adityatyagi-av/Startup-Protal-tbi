"use client";
import { useState } from "react";

export default function RequestTable() {
  const [activeTab, setActiveTab] = useState("Requested Item");

  const documents = Array(12).fill({
    name: "Chair",
    date: "09/04/2024",
    status: Math.random() > 0.5 ? "Accepted" : "Rejected",
  });

  return (
    <div className="flex items-center justify-center w-full h-screen p-6 bg-gray-100">
      <div className="w-[90vw] h-[85vh] bg-white shadow-lg rounded-lg p-6 flex flex-col">
        
        {/* Tabs Navigation */}
        <div className="flex mb-4 space-x-8 border-b">
          {["Requested Item", "Requested Doc", "Requested Mentors"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 text-lg font-bold ${
                activeTab === tab ? "border-b-2 border-black text-black" : "text-black"
              } transition duration-200`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="flex-grow w-full overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="p-4">Sr no</th>
                <th className="p-4">Requested Item</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{doc.name}</td>
                  <td className="p-4">{doc.date}</td>
                  <td
                    className={`p-4 font-medium ${
                      doc.status === "Accepted" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {doc.status}
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
