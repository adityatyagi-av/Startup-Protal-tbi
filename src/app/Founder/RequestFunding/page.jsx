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
    <div className="flex items-center justify-center w-full min-h-screen px-2 py-4 bg-gray-100">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg sm:p-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-800 sm:text-3xl">
          Request Funding
        </h1>
        <p className="mb-6 text-sm text-gray-500 sm:text-base">
          Request funding for your company
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 sm:text-base">
              Enter the amount and reason for the required funding
            </label>
            <input
              type="text"
              className="w-full p-3 text-base border border-gray-300 rounded-lg sm:p-4 sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 sm:text-base">
              State the reason for funding
            </label>
            <textarea
              className="w-full h-32 p-3 text-base border border-gray-300 rounded-lg resize-none sm:h-56 sm:p-4 sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Explain the reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-base font-medium text-white transition bg-blue-900 rounded-lg sm:py-4 sm:text-lg hover:bg-blue-800"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}
