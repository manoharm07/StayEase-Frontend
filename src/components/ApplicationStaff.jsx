import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "sonner";

export default function StaffApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get("/application/getForHostel");
                console.log(response.data);
                setApplications(response.data);
            } catch (err) {
                setError("Failed to fetch applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleAction = async (applicationId, status) => {
        try {
            await api.put(`/application/changeStatus`, { applicationId,status });
            setApplications((prev) =>
                prev.map((app) =>
                    app.applicationId === applicationId ? { ...app, status } : app
                )
            );
            toast.success("status updated successfully");
        } catch (error) {
            toast.error("Error creating rooms");
            console.error("Failed to update status", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-400 mb-6">Student Applications</h1>

                {loading ? (
                    <p className="text-gray-400">Loading applications...</p>
                ) : error ? (
                    <p className="text-red-400">{error}</p>
                ) : applications.length === 0 ? (
                    <p className="text-gray-400">No applications found.</p>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border border-gray-700 bg-gray-800 rounded-lg overflow-hidden">
                            <thead className="bg-gray-700 text-gray-300">
                                <tr>
                                    <th className="p-4 text-left">Student Name</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.applicationId} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="p-4">{app.studentName}</td>
                                        <td className="p-4">{app.email}</td>
                                        <td className="p-4 flex justify-center gap-4">
                                            {app.status === "PENDING" ? (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(app.applicationId, "ACCEPTED")}
                                                        className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg transition"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(app.applicationId, "REJECTED")}
                                                        className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg transition"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="bg-gray-700 text-gray-400 font-semibold px-4 py-2 rounded-lg cursor-not-allowed"
                                                >
                                                    {app.status}
                                                </button>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
