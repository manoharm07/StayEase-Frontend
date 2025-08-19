import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X ,User} from "lucide-react";
import { useAuth } from "../AuthProvider";
import api from "@/api";
import logo from "../assets/image.png"

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const { userRole,setUserRole } = useAuth();
  

  const getNavLinks = () => {
    switch (userRole) {
      case "STUDENT":
        return [
          { to: "/", label: "Home" },
          { to: "/hostels", label: "Hostels" },
          { to: "/applications", label: "Applications" },
          { to: "/about", label: "About Us" },
        ];
      case "STAFF":
        return [
          { to: "/", label: "Home" },
          { to: "/create", label: "Create" },
          { to: "/about", label: "About Us" },
        ];
      case "USTAFF":
        return [
          { to: "/staffHostel", label: "MyHostel" },
          { to: "/staffApplication", label: "Applications" },
          { to: "/staffPayments", label: "Payments" },
          { to: "/room", label: "Room" },

        ];
      case "USTUDENT":
        return [
          { to: "/studentHostel", label: "MyHostel" },
          { to: "/studentFood", label: "Food" },
          { to: "/studentPayments", label: "Payments" },
        ];
      default:
        return [
          { to: "/", label: "Home" },
          { to: "/hostels", label: "Hostels" },
          { to: "/about", label: "About Us" },
        ];
    }
  };

  return (
    <header className="bg-gray-900 border-b-2 text-xl border-b-blue-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex  items-center space-x-3">
          <img src={logo} width={45} alt="" />
          <NavLink to="/" className={({ isActive }) => `hover:text-blue-400 text-3xl transition duration-300 ${isActive ? "text-blue-400 font-bold" : ""}`}>
            StayEase
          </NavLink>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {getNavLinks().map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `hover:text-blue-400 transition duration-300 ${isActive ? "text-blue-400 font-bold" : ""}`}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex space-x-4 items-center">

          {userRole == "USER" ? (
            <>
              <NavLink to="/login" className={({ isActive }) =>
    `px-4 py-2 rounded-lg transition duration-300 ${
      isActive
        ? "bg-blue-500 text-white font-bold"
        : "bg-blue-800 text-gray-300 hover:bg-blue-500 hover:text-white"
    }`
  } onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) =>
    `px-4 py-2 rounded-lg transition duration-300 ${
      isActive
        ? "bg-blue-500 text-white font-bold"
        : "bg-blue-800 text-gray-300 hover:bg-blue-500 hover:text-white"
    }`
  } onClick={() => setIsOpen(false)}>
                Register
              </NavLink>
            </>
          ) : <>
            <NavLink to="/logout" className={({ isActive }) =>
    `px-4 py-2 rounded-lg transition duration-300 ${
      isActive
        ? "bg-blue-500 text-white font-bold"
        : "bg-blue-800 text-gray-300 hover:bg-blue-500 hover:text-white"
    }`
  }  onClick={() => setIsOpen(false)}>
              Logout
            </NavLink>
            {/* Profile icon with dropdown */}
<div className="ms-4 relative">
    <NavLink className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-blue-400" to="/profile"><User size={20} /></NavLink> 
</div>
          </>}
        </div>
        <button className="md:hidden text-blue-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-800 py-4 space-y-2">
          {getNavLinks().map((link) => (
            <NavLink key={link.to} to={link.to} className="py-2 hover:text-blue-400 transition duration-300" onClick={() => setIsOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          {userRole == "USER" ? (
            <>
              <NavLink to="/login" className="py-2 hover:text-blue-400 border-1 border-red-900 transition duration-300 flex items-center" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition duration-300 flex items-center" onClick={() => setIsOpen(false)}>
                Register
              </NavLink>
            </>
          ) : <>
            <NavLink to="/logout" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition duration-300 flex items-center" onClick={() => setIsOpen(false)}>
              Logout
            </NavLink>
          </>}
        </div>
      )}
    </header>
  );
}