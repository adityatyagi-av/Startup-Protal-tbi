import { FaDollarSign } from 'react-icons/fa'; // You can replace icons accordingly

export default function Stats({ logo, price, description, date, percentage }) {
  return (
    <div className="group flex h-[140px] w-full min-w-[220px] flex-col justify-between rounded-lg bg-white p-4 text-gray-600 shadow-md hover:bg-[#1E3A8A] hover:text-white">
      <div className="flex items-start justify-between">
        {/* Icon and Label */}
        <div className="flex items-center">
          <div className="rounded-lg bg-[#7152F30D] p-2 group-hover:bg-white">
            <img
              src={logo}
              alt="icon"
              className="h-6 w-6 group-hover:brightness-0 group-hover:filter"
            />
          </div>
          <span className="ml-3 truncate font-medium group-hover:text-white">
            {description}
          </span>
        </div>
      </div>

      {/* Price and Percentage - Aligned on the Same Row */}
      <div className="mt-3 flex items-center justify-between">
        {/* Price Amount */}
        <div className="text-2xl font-bold text-[#1b1b1b] group-hover:text-white">
          ${price}
        </div>

        {/* Percentage with Icon */}
        <div
          className={`flex items-center rounded-full p-2 px-3 ${percentage >= 0
            ? 'bg-green-100 text-green-600 group-hover:bg-white group-hover:text-[#1b1b1b}'
            : 'bg-red-100 text-red-600 group-hover:bg-white group-hover:text-[#1b1b1b}'
            }`}
        >
          {percentage >= 0 ? (
            <img
              src="/up.svg"
              className="h-4 w-4 text-green-500 group-hover:text-[#1b1b1b}"
            />
          ) : (
            <img
              src="/down.svg"
              className="h-4 w-4 text-red-500 group-hover:text-[#1b1b1b}"
            />
          )}
          <span className="ml-1 truncate text-sm group-hover:text-[#1b1b1b}">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Update Date */}
      <div className="mt-1 text-sm text-gray-400 group-hover:text-gray-200">
        Update: {date}
      </div>
    </div>
  );
}
