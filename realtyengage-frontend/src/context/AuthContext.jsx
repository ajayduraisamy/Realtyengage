import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            // Redirect based on role
            if (data.user.role === "admin") navigate("/admin/dashboard");
            else navigate("/customer/dashboard");
        } catch (err) {
            throw err.response?.data?.message || "Login failed";
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
