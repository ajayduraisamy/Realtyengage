// src/pages/customer/Profile.jsx
import { useState, useEffect } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";

export default function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await API.get("/customers/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile({
                name: data.name,
                email: data.email,
                number: data.number || "",
                address: data.address || "",
            });
        } catch (err) {
            console.error("Error fetching profile:", err);
            toast.error("Failed to fetch profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const token = localStorage.getItem("token");
            const { data } = await API.put("/customers/profile", profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile({
                name: data.name,
                email: data.email,
                number: data.number || "",
                address: data.address || "",
            });
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading)
        return <p className="text-center mt-10 text-gray-700 dark:text-gray-200">Loading profile...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
                    My Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Phone Number</label>
                        <input
                            type="text"
                            name="number"
                            value={profile.number}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Address</label>
                        <textarea
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 hover:from-pink-500 hover:to-purple-500 dark:hover:from-pink-600 dark:hover:to-purple-600 transition-all duration-300 disabled:opacity-60"
                    >
                        {updating ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}
