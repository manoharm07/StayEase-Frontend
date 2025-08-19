import api from "../api";
import { useEffect, useState } from "react";

export default function StaffHostelDetails({ hostelId }) {
    const [hostel, setHostel] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get(`hostel/details/${hostelId}`);
                setHostel(response.data);
            } catch (err) {
                setError("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

    return (

        <div className="bg-gray-900 p-6 text-white min-h-screen">
            {loading ? (
                <p className="text-gray-400">Loading Details...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : hostel === null ? (
                <p className="text-gray-400">Hostel Details not found.</p>
            ) : (

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl text-center font-bold">{hostel.name}</h1>
                    <p className="text-center text-gray-400 text-lg mt-2">{hostel.location}</p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <span className="text-gray-300">Capacity</span>
                            <p className="text-2xl font-semibold">{hostel.capacity}</p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                            <span className="text-gray-300">Empty Seats</span>
                            <p className="text-2xl font-semibold">{hostel.empty_seats}</p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                            <span className="text-gray-300">Fees</span>
                            <p className="text-2xl font-semibold">₹{hostel.fees}</p>
                        </div>

                        {hostel.phone && (
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <span className="text-gray-300">Contact</span>
                                <p className="text-2xl font-semibold">{hostel.phone}</p>
                            </div>
                        )}
                    </div>
                </div>
            )
            }
        </div>
    )
}
