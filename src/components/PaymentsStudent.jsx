import { useEffect, useState } from "react";
import api from "../api";

export default function PaymentsStudent() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await api.get("/feesPayment/getForStudent");
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
                                    <th className="p-4 text-left">Transaction Id</th>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-end">Stauts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((app) => (
                                    <tr key={app.transaction_id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="p-4">{app.transaction_id}</td>
                                        <td className="p-4">{app.date}</td>
                                        <td className="p-4">{app.amount}</td>

                                        <td className="p-4 text-end">
                                            <span
                                                className={`px-3 py-1 rounded-full text-white text-sm ${app.paymentStatus === "PENDING"
                                                        ? "bg-yellow-500"
                                                        : app.paymentStatus === "VERIFIED"
                                                            ? "bg-green-700"
                                                            : "bg-red-500"
                                                    }`}
                                            >
                                                {app.paymentStatus}
                                            </span>
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
