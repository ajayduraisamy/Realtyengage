import { useEffect, useState } from "react";
import API from "../../api/api"; // axios instance
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null); // For EMI modal

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await API.get("/projects", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProjects(data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                toast.error("Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleEnquire = (project) => {
        // Navigate or open enquiry form
        toast.success(`Enquiry for "${project.name}" clicked!`);
    };

    const handleBuy = (project) => {
        setSelectedProject(project);
    };

    const handleEMISelect = (amount) => {
        toast.success(`You selected EMI plan: ₹${amount} per month`);
        setSelectedProject(null); // close modal
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
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-48 object-cover mb-4 rounded"
                            />
                            <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                            <p><strong>Area:</strong> {project.area}</p>
                            <p><strong>Status:</strong> {project.status}</p>

                            <p className="mt-4">
                                <strong>Price:</strong> {project.
                                    priceRange}
                            </p>
                          
                            <p className="mt-4">
                                <strong>Location:</strong>{" "}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {project.location}
                                </a>
                            </p>

                            {/* Buttons */}
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

            {/* EMI Modal */}
            {selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80">
                        <h2 className="text-xl font-bold mb-4">Select EMI Plan</h2>
                        <p className="mb-4">Project: <strong>{selectedProject.name}</strong></p>
                        <div className="flex flex-col gap-2">
                            {[5000, 10000, 20000, 50000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => handleEMISelect(amount)}
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
        </div>
    );
}
