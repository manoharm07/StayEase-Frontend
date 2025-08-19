import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "sonner";

export default function FoodPage() {
  const [stdCount, setStdCount] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`food/get`);
        setStdCount(response.data);
      } catch (err) {
        console.log("Failed to load applications.");
      }
    };
    fetchDetails();
  }, []);

  const clearCount = () => {
    try {
      api.put(`food/clearCount`);
      setStdCount(0);
      toast.success("Count cleared successfully!");
    } catch (err) {
      console.log("Failed to load applications.");
      toast.error("Failed");
    }
  };

  return (

    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
  {stdCount === null ? (
    <p className="text-gray-400 text-lg">Loading...</p>
  ) : (
    <div className="text-center"> {/* Center text inside */}
      <h1 className="text-3xl font-bold text-green-500 mb-4">Dinner Confirmation</h1>
      <p className="text-gray-400 mb-6">Number of students confirmed for dinner tonight:</p>

      <div className="text-6xl font-bold text-blue-400 mb-6">{stdCount}</div>

      <p className="text-gray-300 text-lg mb-6 italic">
        "Good food, good mood! Let's make tonight’s dinner memorable. 🍽️"
      </p>

      <button
        onClick={clearCount}
        className="bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        Clear Count
      </button>
    </div>
  )}
</div>
  );
}
