import { useEffect, useState } from "react";
import api from "@/api";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("user/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-800 text-center py-10 text-gray-500">Loading profile...</div>;

  if (!user) return <div className="min-h-screen bg-gray-800 text-center py-10 text-red-500">Failed to load profile.</div>;

  return (

    <div className="min-h-screen pt-40 bg-gray-800 text-white">
      <div className="max-w-3xl mx-auto bg-gray-900 shadow-xl rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Profile Sidebar */}
          <div className="bg-blue-900 text-white md:w-1/3 p-6 flex flex-col justify-center items-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white mb-4"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm uppercase">{user.role}</p>
          </div>

          {/* Profile Info */}
          <div className="md:w-2/3 p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>

            <InfoField label="Email" value={user.email} />
            <InfoField label="Name" value={user.name} />
            <InfoField label="Address" value={user.address} />
            <InfoField label="Phone" value={user.phone} />
            <InfoField label="Role" value={user.role} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-sm">{label}</p>
      <p className="text-base font-medium">{value}</p>
    </div>
  );
}
