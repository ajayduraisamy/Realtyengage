// src/components/CustomerNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CustomerNavbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Customer Portal</div>
            <div className="md:hidden">
                <button onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>
            <ul className={`md:flex md:items-center md:space-x-6 ${open ? "block" : "hidden"}`}>
                <li><Link to="/customer/home" className="hover:text-blue-300">Home</Link></li>
                <li><Link to="/customer/projects" className="hover:text-blue-300">Projects</Link></li>
                <li><Link to="/customer/enquiries" className="hover:text-blue-300">My Enquiries</Link></li>
                <li><Link to="/customer/payments" className="hover:text-blue-300">My Payments</Link></li>
                <li><Link to="/customer/support" className="hover:text-blue-300">Support</Link></li>
                <li><button onClick={logout} className="hover:text-red-400">Logout</button></li>
            </ul>
        </nav>
    );
}
