import { useEffect, useState } from "react";
import FoodPage from "./FoodHostel";
import StaffHostelDetails from "./StaffHostelDetails";
import api from "../api";
import UpdateHostel from "./UpdateHostel";

const tabs = ["Details", "Update", "Food"];

export default function StaffHostel() {
  const [activeTab, setActiveTab] = useState("Details");
  const [hostelId,setHostelId] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
        try {
            const response = await api.get("/hostel/detail");
            setHostelId(response.data);
        } catch (err) {
            console.log("Failed to load applications.");
        }
    };
    fetchDetails();
}, []);


return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
      {hostelId === null ? (
        <p className="text-gray-400 text-lg">Loading...</p>
      ) : (
        <div className="max-w-4xl w-full">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-700 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-center font-semibold transition duration-300
                  ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400 hover:text-white"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
  
          {/* Tab Content */}
          <div className="h-full w-full">
            {activeTab === "Details" && <StaffHostelDetails hostelId={hostelId} />}
            {activeTab === "Update" && <UpdateHostel hostelId={hostelId} />}
            {activeTab === "Food" && <FoodPage />}
          </div>
        </div>
      )}
    </div>
  );  
}