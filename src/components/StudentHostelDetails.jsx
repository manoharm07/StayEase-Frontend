import api from "../api";
import { useEffect, useState } from "react";

export default function StudentHostelDetails({ hostelId }) {
    const [hostel, setHostel] = useState([]);
    const [room, setRoom] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get(`hostel/details/${hostelId}`);
                const response1 = await api.get(`room/details/student`);
                setHostel(response.data);
                setRoom(response1.data);
            } catch (err) {
                setError("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

    return (

        <div className="min-h-screen bg-gray-900 mt-20 text-white">
            {loading ? (
                <p className="text-gray-400">Loading Details...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : hostel === null || room === null ? (
                <p className="text-gray-400">Hostel Details not found.</p>
            ) : (

                <div>
  <h1 className="text-5xl text-center font-bold">{hostel.name}</h1>
  <p className="text-center text-gray-400 text-3xl mt-4">{hostel.location}</p>

  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
    <div className="bg-gray-800 p-6 rounded-xl">
      <span className="text-gray-300 text-xl">Capacity</span>
      <p className="text-3xl font-semibold">{hostel.capacity}</p>
    </div>

    <div className="bg-gray-800 p-6 rounded-xl">
      <span className="text-gray-300 text-xl">Empty Seats</span>
      <p className="text-3xl font-semibold">{hostel.empty_seats}</p>
    </div>

    <div className="bg-gray-800 p-6 rounded-xl">
      <span className="text-gray-300 text-xl">Fees</span>
      <p className="text-3xl font-semibold">₹{hostel.fees}</p>
    </div>

    {hostel.phone && (
      <div className="bg-gray-800 p-6 rounded-xl">
        <span className="text-gray-300 text-xl">Contact</span>
        <p className="text-3xl font-semibold">{hostel.phone}</p>
      </div>
    )}

    <div className="bg-gray-800 p-6 rounded-xl">
      <span className="text-gray-300 text-xl">Room No</span>
      <p className="text-3xl font-semibold">{room.roomNo}</p>
    </div>

    <div className="bg-gray-800 p-6 rounded-xl">
      <span className="text-gray-300 text-xl">Floor No</span>
      <p className="text-3xl font-semibold">{room.floorNo}</p>
    </div>
  </div>
</div>

            )
            }
        </div>
    )
}
