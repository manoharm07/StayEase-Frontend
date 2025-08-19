import { useEffect, useState } from "react";
import api from "../api";
import StudentHostelDetails from "./StudentHostelDetails";


export default function StudentHostel() {
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
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
      {hostelId === null ? (
        <p className="text-gray-400 text-lg">Loading...</p>
      ) : (
        <div>
          <StudentHostelDetails hostelId={hostelId} />
        </div>  
      )}
    </div>
  );  
}