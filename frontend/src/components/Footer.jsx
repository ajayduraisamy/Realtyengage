// src/components/Footer.jsx
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 py-4 ">
            <div className="container mx-auto px-6  justify-between items-center">
                <div className="mb-2 md:mb-0">
                  
                    <p className=" text-lg mt-1 text-white text-center">
                        &copy; {new Date().getFullYear()} RealtyEngage. All rights reserved.
                    </p>
                </div>

                
            </div>
        </footer>
    );
}
