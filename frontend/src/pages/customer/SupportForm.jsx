import { useState } from "react";
import API from "../../api/api"; // your axios instance

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
       
            <div className="p-6 max-w-md w-full bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Submit Support Request</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select request type</option>
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
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                        rows="5"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
      
    );
}
