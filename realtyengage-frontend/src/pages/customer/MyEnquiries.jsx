import { useEffect, useState } from "react";

import API from "../../api/api";

export default function MyEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await API.get("/enquiries", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEnquiries(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    return (
        <div>
          
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">My Enquiries</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : enquiries.length === 0 ? (
                    <p>No enquiries found.</p>
                ) : (
                    <div className="space-y-4">
                        {enquiries.map((enq) => (
                            <div key={enq._id} className="p-4 border rounded shadow-sm">
                                <p><strong>Project:</strong> {enq.project?.name || "N/A"}</p>
                                <p><strong>Status:</strong> {enq.status}</p>
                                <p><strong>Message:</strong> {enq.message}</p>
                                <p><strong>Date:</strong> {new Date(enq.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
