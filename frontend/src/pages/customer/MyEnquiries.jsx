import { useEffect, useState } from "react";
import API from "../../api/api"; // Axios instance
import {
    FaEnvelope,
    FaClock,
    FaCheckCircle,
    FaPhoneAlt,
    FaBuilding,
    FaCalendarDay,
    FaCommentDots
} from "react-icons/fa";

export default function MyEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await API.get("/enquiries/my", {
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

    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-700",
                icon: <FaClock className="text-orange-500 dark:text-orange-300" />,
                label: "Pending Review"
            },
            contacted: {
                color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700",
                icon: <FaPhoneAlt className="text-blue-500 dark:text-blue-300" />,
                label: "Contacted"
            },
            closed: {
                color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700",
                icon: <FaCheckCircle className="text-green-500 dark:text-green-300" />,
                label: "Resolved"
            }
        };
        return configs[status] || configs.pending;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Loading your enquiries...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-xl">
                            <FaEnvelope className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Enquiries</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Track all your property enquiries</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {enquiries.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaEnvelope className="text-3xl text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No Enquiries Yet</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                            You haven't made any enquiries yet. Start by exploring our premium properties.
                        </p>
                        <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors shadow-sm">
                            Browse Properties
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {enquiries.map((enquiry) => {
                            const statusConfig = getStatusConfig(enquiry.status);

                            return (
                                <div key={enquiry._id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                                                    <FaBuilding className="text-lg text-indigo-600 dark:text-indigo-300" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                                        {enquiry.project?.name || "General Enquiry"}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-1">
                                                        <FaCalendarDay className="text-gray-400 dark:text-gray-300" />
                                                        {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`px-4 py-2 rounded-full border ${statusConfig.color} flex items-center gap-2 text-sm font-medium`}>
                                                {statusConfig.icon}
                                                {statusConfig.label}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3">
                                                <FaCommentDots className="text-gray-400 dark:text-gray-300" />
                                                <span className="font-medium">Your Message</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
                                                {enquiry.message}
                                            </p>
                                        </div>

                                        {/* Contact Info */}
                                        {enquiry.number && (
                                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900 rounded-lg p-3 border border-blue-100 dark:border-blue-700">
                                                <FaPhoneAlt className="text-blue-500 dark:text-blue-300" />
                                                <span className="font-medium">Contact:</span>
                                                <span>{enquiry.number}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Summary Cards */}
                {enquiries.length > 0 && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                            <div className="text-3xl font-bold text-indigo-600 mb-2">{enquiries.length}</div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">Total Enquiries</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                            <div className="text-3xl font-bold text-orange-600 dark:text-orange-300 mb-2">
                                {enquiries.filter(e => e.status === 'pending').length}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">Pending</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-300 mb-2">
                                {enquiries.filter(e => e.status === 'closed').length}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">Resolved</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
