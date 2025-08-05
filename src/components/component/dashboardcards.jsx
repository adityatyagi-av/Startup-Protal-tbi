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
    <div className="grid w-full grid-cols-1 gap-4 px-2 py-2 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:px-4 md:px-6 sm:py-4">
      {requestCards.map((card, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-between h-48 p-4 transition-shadow duration-300 bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg sm:p-6 sm:h-56 md:h-60 lg:h-64"
          onClick={() => card.route !== "#" && router.push(card.route)}
        >
          <div>
            <h2 className="text-lg font-semibold text-blue-900 break-words sm:text-xl md:text-2xl">{card.title}</h2>
            <p className="mt-2 text-sm text-gray-500 break-words sm:text-base">{card.description}</p>
          </div>
          <button
            className="absolute p-3 transition bg-gray-100 rounded-full shadow-md bottom-4 right-4 hover:bg-gray-200 sm:bottom-6 sm:right-6 sm:p-4"
            tabIndex={-1}
            aria-label={`Go to ${card.title}`}
          >
            <FaArrowRight className="text-base text-blue-900 sm:text-lg" />
          </button>
        </div>
      ))}
    </div>
  );
}
