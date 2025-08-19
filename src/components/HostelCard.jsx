import React from 'react'

export default function HostelCard({ hostel,handleViewDetails }) {
  
  return (
<div className="bg-gray-700 shadow-lg rounded-lg p-4 border border-gray-200 text-white">
            <h2 className="text-xl font-bold mt-2">{hostel.name}</h2>
            <p className="">💰 Fee: {hostel.fees}</p>
            <p className="">📍 {hostel.location}</p>

            {/* View Details Button */}
            <button onClick={()=>handleViewDetails(hostel.hostelId)} className="mt-5 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition">
        View Details
      </button>
          </div>
  );
}
