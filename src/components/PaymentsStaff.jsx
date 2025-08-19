import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "sonner";

export default function PaymentsStaff() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await api.get("/feesPayment/getForHostel");
                console.log(response.data);
                setPayments(response.data);
            } catch (err) {
                setError("Failed to fetch payments.");
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    const handleAction = async (transaction_id, paymentStatus) => {
        console.log(transaction_id,paymentStatus);
        try {
            await api.put(`/feesPayment/verify`, { transaction_id,paymentStatus });
            setPayments((prev) =>
                prev.map((app) =>
                    app.transaction_id === transaction_id ? { ...app, paymentStatus } : app
                )
            );
            toast.success("verified successfully!");

        } catch (error) {
            toast.error("Failed to update status!");
            console.error("Failed to update status", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-400 mb-6">Student payments</h1>

                {loading ? (
                    <p className="text-gray-400">Loading Payments...</p>
                ) : error ? (
                    <p className="text-red-400">{error}</p>
                ) : payments.length === 0 ? (
                    <p className="text-gray-400">No Payments found.</p>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border border-gray-700 bg-gray-800 rounded-lg overflow-hidden">
                            <thead className="bg-gray-700 text-gray-300">
                                <tr>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-left">Transaction Id</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((app) => (
                                    <tr key={app.transaction_id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="p-4">{app.studentName}</td>
                                        <td className="p-4">{app.email}</td>
                                        <td className="p-4">{app.transaction_id}</td>
                                        <td className="p-4">{app.amount}</td>

                                        <td className="p-4 flex justify-center gap-4">
                                            {app.paymentStatus === "PENDING" ? (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(app.transaction_id, "VERIFIED")}
                                                        className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg transition"
                                                    >
                                                        Verify
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(app.transaction_id, "REJECTED")}
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
                                                    {app.paymentStatus}
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
