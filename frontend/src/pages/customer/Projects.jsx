import { useEffect, useState } from "react";
import API from "../../api/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modals & payment state
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await API.get("/projects", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProjects(data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Step 1: User selects Buy → choose EMI plan
    const handleBuy = (project) => {
        setSelectedProject(project);
        setSelectedPlan(0);
        setPaymentMethod("");
    };

    // Step 2: User selects EMI plan → show payment details
    const handlePlanSelect = (amount) => {
        setSelectedPlan(amount);
    };

    // Step 3: Make initial payment
    const handlePayment = async () => {
        if (!selectedPlan || !paymentMethod) {
            toast.error("Select EMI plan and payment method");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const { data } = await API.post(
                "/payments",
                {
                    projectId: selectedProject._id,
                    plan: `${selectedPlan}/month`,
                    paidAmount: selectedPlan,
                    paymentMethod,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success(`Payment successful! ₹${selectedPlan} paid`);
            // Close modal & reset state
            setSelectedProject(null);
            setSelectedPlan(0);
            setPaymentMethod("");
        } catch (err) {
            console.error(err);
            toast.error("Payment failed");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading projects...</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>

            {projects.length === 0 ? (
                <p>No projects available.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="p-4 border rounded-xl shadow-lg hover:shadow-xl transition relative"
                        >
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                            )}
                            <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                            <p><strong>Area:</strong> {project.area}</p>
                            <p><strong>Status:</strong> {project.status}</p>
                            <p className="mt-4"><strong>Price:</strong> {project.priceRange}</p>
                            <p className="mt-2">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                                >
                                    <FaMapMarkerAlt size={20} /> Location
                                </a>
                            </p>

                            <div className="flex gap-3 mt-4">
                                <Link to="/customer/enquery" className="flex-1">
                                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                                        Enquire
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleBuy(project)}
                                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* EMI Plan Modal */}
            {selectedProject && !selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80">
                        <h2 className="text-xl font-bold mb-4">Select EMI Plan</h2>
                        <p className="mb-4">Project: <strong>{selectedProject.name}</strong></p>
                        <div className="flex flex-col gap-2">
                            {[5000, 10000, 20000, 50000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => handlePlanSelect(amount)}
                                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                                >
                                    ₹{amount} / month
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="mt-4 w-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Payment Details Modal */}
            {selectedProject && selectedPlan > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80">
                        <h2 className="text-xl font-bold mb-4">Enter Payment Details</h2>
                        <p className="mb-2">Project: <strong>{selectedProject.name}</strong></p>
                        <p className="mb-2">EMI Plan: <strong>₹{selectedPlan}/month</strong></p>

                        <select
                            className="w-full p-2 rounded mb-3"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">Select Payment Method</option>
                            <option value="card">Card</option>
                            <option value="upi">UPI</option>
                        </select>

                        <button
                            onClick={handlePayment}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        >
                            Pay ₹{selectedPlan}
                        </button>

                        <button
                            onClick={() => setSelectedProject(null)}
                            className="mt-3 w-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
