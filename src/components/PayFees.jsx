import api from "@/api";
import { useState } from "react";
import { toast } from "sonner";

export default function FeesPayment() {
  const [formData, setFormData] = useState({
    amount: "",
    transaction_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/feesPayment/payFees", formData);
      toast.success("Paid successfully!");
    } catch (error) {
      toast.error("error while paying!");
      console.error("Error while Paying:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-900 text-white">
      <div className="max-w-lg w-full p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Fees Payment</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Transaction ID</label>
            <input
              type="text"
              name="transaction_id"
              value={formData.transaction_id}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
