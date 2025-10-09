import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaUser, FaMoon, FaSun } from "react-icons/fa";

export default function CustomerNavbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="bg-blue-900 dark:bg-gray-900 text-white dark:text-gray-200 p-4 flex justify-between items-center relative">
            {/* Brand */}
            <div className="text-xl font-bold md:text-2xl">Realty Engage Customer Portal</div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button onClick={() => setOpen(!open)} className="text-2xl">
                    <FaBars />
                </button>
            </div>

            {/* Nav Links */}
            <ul
                className={`md:flex md:items-center md:space-x-6 absolute md:static left-0 w-full md:w-auto bg-blue-900 dark:bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out ${open ? "top-16" : "-top-96"} md:top-auto`}
            >
                <li><Link to="/customer/home" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">Home</Link></li>
                <li><Link to="/customer/projects" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">Projects</Link></li>
                <li><Link to="/customer/enquery" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">Enquiries</Link></li>
                <li><Link to="/customer/support" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">Support</Link></li>
                <li ref={dropdownRef} className="relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 p-2 hover:text-blue-300 dark:hover:text-blue-400 focus:outline-none"
                    >
                        <FaUser /> Profile
                        <span>{profileOpen ? "▲" : "▼"}</span>
                    </button>

                    {/* Dropdown menu */}
                    <ul
                        className={`absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden transition-all duration-200 ${profileOpen ? "block opacity-100" : "hidden opacity-0"
                            } z-50`}
                    >
                        <li>
                            <Link
                                to="/customer/enquiries"
                                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                My Enquiries
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/customer/payments"
                                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                My Payments
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/customer/profile"
                                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Edit Profile
                            </Link>
                        </li>

                        <li>
                           <Link
                                onClick={logout}
                                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Logout
                            </Link>

                        </li>
                    </ul>
                </li>

               

                {/* Dark mode toggle */}
                <li>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition flex items-center gap-2"
                    >
                        {darkMode ? <FaMoon /> : <FaSun />}
                        {darkMode ? "Dark" : "Light"}
                    </button>
                </li>

                {/* Logout */}
                
            </ul>
        </nav>
    );
}
