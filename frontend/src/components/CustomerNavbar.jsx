import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CustomerNavbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // Read theme from localStorage if exists
        return localStorage.getItem("theme") === "dark";
    });

    // Apply theme on mount + whenever toggled
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="bg-blue-900 dark:bg-gray-900 text-white dark:text-gray-200 p-4 flex justify-between items-center transition-colors duration-300">
            {/* Brand */}
            <div className="text-xl font-bold">Customer Portal</div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button onClick={() => setOpen(!open)} className="text-2xl">
                    ☰
                </button>
            </div>

            {/* Nav Links */}
            <ul
                className={`md:flex md:items-center md:space-x-6 absolute md:static left-0 w-full md:w-auto bg-blue-900 dark:bg-gray-900 md:bg-transparent ${open ? "top-16" : "-top-80"
                    } md:top-auto transition-all duration-300 ease-in-out md:transition-none`}
            >
                <li><Link to="/customer/home" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">Home</Link></li>
                <li><Link to="/customer/projects" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">Projects</Link></li>
                <li><Link to="/customer/enquiries" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">My Enquiries</Link></li>
                <li><Link to="/customer/payments" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">My Payments</Link></li>
                <li><Link to="/customer/support" className="block p-2 hover:text-blue-300 dark:hover:text-blue-400">Support</Link></li>

                {/* Dark mode toggle */}
                <li>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition"
                    >
                        {darkMode ? "🌙 Dark" : "☀️ Light"}
                    </button>
                </li>

                {/* Logout */}
                <li>
                    <button
                        onClick={logout}
                        className="block p-2 text-red-400 hover:text-red-500 font-medium"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}
