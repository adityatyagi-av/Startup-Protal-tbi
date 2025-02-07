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
    <div className="flex h-screen max-w-6xl bg-gray-100 shadow-2xl">
      <div className="w-full h-screen p-10 bg-white rounded-lg shadow-lg">
        <h1 className="mb-2 text-3xl font-semibold text-gray-800">Request Funding</h1>
        <p className="mb-6 text-gray-500">Request funding for your company</p>

        <form onSubmit={handleSubmit}>
          <div className="w-full h-full mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Enter the amount and reason for the required funding
            </label>
            <input
              type="text"
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              State the reason for funding
            </label>
            <textarea
              className="w-full h-56 p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Explain the reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 text-lg font-medium text-white transition bg-blue-900 rounded-lg hover:bg-blue-800"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}
