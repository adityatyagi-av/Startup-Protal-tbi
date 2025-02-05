"use client";

import { FaArrowRight } from "react-icons/fa";

const requestCards = [
  { title: "Request Facilities", description: "Request Facilities for your work and need" },
  { title: "Funding request", description: "Request funding for your startup need" },
  { title: "Upload DOC", description: "Upload any pending or requested document from TBI" },
  { title: "Request Mentoring", description: "Request 1 : 1 mentoring session for your problems" },
  { title: "Requested History", description: "Checkout all the status of requested issues" },
];

export default function RequestCards() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {requestCards.map((card, index) => (
        <div
          key={index}
          className="flex flex-col justify-between h-40 p-6 transition-shadow duration-300 bg-white shadow-lg rounded-2xl w-72 hover:shadow-xl"
        >
          <div>
            <h2 className="text-xl font-semibold text-blue-900">{card.title}</h2>
            <p className="mt-2 text-sm text-gray-500">{card.description}</p>
          </div>
          <div className="self-end">
            <button className="p-3 transition bg-gray-100 rounded-full shadow-md hover:bg-gray-200">
              <FaArrowRight className="text-blue-900" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}