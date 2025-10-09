import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FaUsers,
    FaTrash,
    FaSearch,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaEye,
    FaEdit,
    FaPlus,
    FaUserCircle
} from "react-icons/fa";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await API.get("/customers", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCustomers(data);
        } catch (err) {
            console.error("Error fetching customers:", err);
            toast.error("Failed to load customers.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this customer?")) return;

        try {
            setDeletingId(id);
            const token = localStorage.getItem("token");
            await API.delete(`/customers/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCustomers(customers.filter((c) => c._id !== id));
            toast.success("Customer deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete customer.");
        } finally {
            setDeletingId(null);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.number?.includes(searchTerm) ||
        customer.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Loading Customers...
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
                            <FaUsers className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Customers
                            </h1>
                            <p className="text-blue-700">Manage your customer database</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {customers.length}
                        </div>
                        <div className="text-sm text-blue-600">Total Customers</div>
                    </div>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 w-full">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
                        <input
                            type="text"
                            placeholder="Search customers by name, email, phone, or address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900"
                        />
                    </div>
                    
                </div>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaUsers className="text-4xl text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">No Customers Found</h3>
                        <p className="text-blue-700 mb-6">
                            {searchTerm ? "No customers match your search criteria." : "Get started by adding your first customer."}
                        </p>
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                            <FaPlus className="inline mr-2" />
                            Add New Customer
                        </button>
                    </div>
                ) : (
                    filteredCustomers.map((customer) => (
                        <div
                            key={customer._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
                        >
                            <div className="p-6">
                                {/* Customer Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {customer.name?.charAt(0).toUpperCase() || <FaUserCircle />}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-blue-900">
                                                {customer.name}
                                            </h3>
                                            <p className="text-blue-600 text-sm">
                                                Joined {new Date(customer.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-3 text-blue-700">
                                        <FaEnvelope className="text-blue-500 flex-shrink-0" />
                                        <span className="text-sm truncate">{customer.email}</span>
                                    </div>
                                    {customer.number && (
                                        <div className="flex items-center gap-3 text-blue-700">
                                            <FaPhone className="text-blue-500 flex-shrink-0" />
                                            <span className="text-sm">{customer.number}</span>
                                        </div>
                                    )}
                                    {customer.address && (
                                        <div className="flex items-center gap-3 text-blue-700">
                                            <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                            <span className="text-sm line-clamp-2">{customer.address}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Stats (if available) */}
                                {(customer.totalProjects || customer.totalEnquiries || customer.totalPayments) && (
                                    <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-blue-50 rounded-xl">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-blue-600">
                                                {customer.totalProjects || 0}
                                            </div>
                                            <div className="text-xs text-blue-500">Projects</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-purple-600">
                                                {customer.totalEnquiries || 0}
                                            </div>
                                            <div className="text-xs text-purple-500">Enquiries</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-green-600">
                                                {customer.totalPayments || 0}
                                            </div>
                                            <div className="text-xs text-green-500">Payments</div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    
                                    <button
                                        onClick={() => handleDelete(customer._id)}
                                        disabled={deletingId === customer._id}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaTrash />
                                        {deletingId === customer._id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

           
        </div>
    );
}