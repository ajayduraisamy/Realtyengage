import { useEffect, useState } from "react";
import API from "../../api/api";
import { FaRupeeSign, FaUser, FaCheckCircle, FaClock } from "react-icons/fa";

export default function AdminPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const { data } = await API.get("/payments/admin", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(data);
        } catch (err) {
            console.error("Error fetching payments:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold">Loading Payments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Payments Dashboard</h1>

            {payments.length === 0 ? (
                <div className="text-center text-blue-700">
                    No payments recorded yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payments.map((p) => (
                        <div key={p._id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">{p.customer.name}</h3>
                            <div className="text-sm text-blue-700 mb-2 flex items-center gap-2">
                                <FaUser /> {p.customer.email}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-blue-700">Project:</span> {p.project.name}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaRupeeSign className="text-green-500" />
                                <span className="font-semibold text-green-700">Paid:</span> {p.paidAmount}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaRupeeSign className="text-yellow-500" />
                                <span className="font-semibold text-yellow-700">Pending:</span> {p.pendingAmount}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Plan:</span> {p.plan}
                            </div>
                            <div className="mt-2">
                                {p.status === "paid" ? (
                                    <span className="text-green-600 font-bold flex items-center gap-1">
                                        <FaCheckCircle /> Paid
                                    </span>
                                ) : (
                                    <span className="text-yellow-600 font-bold flex items-center gap-1">
                                        <FaClock /> {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
