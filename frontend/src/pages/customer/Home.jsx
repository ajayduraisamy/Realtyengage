// src/pages/customer/Home.jsx
import { useState, useEffect } from "react";

export default function Home() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
            
            <div className="p-8 text-center">
              
                
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                <div className="bg-gradient-to-tr from-purple-400 to-indigo-500 dark:from-purple-700 dark:to-indigo-900 text-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Browse Projects</h3>
                    <p>Explore a wide range of premium real estate projects tailored for you.</p>
                </div>

                <div className="bg-gradient-to-tr from-pink-400 to-orange-400 dark:from-pink-700 dark:to-orange-700 text-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">View Enquiries</h3>
                    <p>Track your enquiries in real-time and stay updated with responses.</p>
                </div>

                <div className="bg-gradient-to-tr from-green-400 to-teal-500 dark:from-green-700 dark:to-teal-700 text-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Make Payments</h3>
                    <p>Securely pay for projects and keep all payment history in one place.</p>
                </div>

                <div className="bg-gradient-to-tr from-yellow-400 to-red-500 dark:from-yellow-600 dark:to-red-700 text-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Contact Support</h3>
                    <p>Reach out to our support team for any queries or assistance you need.</p>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center p-8 mt-8 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 dark:from-indigo-700 dark:via-pink-700 dark:to-yellow-600 rounded-3xl mx-4 shadow-xl transition-colors duration-500">
                <h2 className="text-3xl font-bold text-white mb-2">Get Started Today!</h2>
                <p className="text-white mb-4">Browse the latest projects and connect with our team.</p>
                <button className="px-6 py-3 bg-white text-indigo-600 dark:text-indigo-700 font-semibold rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-200">
                    Explore Projects
                </button>
            </div>
        </div>
    );
}
