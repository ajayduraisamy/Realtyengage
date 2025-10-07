import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        area: "",
        description: "",
        status: "upcoming",
        features: "",
        priceRange: "",
        image: "",
    });
    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get("/projects", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjects(data);
        } catch (err) {
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/projects/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await API.post("/projects", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setFormData({
                name: "",
                area: "",
                description: "",
                status: "upcoming",
                features: "",
                priceRange: "",
                image: "",
            });
            setEditingId(null);
            fetchProjects();
        } catch (err) {
            console.error("Error submitting project:", err);
        }
    };

    const handleEdit = (project) => {
        setFormData({
            name: project.name,
            area: project.area,
            description: project.description,
            status: project.status,
            features: project.features.join(", "),
            priceRange: project.priceRange,
            image: project.image,
        });
        setEditingId(project._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await API.delete(`/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProjects();
        } catch (err) {
            console.error("Error deleting project:", err);
        }
    };

    if (loading)
        return (
            <p className="text-center mt-10 text-gray-600 text-lg">Loading projects...</p>
        );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Projects</h1>

            {/* Create / Edit Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto mb-8 border border-gray-200"
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center mt-4 ">
                    {editingId ? "Edit Project" : "Create Project"}
                </h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Project Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="area"
                        placeholder="Area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    ></textarea>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="upcoming">Upcoming</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input
                        type="text"
                        name="features"
                        placeholder="Features (comma separated)"
                        value={formData.features}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="priceRange"
                        placeholder="Price Range"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
                    >
                        {editingId ? "Update Project" : "Create Project"}
                    </button>
                </div>
            </form>

            {/* Projects Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Area</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No projects found.
                                </td>
                            </tr>
                        ) : (
                            projects.map((p) => (
                                <tr key={p._id} className="hover:bg-gray-50 transition">
                                    <td className="p-3">{p.name}</td>
                                    <td className="p-3">{p.area}</td>
                                    <td className="p-3 capitalize">{p.status}</td>
                                    <td className="p-3 text-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"
                                        >
                                            Delete
                                        </button>
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
