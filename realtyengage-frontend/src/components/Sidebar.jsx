import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaHome, FaProjectDiagram, FaUsers, FaMoneyBillWave, FaEnvelope, FaLifeRing, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const menuItems = [
        { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard", color: "hover:text-blue-400" },
        { name: "Projects", icon: <FaProjectDiagram />, path: "/admin/projects", color: "hover:text-purple-400" },
        { name: "Enquiries", icon: <FaEnvelope />, path: "/admin/enquiries", color: "hover:text-yellow-400" },
        { name: "Payments", icon: <FaMoneyBillWave />, path: "/admin/payments", color: "hover:text-green-400" },
        { name: "Support", icon: <FaLifeRing />, path: "/admin/support", color: "hover:text-indigo-400" },
        { name: "Customers", icon: <FaUsers />, path: "/admin/customers", color: "hover:text-pink-400" },
    ];

    return (
        <>
            {/* Toggle Button Floating */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed top-4 left-4 z-50 bg-gray-700 text-white p-2 rounded-md shadow-lg hover:bg-gray-600 transition-all"
            >
                <FaBars size={20} />
            </button>

            {/* Sidebar */}
            <div
                style={{ width: open ? "16rem" : "5rem" }}
                className="bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen p-4 flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
                <div>
                    

                    <ul className="space-y-4 mt-10">
                        <h3 className={`text-xl font-bold transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
                            Admin Panel
                        </h3>
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 p-2 rounded-lg font-semibold text-gray-200 ${item.color} hover:bg-gray-700 transition-all duration-300`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className={`transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"} origin-left`}>
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 p-2 rounded-lg font-semibold text-red-400 hover:text-red-500 hover:bg-gray-700 transition-all duration-300 w-full"
                            >
                                <FaSignOutAlt size={18} />
                                <span className={`transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"} origin-left`}>
                                    Logout
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>

                <div className={`mt-auto text-gray-400 text-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
                    &copy; {new Date().getFullYear()} RealtyEngage
                </div>
            </div>
        </>
    );
}
