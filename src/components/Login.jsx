import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthProvider";
import { toast } from "sonner";


export default function Login() {
    const [email, setEmail] = useState("");
    const { setUserRole } = useAuth();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await api.post("/user/login", 
                { email, password }, { withCredentials: true }
            );
            
            localStorage.setItem("userRole", response.data.role);
            setUserRole(response.data.role);
            toast.success("Login successful! 🎉");
            
            navigate("/");
        } catch (err) {
            console.error("Error logging in:", err);
            toast.error("Invalid email or password");
        }
    };

    return (
        <section className="dark:bg-gray-900 text-white">
            <div className="flex flex-col items-center justify-center text-white px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Sign in to your account
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="bg-gray-750 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="bg-gray-750 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
