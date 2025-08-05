'use client'
export default function RequestTabs({ activeTab, setActiveTab }) {
    const tabs = [
      { id: "Requested Item", label: "Requested Item", shortLabel: "Items" },
      { id: "Requested Office Space", label: "Requested Office Space", shortLabel: "Office" },
      { id: "Requested Mentors", label: "Requested Mentors", shortLabel: "Mentors" },
    ];
  
    return (
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Desktop Tabs */}
          <div className="hidden space-x-8 overflow-x-auto sm:flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
  
          {/* Mobile Tabs */}
          <div className="sm:hidden">
            <select
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.shortLabel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
  