// src/layouts/CustomerLayout.jsx
import { Outlet } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";

export default function CustomerLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar only here */}
            <CustomerNavbar />

            {/* Page content */}
            <main className="flex-1 p-6 mt-4">
                <Outlet />  {/* child pages render here */}
            </main>
        </div>
    );
}
