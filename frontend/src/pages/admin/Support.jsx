import { useEffect, useState } from "react";
import API from "../../api/api";
import {
    FaHeadset,
    FaEdit,
    FaTrash,
    FaSearch,
    FaCheck,
    FaTimes,
    FaClock,
    FaCog,
    FaUser,
    FaEnvelope,
    FaComment
} from "react-icons/fa";

export default function Support() {
    const [supports, setSupports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

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
                `/support/${id}/status`,
                { status: updatedStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditingId(null);
            fetchSupport();
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
            fetchSupport();
        } catch (err) {
            console.error("Error deleting support:", err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "from-yellow-500 to-amber-500";
            case "In Progress": return "from-blue-500 to-cyan-500";
            case "Resolved": return "from-green-500 to-emerald-500";
            default: return "from-gray-500 to-gray-600";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending": return <FaClock className="text-yellow-500" />;
            case "In Progress": return <FaCog className="text-blue-500 animate-spin" />;
            case "Resolved": return <FaCheck className="text-green-500" />;
            default: return <FaClock className="text-gray-500" />;
        }
    };

    const filteredSupports = supports.filter(support => {
        const matchesSearch =
            support.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            support.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            support.message?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "All" || support.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Loading Support Requests...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                            <FaHeadset className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Support Requests
                            </h1>
                            <p className="text-blue-700">Manage customer support inquiries</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {supports.length} Total
                        </div>
                        <div className="text-sm text-blue-600">Support Requests</div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
                        <input
                            type="text"
                            placeholder="Search by customer, subject, or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="flex-1 px-4 py-3 border-0 bg-purple-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none text-purple-900 font-semibold"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Support Requests Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSupports.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaHeadset className="text-4xl text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">No Support Requests</h3>
                        <p className="text-blue-700">
                            {searchTerm || statusFilter !== "All"
                                ? "No requests match your filters."
                                : "All support requests are handled!"}
                        </p>
                    </div>
                ) : (
                    filteredSupports.map((support) => (
                        <div
                            key={support._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
                        >
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                            <FaUser />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-blue-900">
                                                {support.customer?.name || "Unknown Customer"}
                                            </h3>
                                            <p className="text-sm text-blue-600">
                                                {new Date(support.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(support.status)} text-white text-xs font-bold flex items-center gap-1`}>
                                        {getStatusIcon(support.status)}
                                        {support.status}
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="mb-3">
                                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                                        <FaEnvelope className="text-blue-500" />
                                        <span className="font-semibold">Subject:</span>
                                    </div>
                                    <p className="text-blue-900 font-bold text-lg">{support.subject}</p>
                                </div>

                                {/* Message */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                                        <FaComment className="text-blue-500" />
                                        <span className="font-semibold">Message:</span>
                                    </div>
                                    <p className="text-blue-800 text-sm line-clamp-3">
                                        {support.message}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {editingId === support._id ? (
                                        <>
                                            <select
                                                value={updatedStatus}
                                                onChange={(e) => setUpdatedStatus(e.target.value)}
                                                className="flex-1 px-3 py-2 border-0 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900 font-semibold"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                            <button
                                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                                                onClick={() => handleUpdate(support._id)}
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                                                onClick={() => setEditingId(null)}
                                            >
                                                <FaTimes />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                                                onClick={() => handleEdit(support._id, support.status)}
                                            >
                                                <FaEdit />
                                                Update Status
                                            </button>
                                            <button
                                                className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                                                onClick={() => handleDelete(support._id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Stats Summary */}
            {supports.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 text-center border-l-4 border-yellow-500">
                        <div className="text-2xl font-bold text-yellow-600">
                            {supports.filter(s => s.status === "Pending").length}
                        </div>
                        <div className="text-yellow-700 font-semibold">Pending</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border-l-4 border-blue-500">
                        <div className="text-2xl font-bold text-blue-600">
                            {supports.filter(s => s.status === "In Progress").length}
                        </div>
                        <div className="text-blue-700 font-semibold">In Progress</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 text-center border-l-4 border-green-500">
                        <div className="text-2xl font-bold text-green-600">
                            {supports.filter(s => s.status === "Resolved").length}
                        </div>
                        <div className="text-green-700 font-semibold">Resolved</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 text-center border-l-4 border-purple-500">
                        <div className="text-2xl font-bold text-purple-600">
                            {supports.length}
                        </div>
                        <div className="text-purple-700 font-semibold">Total</div>
                    </div>
                </div>
            )}
        </div>
    );
}