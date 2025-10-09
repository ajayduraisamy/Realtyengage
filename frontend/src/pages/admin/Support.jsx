import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Support() {
    const [supports, setSupports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");

    useEffect(() => {
        fetchSupport();
    }, []);

    const fetchSupport = async () => {
        try {
            const token = localStorage.getItem("token");
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

    const handleEdit = (id, currentStatus) => {
        setEditingId(id);
        setUpdatedStatus(currentStatus);
    };

    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await API.put(
                `/support/${id}`,
                { status: updatedStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditingId(null);
            fetchSupport(); // refresh list
        } catch (err) {
            console.error("Error updating support:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this support request?")) return;
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/support/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchSupport(); // refresh list
        } catch (err) {
            console.error("Error deleting support:", err);
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
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supports.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-2 text-center">
                                    No support requests found.
                                </td>
                            </tr>
                        ) : (
                            supports.map((s) => (
                                <tr key={s._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{s.customer?.name || "N/A"}</td>
                                    <td className="p-2">{s.subject}</td>
                                    <td className="p-2">{s.message}</td>
                                    <td className="p-2">
                                        {editingId === s._id ? (
                                            <select
                                                className="border rounded px-2 py-1"
                                                value={updatedStatus}
                                                onChange={(e) => setUpdatedStatus(e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        ) : (
                                            s.status
                                        )}
                                    </td>
                                    <td className="p-2 flex gap-2">
                                        {editingId === s._id ? (
                                            <>
                                                <button
                                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                                    onClick={() => handleUpdate(s._id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                    onClick={() => handleEdit(s._id, s.status)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                    onClick={() => handleDelete(s._id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
