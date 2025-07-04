"use client";

const RequestedItems = ({ items = [] }) => (
  <div className="w-full overflow-hidden">
    {/* Desktop Table View */}
    <div className="hidden md:block">
      <table className="w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 font-semibold text-left text-gray-700 border-b">Item Name</th>
            <th className="px-4 py-3 font-semibold text-left text-gray-700 border-b">Date</th>
            <th className="px-4 py-3 font-semibold text-left text-gray-700 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(items) &&
            items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{item.name}</td>
                <td className="px-4 py-3 border-b">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "approved"
                        ? ""
                        : item.status === "rejected"
                        ? ""
                        : ""
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Card View */}
    <div className="space-y-3 md:hidden">
      {Array.isArray(items) &&
        items.map((item, index) => (
          <div key={index} className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : item.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
    </div>
  </div>
);

export default RequestedItems;
