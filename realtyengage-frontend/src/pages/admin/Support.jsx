import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Support() {
    const [supports, setSupports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSupport();
    }, []);

    const fetchSupport = async () => {
        try {
            const token = localStorage.getItem("token"); // admin token
            const { data } = await API.get("/support", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSupports(data);
        } catch (err) {
            console.error("Error fetching support requests:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading support requests...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Support Requests</h1>

            <div className="bg-white shadow rounded p-4 overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="p-2">Customer</th>
                            <th className="p-2">Subject</th>
                            <th className="p-2">Message</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supports.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-2 text-center">
                                    No support requests found.
                                </td>
                            </tr>
                        ) : (
                            supports.map((s) => (
                                <tr key={s._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{s.customer?.name || "N/A"}</td>
                                    <td className="p-2">{s.subject}</td>
                                    <td className="p-2">{s.message}</td>
                                    <td className="p-2">{s.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
