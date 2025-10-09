// src/layouts/CustomerLayout.jsx
import { Outlet } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";
import Chat from "../components/Chat";

export default function CustomerLayout() {
    return (
        <div className="min-h-screen flex flex-col">
           
            <CustomerNavbar />

           
            <main className="flex-1 p-6 mt-4">
                <Outlet />  
            </main>
            
            <Chat/>
            <Footer />
        </div>
    );
}
