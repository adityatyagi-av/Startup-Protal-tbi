"use client";
import { useState } from "react";

export default function FundingRequest() {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Funding Request Submitted:", { amount, reason });
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="px-6 py-8 border-b border-gray-200 sm:px-8 lg:px-10">
            <h1 className="mb-2 text-lg font-semibold text-gray-800 sm:text-xl lg:text-2xl">
              Request Funding
            </h1>
            <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
              Request funding for your company
            </p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 lg:px-10">
            <form onSubmit={handleSubmit} className="w-full">
              {/* Amount Input */}
              <div className="mb-8">
                <label className="block mb-3 text-sm font-medium text-gray-700 sm:text-base lg:text-lg">
                  Enter the amount and reason for the required funding
                </label>
                <input
                  type="text"
                  className="w-full p-4 text-base transition-all border border-gray-300 rounded-lg sm:p-5 sm:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter amount (e.g., $50,000)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              {/* Reason Textarea */}
              <div className="mb-8">
                <label className="block mb-3 text-sm font-medium text-gray-700 sm:text-base lg:text-lg">
                  State the reason for funding
                </label>
                <textarea
                  className="w-full h-40 p-4 text-base transition-all border border-gray-300 rounded-lg resize-none sm:h-48 sm:p-5 sm:text-lg lg:h-56 lg:text-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Explain the reason for funding request in detail..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full py-3 text-sm font-medium text-white transition-all bg-blue-900 rounded-lg sm:py-4 sm:text-base lg:text-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 active:bg-blue-950"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}