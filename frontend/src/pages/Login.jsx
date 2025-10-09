import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await API.post("/auth/login", { email, password });

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            if (data.role === "admin") navigate("/admin/dashboard");
            else navigate("/customer/home");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);

            // Send the decoded info to your backend
            const res = await axios.post(
                "http://localhost:5000/api/auth/google-login",
                {
                    email: decoded.email,
                    name: decoded.name,
                }
            );

            // Save token and role
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            // Redirect based on role
            if (res.data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/customer/home");
            }
        } catch (err) {
            console.error("Google login failed:", err);
            setError("Google login failed. Please try again.");
        }
    };


    const handleGoogleError = () => {
        setError("Google Sign-In failed. Please try again.");
    };

    const inputClass = (borderColor, bgColor, textColor, focusColor) =>
        `w-full p-3 border ${borderColor} rounded-lg focus:ring-2 focus:ring-${focusColor} focus:border-${focusColor} transition-all duration-200 pl-10 ${bgColor} ${textColor}`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <form className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md" onSubmit={handleLogin}>
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">Login</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-center">
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

                {/* Email */}
                <div className="relative mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={inputClass("border-blue-300", "bg-blue-50", "text-blue-900", "blue-400")}
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

                {/* Password */}
                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={inputClass("border-indigo-300", "bg-indigo-50", "text-indigo-900", "indigo-400")}
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 transition-all duration-200"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm mt-4 text-center">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-700 cursor-pointer hover:text-blue-900"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>

                <div className="mt-6 flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleError}
                        type="standard"
                        theme="filled_blue"
                        size="large"
                    />
                </div>
            </form>
        </div>
    );
}
