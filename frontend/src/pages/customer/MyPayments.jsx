import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import {
    FaCreditCard,
    FaRupeeSign,
    FaCalendar,
    FaCheckCircle,
    FaClock,
    FaTimes,
    FaWallet,
    FaReceipt,
    FaBuilding,
    FaMoneyCheck
} from "react-icons/fa";

export default function MyPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [payAmount, setPayAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await API.get("/payments/my", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch payments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handlePayEMI = (payment) => {
        setSelectedPayment(payment);
        // Default input = plan EMI amount
        setPayAmount(payment.planAmount);
        setPaymentMethod("");
    };


    const submitPayment = async () => {
        if (!payAmount || !paymentMethod) {
            toast.error("Enter amount and select payment method");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await API.put(
                "/payments/pay-monthly",
                {
                    paymentId: selectedPayment._id,
                    amount: payAmount,
                    paymentMethod,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success(`₹${payAmount} Paid Successfully`);
            setSelectedPayment(null);
            fetchPayments();
        } catch (err) {
            console.error(err);
            toast.error("Payment failed");
        }
    };

    const getStatusConfig = (status) => {
        const configs = {
            completed: {
                color: "bg-gradient-to-r from-green-500 to-emerald-500",
                icon: <FaCheckCircle className="text-white" />,
                bgColor: "bg-green-50 dark:bg-green-900/20"
            },
            pending: {
                color: "bg-gradient-to-r from-orange-500 to-amber-500",
                icon: <FaClock className="text-white" />,
                bgColor: "bg-orange-50 dark:bg-orange-900/20"
            },
            in_progress: {
                color: "bg-gradient-to-r from-blue-500 to-cyan-500",
                icon: <FaClock className="text-white" />,
                bgColor: "bg-blue-50 dark:bg-blue-900/20"
            }
        };
        return configs[status] || configs.pending;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">Loading your payments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
                                <FaCreditCard className="text-2xl text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    My Payments
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                                    Manage and track all your payment transactions
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-4">
                            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{payments.length}</div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm">Total Plans</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {payments.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FaCreditCard className="text-4xl text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Payments Found</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto text-lg">
                            You don't have any active payment plans yet.
                        </p>
                        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            Explore Projects
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {payments.map((payment) => {
                            const statusConfig = getStatusConfig(payment.status);
                            const progress = (payment.paidAmount / payment.totalAmount) * 100;

                            return (
                                <div
                                    key={payment._id}
                                    className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
                                                    <FaBuilding className="text-xl text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {payment.project.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-gray-500 dark:text-white text-sm mt-1">
                                                        <FaCalendar className="text-indigo-500" />
                                                        {payment.plan}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full ${statusConfig.color} bg-gradient-to-r from-indigo-100 to-purple-100 text-black text-xs font-bold dark:text-dark  flex items-center gap-1`}>
                                                {statusConfig.icon}
                                                {payment.status}
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                <span>Payment Progress</span>
                                                <span className="font-semibold">{Math.round(progress)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Amount Details */}
                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                                    ₹{payment.totalAmount}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                                            </div>
                                            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                                    ₹{payment.paidAmount}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Paid</div>
                                            </div>
                                            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                                    ₹{payment.pendingAmount}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
                                            </div>
                                        </div>

                                        {/* Pay Button */}
                                        {payment.pendingAmount > 0 && (
                                            <button
                                                onClick={() => handlePayEMI(payment)}
                                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                            >
                                                <FaMoneyCheck className="text-lg" />
                                                Pay EMI - ₹{payment.pendingAmount}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Summary Stats */}
                {payments.length > 0 && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Plans', value: payments.length, color: 'from-indigo-500 to-purple-500', icon: <FaReceipt /> },
                            { label: 'Total Paid', value: `₹${payments.reduce((sum, p) => sum + p.paidAmount, 0)}`, color: 'from-green-500 to-emerald-500', icon: <FaCheckCircle /> },
                            { label: 'Total Pending', value: `₹${payments.reduce((sum, p) => sum + p.pendingAmount, 0)}`, color: 'from-red-500 to-amber-500', icon: <FaClock /> },
                            { label: 'Completion', value: `${Math.round((payments.reduce((sum, p) => sum + p.paidAmount, 0) / payments.reduce((sum, p) => sum + p.totalAmount, 0)) * 100)}%`, color: 'from-blue-500 to-cyan-500', icon: <FaWallet /> }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="flex justify-center mb-3">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {selectedPayment && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <FaCreditCard className="text-indigo-600" />
                                Pay EMI
                            </h2>
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <FaTimes className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                                <p className="text-gray-700 dark:text-dark-300">
                                    <strong>Project:</strong> {selectedPayment.project.name}
                                </p>
                                <p className="text-gray-700 dark:text-dark-300">
                                    <strong>Pending Amount:</strong>
                                    <span className="text-orange-600 dark:text-orange-400 font-bold ml-2">
                                        ₹{selectedPayment.pendingAmount}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Amount to Pay (₹)
                                </label>
                                <div className="relative">
                                    <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="Enter amount to pay"
                                        value={payAmount}
                                        onChange={(e) => {
                                            let val = Number(e.target.value);
                                            if (val < 1) val = 1;
                                            if (val > selectedPayment.pendingAmount) val = selectedPayment.pendingAmount;
                                            setPayAmount(val);
                                        }}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 dark:text-white"
                                    />

                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Payment Method
                                </label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 dark:text-white appearance-none"
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="card">Credit/Debit Card</option>
                                    <option value="upi">UPI</option>
                                   
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={submitPayment}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Pay ₹{payAmount}
                            </button>
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="px-6 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}