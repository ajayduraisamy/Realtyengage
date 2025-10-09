

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
            {/* Navbar */}
          

            {/* Hero Section */}
            <div className="p-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 mb-4">
                    Welcome to RealtyEngage
                </h1>
                <p className="text-lg md:text-xl font-medium text-gray-800">
                    Your premium customer dashboard to explore projects, track enquiries, make payments, and contact support.
                </p>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                <div className="bg-gradient-to-tr from-purple-400 to-indigo-500 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Browse Projects</h3>
                    <p>Explore a wide range of premium real estate projects tailored for you.</p>
                </div>

                <div className="bg-gradient-to-tr from-pink-400 to-orange-400 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">View Enquiries</h3>
                    <p>Track your enquiries in real-time and stay updated with responses.</p>
                </div>

                <div className="bg-gradient-to-tr from-green-400 to-teal-500 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Make Payments</h3>
                    <p>Securely pay for projects and keep all payment history in one place.</p>
                </div>

                <div className="bg-gradient-to-tr from-yellow-400 to-red-500 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Contact Support</h3>
                    <p>Reach out to our support team for any queries or assistance you need.</p>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center p-8 mt-8 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-3xl mx-8 shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-2">Get Started Today!</h2>
                <p className="text-white mb-4">Browse the latest projects and connect with our team.</p>
                <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-gray-100 transition-colors duration-200">
                    Explore Projects
                </button>
            </div>
        </div>
    );
}
