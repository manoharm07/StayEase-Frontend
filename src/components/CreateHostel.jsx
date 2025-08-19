import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { toast } from "sonner";

export default function HostelForm() {
    const [hostel, setHostel] = useState({
        name: "",
        location: "",
        phone: "",
        capacity: "",
        empty_seats: "",
        fees: "",
    });
    const navigate = useNavigate();
    const { setUserRole } = useAuth();



    const handleChange = (e) => {
        setHostel({ ...hostel, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await api.post("/hostel/create",hostel);
            toast.success("Hostel created successfully!");
            localStorage.setItem("userRole","USTAFF");
            setUserRole("USTAFF")
            navigate("/");

        } catch (error) {
            toast.error("Error in creating hostel!");
            console.error("Error adding hostel:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
            <div className="max-w-2xl w-full bg-gray-900 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Add Hostel Details</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Hostel Name</label>
                        <input
                            type="text"
                            name="name"
                            value={hostel.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={hostel.location}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={hostel.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            value={hostel.capacity}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Empty Seats</label>
                        <input
                            type="number"
                            name="empty_seats"
                            value={hostel.empty_seats}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Fees (₹)</label>
                        <input
                            type="number"
                            name="fees"
                            value={hostel.fees}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
