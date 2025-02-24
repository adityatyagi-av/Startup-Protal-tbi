"use client";

import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const requestCards = [
  { title: "Request Facilities", description: "Request Facilities for your work and need", route: "/Founder/RequestFacilities" },
  { title: "Funding request", description: "Request funding for your startup need", route: "/Founder/RequestFunding" },
  { title: "Upload DOC", description: "Upload any pending or requested document from TBI", route: "/Founder/RequestDoc" },
  { title: "Request Mentoring", description: "Request 1 : 1 mentoring session for your problems", route: "/Founder/RequestMentoring" },
  { title: "Requested History", description: "Checkout all the status of requested issues", route: "/Founder/RequestedItems" },
];

export default function RequestCards() {
  const router = useRouter();

  return (
    <div className="grid w-full grid-cols-1 gap-6 px-6 py-2 mx-auto max-w-9xl sm:grid-cols-2 md:grid-cols-3">
      {requestCards.map((card, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-between p-6 transition-shadow duration-300 bg-white shadow-md cursor-pointer h-60"
          onClick={() => card.route !== "#" && router.push(card.route)}
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
