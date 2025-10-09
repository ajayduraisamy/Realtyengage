// src/pages/customer/Enquiry.jsx
import { useState, useEffect } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";

export default function Enquiry() {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        project: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get("/projects");
            setProjects(data);
        } catch (err) {
            console.error("Error fetching projects:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await API.post("/enquiries", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Enquiry submitted successfully!");
            setFormData({
                name: "",
                email: "",
                number: "",
                project: "",
                message: "",
            });
        } catch (err) {
            console.error("Error submitting enquiry:", err);
            toast.error("Failed to submit enquiry.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
            <div className="w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                    Submit Your Enquiry
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 space-y-5 transition-colors duration-500"
                >
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Phone Number</label>
                        <input
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Select Project</label>
                        <select
                            name="project"
                            value={formData.project}
                            onChange={handleChange}
                            required
                            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        >
                            <option value="">-- Select Project --</option>
                            {projects.map((proj) => (
                                <option key={proj._id} value={proj._id}>
                                    {proj.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                    >
                        {loading ? "Submitting..." : "Submit Enquiry"}
                    </button>
                </form>
            </div>
        </div>
    );
}
