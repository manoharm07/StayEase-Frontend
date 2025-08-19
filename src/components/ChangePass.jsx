import { useState } from "react";
import api from "../api";

export default function ChangePass() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/changePassword", formData);
      alert("password changed successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Change Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-300">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
