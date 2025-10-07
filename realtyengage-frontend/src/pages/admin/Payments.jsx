import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem("token"); // admin token
            const { data } = await API.get("/payments", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(data);
        } catch (err) {
            console.error("Error fetching payments:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading payments...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Payments</h1>

            <div className="bg-white shadow rounded p-4 overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="p-2">Customer</th>
                            <th className="p-2">Project</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-2 text-center">
                                    No payments found.
                                </td>
                            </tr>
                        ) : (
                            payments.map((p) => (
                                <tr key={p._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{p.customer?.name || "N/A"}</td>
                                    <td className="p-2">{p.project?.name || "N/A"}</td>
                                    <td className="p-2">₹{p.amount}</td>
                                    <td className="p-2">{p.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
