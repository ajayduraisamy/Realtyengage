import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const { data } = await API.post("/auth/register", {
                name,
                email,
                number,
                address,
                password,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (borderColor, bgColor, textColor, focusColor) =>
        `w-full p-3 border ${borderColor} rounded-lg focus:ring-2 focus:ring-${focusColor} focus:border-${focusColor} transition-all duration-200 pl-10 ${bgColor} ${textColor}`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="w-full max-w-md">
                {/* Header Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl text-center shadow-lg">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold">Create Account</h1>
                    <p className="text-blue-100 text-sm mt-2">Join us today and get started</p>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleRegister}
                    className="bg-white p-8 rounded-b-2xl shadow-2xl border border-gray-100"
                >
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                            <svg
                                className="w-5 h-5 text-red-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className={inputClass(
                                        "border-purple-300",
                                        "bg-purple-50",
                                        "text-purple-900",
                                        "purple-400"
                                    )}
                                />
                                <svg
                                    className="w-5 h-5 text-purple-400 absolute left-3 top-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={inputClass(
                                        "border-blue-300",
                                        "bg-blue-50",
                                        "text-blue-900",
                                        "blue-400"
                                    )}
                                />
                                <svg
                                    className="w-5 h-5 text-blue-400 absolute left-3 top-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                    className={inputClass(
                                        "border-green-300",
                                        "bg-green-50",
                                        "text-green-900",
                                        "green-400"
                                    )}
                                />
                                <svg
                                    className="w-5 h-5 text-green-400 absolute left-3 top-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className={inputClass(
                                        "border-pink-300",
                                        "bg-pink-50",
                                        "text-pink-900",
                                        "pink-400"
                                    )}
                                />
                                <svg
                                    className="w-5 h-5 text-pink-400 absolute left-3 top-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={inputClass(
                                        "border-indigo-300",
                                        "bg-indigo-50",
                                        "text-indigo-900",
                                        "indigo-400"
                                    )}
                                />
                                <svg
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="w-5 h-5 text-indigo-400 absolute right-3 top-3 cursor-pointer"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {showPassword ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.958 9.958 0 012.1-5.725m1.766 1.18A7.97 7.97 0 0012 5c5.523 0 10 4.477 10 10a9.958 9.958 0 01-2.1 5.725"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                        />
                                    )}
                                </svg>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className={inputClass(
                                        "border-yellow-300",
                                        "bg-yellow-50",
                                        "text-yellow-900",
                                        "yellow-400"
                                    )}
                                />
                                <svg
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="w-5 h-5 text-yellow-400 absolute right-3 top-3 cursor-pointer"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {showConfirmPassword ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.958 9.958 0 012.1-5.725m1.766 1.18A7.97 7.97 0 0012 5c5.523 0 10 4.477 10 10a9.958 9.958 0 01-2.1 5.725"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                        />
                                    )}
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-lg font-semibold mt-6 hover:from-blue-700 hover:to-indigo-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Creating Account...
                            </div>
                        ) : (
                            "Create Account"
                        )}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{" "}
                            <span
                                className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors duration-200"
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
