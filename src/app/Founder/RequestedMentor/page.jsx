'use client';

export default function RequestedMentors({ mentors }) {
    const getStatusClass = (status) => ({
      approved: "text-green-600",
      pending: "text-yellow-600",
      rejected: "text-red-600",
    }[status] || "text-gray-600");
  
    // Extract mentor IDs from the mentors array
    const mentorIds = mentors?.map(({ mentorId }) => mentorId);
  
    return (
      <div className="overflow-auto" onClick={() => { console.log(mentors); }}>
        <table className="w-full bg-white border-collapse shadow-sm">
          <thead>
            <tr className="text-blue-900 bg-blue-100">
              <th className="p-4 text-left">Sr No</th>
             
              <th className="p-4 text-left">Mentor ID</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {mentors && mentors?.length > 0 ? (
              mentors?.map(({ mentorName, mentorId, date, status }, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{mentorId || "N/A"}</td>
                  <td className="p-4">{date ? new Date(date).toLocaleDateString() : "N/A"}</td>
                  <td className={`p-4 font-medium ${getStatusClass(status)}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="p-4 mt-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Mentor IDs</h3>
          <p>{mentorIds?.join(", ")}</p>
        </div>
      </div>
    );
}
  