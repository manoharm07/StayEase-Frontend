import { useParams } from "react-router-dom";
import api from "../api";
import { useEffect, useState } from "react";
import { Bed, IndianRupee, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export default function HostelDetails() {
    const [hostel, setHostel] = useState([]);
    const { hostelId } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkApplied, setCheckApplied] = useState(false);
    const handleBtnClick = (id) => {
        try {
            api.post(`application/create/${id}`);
            toast.success("applied successfully");
            setCheckApplied(true);
        } catch (err) {
            toast.error("failed to apply");
            console.log("error occured", err);
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response1 = await api.get(`application/checkApplied/${hostelId}`);
                setCheckApplied(response1.data);
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

<div className="flex flex-col bg-gray-800 text-white p-4 items-center min-h-screen">
    {loading ? (
                <p className="text-gray-400">Loading Details...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : hostel === null ? (
                <p className="text-gray-400">Hostel Details not found.</p>
            ) : (
            <div className="bg-gray-800 border-3 mt-30 border-gray-300 p-8 rounded-lg shadow-2xl w-full duration-500 hover:scale-105 hover:shadow-3xl max-w-lg transform transition">
<h1 className="text-4xl text-centerfont-bold">{hostel.name}</h1>

<div className="mt-4 space-y-3">
<p className="flex items-center"><MapPin className="text-blue-600 mr-2"/> {hostel.location}</p>
<p className="flex items-center"><Bed className="text-blue-600 mr-2"/> Total Seats: {hostel.capacity}</p>
<p className="flex items-center"><Bed className="text-blue-600 mr-2"/> Empty Rooms: {hostel.empty_seats}</p>
<p className="flex items-center"><Phone className="text-blue-600 mr-2"/> {hostel.phone}</p>
<p className="flex items-center"><IndianRupee className="text-blue-600 mr-2"/> {hostel.fees}</p>
</div>

<div className="flex justify-center mt-10">
  <button onClick={() => handleBtnClick(hostelId)}
      className={`bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition 
${checkApplied ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={checkApplied}
  >
      {!checkApplied ? "Apply" : "Already Applied"}
  </button>
</div>
</div>)
        }
</div>
        );
    
}


