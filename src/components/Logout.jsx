import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthProvider";

export default function Logout() {
    const { setUserRole } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("userRole");
        setUserRole("USER"); // Reset role in context
        api.get("/user/logout")
            .catch((error) => {
                console.error("Error while logout",error);
            });
        // Redirect after a short delay (optional)
        setTimeout(() => {
            navigate("/"); // Redirect to login page
        }, 500); // Delay for better UX (optional)
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold">Logging out...</p>
        </div>
    );
}
