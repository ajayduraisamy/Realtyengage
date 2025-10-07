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

    // -----------------------------
    // 🔹 Normal Email/Password Login
    // -----------------------------
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await API.post("/auth/login", { email, password });

            // Save token and role
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            // Redirect based on role
            if (data.role === "admin") navigate("/admin/dashboard");
            else navigate("/customer/home");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------
    // 🔹 Google Login Success
    // -----------------------------
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            const res = await axios.post("http://localhost:5000/api/auth/google-login", {
                email: decoded.email,
                name: decoded.name,
            });

            console.log("Login success:", res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            navigate("/customer/home");
        } catch (err) {
            console.error("Google login failed:", err);
            setError("Google login failed. Please try again.");
        }
    };

    // -----------------------------
    // 🔹 Google Login Error
    // -----------------------------
    const handleGoogleError = () => {
        setError("Google Sign-In failed. Please try again.");
    };

    // -----------------------------
    // 🔹 UI
    // -----------------------------
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm mt-4 text-center">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-700 cursor-pointer"
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
