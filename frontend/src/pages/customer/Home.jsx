// src/pages/customer/Home.jsx
import { useState, useEffect, useCallback } from "react";
import { FaArrowLeft, FaArrowRight, FaSearch, FaShieldAlt, FaHome, FaCreditCard, FaHeadset } from "react-icons/fa";

export default function Home() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const carouselImages = [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
    ];

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const nextSlide = useCallback(() => {
        setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, [carouselImages.length]);

    const prevSlide = () => {
        setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const goToSlide = (index) => {
        setCarouselIndex(index);
    };

    const services = [
        {
            icon: <FaSearch className="text-2xl" />,
            title: "Browse Projects",
            description: "Explore a wide range of premium real estate projects tailored for you.",
            gradient: "bg-gradient-to-r from-blue-600 to-indigo-700",
            darkGradient: "from-purple-600 to-indigo-800"
        },
        {
            icon: <FaHome className="text-2xl" />,
            title: "View Enquiries",
            description: "Track your enquiries in real-time and stay updated with responses.",
            gradient: "bg-gradient-to-r from-blue-600 to-indigo-700",
            darkGradient: "from-pink-600 to-rose-700"
        },
        {
            icon: <FaCreditCard className="text-2xl" />,
            title: "Make Payments",
            description: "Securely pay for projects and keep all payment history in one place.",
            gradient: "bg-gradient-to-r from-blue-600 to-indigo-700",
            darkGradient: "from-emerald-600 to-teal-800"
        },
        {
            icon: <FaHeadset className="text-2xl" />,
            title: "Contact Support",
            description: "Reach out to our support team for any queries or assistance you need.",
            gradient: "bg-gradient-to-r from-blue-600 to-indigo-700",
            darkGradient: "from-amber-600 to-orange-700"
        }
    ];

    return (
        <div className="transition-colors duration-500 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen overflow-hidden">

            {/* Hero Carousel Section */}
            <section className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div
                    className="relative w-full overflow-hidden rounded-3xl shadow-2xl aspect-[16/9] md:aspect-[21/9] group"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <img
                        src={carouselImages[carouselIndex]}
                        alt={`Slide ${carouselIndex + 1}`}
                        className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

                    {/* Carousel content */}
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                            Find Your Dream Property
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl drop-shadow-lg opacity-90">
                            Discover exclusive real estate opportunities with premium amenities and strategic locations
                        </p>
                    </div>

                    {/* Carousel Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-4 rounded-full shadow-2xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                        <FaArrowLeft className="text-gray-800 dark:text-white text-lg" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-4 rounded-full shadow-2xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                        <FaArrowRight className="text-gray-800 dark:text-white text-lg" />
                    </button>

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === carouselIndex
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="max-w-7xl mx-auto py-20 px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="w-full h-80 lg:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt="About Us"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl -z-10"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl -z-10 opacity-20"></div>
                </div>

                <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                        About RealtyEngage
                    </div>
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Redefining Real Estate Excellence
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        RealtyEngage is a modern real estate platform designed to connect you with the best properties
                        and manage your projects efficiently. We simplify your property journey with real-time updates,
                        secure transactions, and a dedicated support team.
                    </p>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Our goal is to provide transparency, reliability, and convenience in every step of your property
                        investment. From browsing projects to completing payments, RealtyEngage ensures a seamless experience.
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                                <FaShieldAlt className="text-green-600 dark:text-green-400" />
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300">Secure Transactions</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <FaHeadset className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300">24/7 Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="max-w-7xl mx-auto py-20 px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
                        Our Services
                    </div>
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
                        Everything You Need
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Comprehensive real estate services designed to make your property journey smooth and successful
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >

                            < div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} dark:${service.darkGradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`}></div>


                            <div className="relative p-8 h-full flex flex-col text-white z-10">

                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>


                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-white/90 leading-relaxed flex-grow">
                                    {service.description}
                                </p>


                                <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <FaArrowRight className="text-sm" />
                                    </div>
                                </div>
                            </div>


                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
