// "use client"

// const RequestedMentors = ({ mentors }) => (
//   <div className="w-full overflow-hidden">
  
//     <div className="hidden md:block">
//       <table className="w-full bg-white border-collapse">
//         <thead>
//           <tr className="bg-gray-50">
//             <th className="px-4 py-3 font-semibold text-left text-gray-700 border-b">Mentor ID</th>
//             <th className="px-4 py-3 font-semibold text-left text-gray-700 border-b">Date</th>
//             <th className="px-4 py-3 font-semibold text-left text-gray-700 border-b">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mentors.map((mentor, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               <td className="px-4 py-3 border-b">{mentor.mentorId}</td>
//               <td className="px-4 py-3 border-b">
//                 {new Date(mentor.date).toLocaleDateString()}
//               </td>
//               <td className="px-4 py-3 border-b">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     mentor.status === "approved"
//                       ? ""
//                       : mentor.status === "rejected"
//                       ? ""
//                       : ""
//                   }`}
//                 >
//                   {mentor.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

    
//     <div className="space-y-3 md:hidden">
//       {mentors.map((mentor, index) => (
//         <div key={index} className="p-4 bg-white border rounded-lg shadow-sm">
//           <div className="flex items-start justify-between mb-2">
//             <h3 className="text-sm font-semibold text-gray-900">
//               Mentor ID: {mentor.mentorId}
//             </h3>
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-medium ${
//                 mentor.status === "approved"
//                   ? "bg-green-100 text-green-800"
//                   : mentor.status === "rejected"
//                   ? "bg-red-100 text-red-800"
//                   : "bg-yellow-100 text-yellow-800"
//               }`}
//             >
//               {mentor.status}
//             </span>
//           </div>
          
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default RequestedMentors;
import React from 'react'

const page = () => {
  return (
    <div>
      none
    </div>
  )
}

export default page
