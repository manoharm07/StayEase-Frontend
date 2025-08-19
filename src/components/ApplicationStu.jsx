import { useEffect, useState } from "react";
import api from "../api";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("application/getForStudent");
        setApplications(response.data);
      } catch (err) {
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="flex flex-col flex-grow items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {loading ? (
        <p className="text-gray-400">Loading applications...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-400">No applications found.</p>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="w-full border border-gray-700 bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-4 text-left">Hostel Name</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="p-4">{app.hostelName}</td>
                  <td className="p-4 text-end">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        app.status === "PENDING"
                          ? "bg-yellow-500"
                          : app.status === "ACCEPTED"
                          ? "bg-green-700"
                          : "bg-red-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
