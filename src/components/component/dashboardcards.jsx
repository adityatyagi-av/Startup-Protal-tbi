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
    <div className="grid w-full grid-cols-1 gap-6 px-6 py-2 mx-auto max-w-9xl sm:grid-cols-2 md:grid-cols-3">
      {requestCards.map((card, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-between p-6 transition-shadow duration-300 bg-white shadow-md h-60"
        >
          <div>
            <h2 className="text-2xl font-semibold text-blue-900">{card.title}</h2>
            <p className="mt-2 text-base text-gray-500">{card.description}</p>
          </div>
          <button className="absolute p-4 transition bg-gray-100 rounded-full shadow-md bottom-6 right-6 hover:bg-gray-200">
            <FaArrowRight className="text-lg text-blue-900" />
          </button>
        </div>
      ))}
    </div>
  );
}