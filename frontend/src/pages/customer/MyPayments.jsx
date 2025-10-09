import { useEffect, useState } from "react";

import API from "../../api/api"; // axios instance

export default function MyPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await API.get("/payments", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPayments(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    return (
        <div>
          
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">My Payments</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : payments.length === 0 ? (
                    <p>No payments found.</p>
                ) : (
                    <div className="space-y-4">
                        {payments.map((payment) => (
                            <div key={payment._id} className="p-4 border rounded shadow-sm">
                                <p><strong>Project:</strong> {payment.project?.name || "N/A"}</p>
                                <p><strong>Amount:</strong> ₹{payment.amount}</p>
                                <p><strong>Status:</strong> {payment.status}</p>
                                <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
