import { useState } from "react";
import API from "../../api/api";

export default function SupportForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [requestType, setRequestType] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token");
            await API.post(
                "/support",
                { name, email, number, requestType, subject, message },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Support request submitted successfully!");
            
            setName("");
            setEmail("");
            setNumber("");
            setRequestType("");
            setSubject("");
            setMessage("");
        } catch (err) {
            setError(err.response?.data?.message || "Error submitting support request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
                    Submit Support Request
                </h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    />

                    <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    >
                        <option value="">Select Request Type</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Grievance">Grievance</option>
                        <option value="Suggestion">Suggestion</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    />

                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows="5"
                        className="w-full p-3 rounded-lg border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 hover:from-pink-500 hover:to-purple-500 dark:hover:from-pink-600 dark:hover:to-purple-600 transition-all duration-300 disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
