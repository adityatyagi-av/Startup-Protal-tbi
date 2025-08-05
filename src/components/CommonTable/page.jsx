"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const CommonTable = ({
  columns = [],
  data = [],
  onDelete = null,
  onCustomAction = null,
  customActionLabel = "Action",
  customActionDisableCheck = () => false,
  customActionLoadingCheck = () => false,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-[600px] w-full border-collapse text-xs sm:text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-2 text-left sm:p-3">
                {col.header}
              </th>
            ))}
            {(onDelete || onCustomAction) && <th className="p-2 text-left sm:p-3">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id || index} className="border-b hover:bg-gray-50">
                {columns.map((col, i) => (
                  <td key={i} className="p-2 sm:p-3">
                    {col.render ? col.render(item[col.accessor], item) : item[col.accessor]}
                  </td>
                ))}
                {(onDelete || onCustomAction) && (
                  <td className="flex items-center gap-2 p-2 sm:p-3">
                    {onDelete && (
                      <Button
                        onClick={() => onDelete(item.id)}
                        className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    )}
                    {onCustomAction && (
                      <Button
                        onClick={() => onCustomAction(item.id)}
                        disabled={customActionDisableCheck(item)}
                        className={`px-2 py-1 text-xs text-white rounded transition-all duration-300 ${
                          customActionLoadingCheck(item)
                            ? "bg-gray-500 cursor-not-allowed"
                            : customActionDisableCheck(item)
                            ? "bg-green-500"
                            : "bg-blue-900 hover:bg-blue-700"
                        }`}
                      >
                        {customActionLoadingCheck(item)
                          ? "Requesting..."
                          : customActionDisableCheck(item)
                          ? "Requested"
                          : customActionLabel}
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="p-4 text-center text-gray-500">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;