import { useEffect, useState } from "react";
import HostelCard from "./HostelCard";
import api from "../api";
import { useNavigate } from "react-router-dom";


export default function HostelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("name");
  const [hostels, setHostels] = useState([]);
  const navigate = useNavigate();
  const handleViewDetails = (hostelId) => {
    navigate(`/hostelDetails/${hostelId}`);
  };

  useEffect(() => {
    api
      .get(`/hostel/search?filterBy=${filter}&searchText=${searchQuery}`)
      .then((response) => setHostels(response.data))
      .catch((error) => console.error("Error fetching hostels:", error));
  }, [searchQuery, filter]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHostels = hostels.filter((hostel) =>
    hostel[filter].toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" bg-gray-800 h-screen text-white">
    <div className="container w-full mx-auto p-6 bg-gray-800">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">🏨 Available Hostels</h1>

      {/* Centered Search & Filter */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={`Search by ${filter}...`}
          className="w-full text-white px-4 py-2 bg-gray-850 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="fees">Fees</option>
        </select>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredHostels.length > 0 ? (
          filteredHostels.map((hostel) => <HostelCard key={hostel.hostelId} hostel={hostel} handleViewDetails={handleViewDetails} />)
        ) : (
          <p className="text-center col-span-full text-gray-400">No hostels found.</p>
        )}
      </div>
    </div>
    </div>
  );
}
