import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Enquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const token = localStorage.getItem("token"); // admin token
            const { data } = await API.get("/enquiries", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEnquiries(data);
        } catch (err) {
            console.error("Error fetching enquiries:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading enquiries...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Enquiries</h1>

            <div className="bg-white shadow rounded p-4 overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="p-2">Customer</th>
                            <th className="p-2">Project</th>
                            <th className="p-2">Message</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-2 text-center">
                                    No enquiries found.
                                </td>
                            </tr>
                        ) : (
                            enquiries.map((e) => (
                                <tr key={e._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{e.customer?.name || "N/A"}</td>
                                    <td className="p-2">{e.project?.name || "N/A"}</td>
                                    <td className="p-2">{e.message}</td>
                                    <td className="p-2">{e.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
