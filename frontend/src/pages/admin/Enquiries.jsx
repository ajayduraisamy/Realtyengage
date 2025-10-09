import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import {
    FaEnvelope,
    FaEdit,
    FaTrash,
    FaSearch,
    FaCheck,
    FaTimes,
    FaClock,
    FaPhone,
    FaUser,
    FaBuilding
} from "react-icons/fa";

export default function EnquiriesAdmin() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await API.get("/enquiries", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEnquiries(data);
        } catch (err) {
            console.error("Error fetching enquiries:", err);
            toast.error("Failed to fetch enquiries");
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
                `/enquiries/${id}/status`,
                { status: updatedStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Status updated!");
            setEditingId(null);
            fetchEnquiries();
        } catch (err) {
            console.error("Error updating status:", err);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/enquiries/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Enquiry deleted!");
            fetchEnquiries();
        } catch (err) {
            console.error("Error deleting enquiry:", err);
            toast.error("Failed to delete enquiry");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "from-yellow-500 to-amber-500";
            case "contacted": return "from-blue-500 to-cyan-500";
            case "closed": return "from-green-500 to-emerald-500";
            default: return "from-gray-500 to-gray-600";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending": return <FaClock className="text-yellow-500" />;
            case "contacted": return <FaPhone className="text-blue-500" />;
            case "closed": return <FaCheck className="text-green-500" />;
            default: return <FaClock className="text-gray-500" />;
        }
    };

    const filteredEnquiries = enquiries.filter(enquiry => {
        const matchesSearch =
            enquiry.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enquiry.project?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enquiry.number?.includes(searchTerm) ||
            enquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "All" || enquiry.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Loading Enquiries...
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
                            <FaEnvelope className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Enquiries
                            </h1>
                            <p className="text-blue-700">Manage customer enquiries</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {enquiries.length}
                        </div>
                        <div className="text-sm text-blue-600">Total Enquiries</div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
                        <input
                            type="text"
                            placeholder="Search by customer, project, phone, or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border-0 bg-purple-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none text-purple-900 font-semibold"
                    >
                        <option value="All">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            {/* Enquiries Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEnquiries.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaEnvelope className="text-4xl text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">No Enquiries Found</h3>
                        <p className="text-blue-700">
                            {searchTerm || statusFilter !== "All"
                                ? "No enquiries match your filters."
                                : "All enquiries are handled!"}
                        </p>
                    </div>
                ) : (
                    filteredEnquiries.map((enquiry) => (
                        <div
                            key={enquiry._id}
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
                                                {enquiry.customer?.name || "Unknown Customer"}
                                            </h3>
                                            <p className="text-sm text-blue-600">
                                                {new Date(enquiry.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(enquiry.status)} text-white text-xs font-bold flex items-center gap-1`}>
                                        {getStatusIcon(enquiry.status)}
                                        {enquiry.status}
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="mb-3">
                                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                                        <FaBuilding className="text-blue-500" />
                                        <span className="font-semibold">Project:</span>
                                    </div>
                                    <p className="text-blue-900 font-bold">{enquiry.project?.name || "N/A"}</p>
                                </div>

                                {/* Contact Info */}
                                <div className="mb-3">
                                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                                        <FaPhone className="text-blue-500" />
                                        <span className="font-semibold">Phone:</span>
                                    </div>
                                    <p className="text-blue-900">{enquiry.number}</p>
                                </div>

                                {/* Message */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                                        <FaEnvelope className="text-blue-500" />
                                        <span className="font-semibold">Message:</span>
                                    </div>
                                    <p className="text-blue-800 text-sm line-clamp-3">
                                        {enquiry.message}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {editingId === enquiry._id ? (
                                        <>
                                            <select
                                                value={updatedStatus}
                                                onChange={(e) => setUpdatedStatus(e.target.value)}
                                                className="flex-1 px-3 py-2 border-0 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900 font-semibold"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                            <button
                                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                                                onClick={() => handleUpdate(enquiry._id)}
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
                                                onClick={() => handleEdit(enquiry._id, enquiry.status)}
                                            >
                                                <FaEdit />
                                                Update
                                            </button>
                                            <button
                                                className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                                                onClick={() => handleDelete(enquiry._id)}
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
            {enquiries.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 text-center border-l-4 border-yellow-500">
                        <div className="text-2xl font-bold text-yellow-600">
                            {enquiries.filter(e => e.status === "pending").length}
                        </div>
                        <div className="text-yellow-700 font-semibold">Pending</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border-l-4 border-blue-500">
                        <div className="text-2xl font-bold text-blue-600">
                            {enquiries.filter(e => e.status === "contacted").length}
                        </div>
                        <div className="text-blue-700 font-semibold">Contacted</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 text-center border-l-4 border-green-500">
                        <div className="text-2xl font-bold text-green-600">
                            {enquiries.filter(e => e.status === "closed").length}
                        </div>
                        <div className="text-green-700 font-semibold">Closed</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 text-center border-l-4 border-purple-500">
                        <div className="text-2xl font-bold text-purple-600">
                            {enquiries.length}
                        </div>
                        <div className="text-purple-700 font-semibold">Total</div>
                    </div>
                </div>
            )}
        </div>
    );
}