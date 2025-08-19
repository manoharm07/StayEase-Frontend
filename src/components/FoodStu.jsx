import api from "@/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ConfirmDinner() {
    const [isAllowed, setIsAllowed] = useState(false);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      checkEligibility();
    }, []);
  
    const checkEligibility = () => {
      const lastIncrementDate = localStorage.getItem("lastIncrementDate");
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  
      const now = new Date();
      const cutoffTime = new Date();
      cutoffTime.setHours(17, 0, 0, 0); // Set time to 5:00 PM
  
      if (lastIncrementDate !== today && now < cutoffTime) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    };
  
    const handleIncrement = async () => {
      if (!isAllowed) return;
  
      setLoading(true);
      try {
        const response = await api.put("/food/incCount");
        console.log(response);
        if (response.status === 200) {
          toast.success("Count incremented successfully!");
          localStorage.setItem("lastIncrementDate", new Date().toISOString().split("T")[0]); // Store today's date
          setIsAllowed(false);
        } else {
          toast.success("Failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    return (

      

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
            <h1 className="text-3xl font-bold text-green-500 mb-4">Dinner Confirmation</h1>
            {isAllowed ? (
                <>
                    <p className="text-gray-400 mb-6">Click the button below to confirm your dinner.</p>
                    <button
                        onClick={handleIncrement}
                        disabled={!isAllowed || loading}
                        className="bg-green-600 disabled:opacity-50 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg transition"
                    >
                        Confirm Dinner
                    </button>
                    <p className="text-gray-300 text-lg mt-4 mb-6 italic">
                        "A warm meal is waiting for you! 🍽️ Confirm your dinner now."
                    </p>
                </>
            ) : (
                <p className="text-lg text-green-400 font-semibold italic">
                    ✅ You have successfully confirmed your dinner! Enjoy your meal! 🍽️
                </p>
            )}
        </div>
    );
}
