import { useNavigate } from "react-router-dom";

export default function SessionExpired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Session Expired</h1>
      <p className="text-gray-400 mb-6">Your session has expired. Please log in again to continue.</p>

      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        Login Again
      </button>
    </div>
  );
}
