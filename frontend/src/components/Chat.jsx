import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Chat() {
    const whatsappNumber = "+919385994200"; 
    const message = "Hello! I need help."; 

    const handleClick = () => {
        window.open(
            `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                message
            )}`,
            "_blank"
        );
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 z-50"
            title="Chat on WhatsApp"
        >
            <FaWhatsapp className="text-2xl" />
        </button>
    );
}
