import { createContext, useState } from "react";
import { login, register } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const loginUser = async (email, password) => {
        const { data } = await login({ email, password });
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
    };

    const registerUser = async (userData) => {
        const { data } = await register(userData);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
