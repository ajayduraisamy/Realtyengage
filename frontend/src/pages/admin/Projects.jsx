import { useEffect, useState } from "react";
import API from "../../api/api";
import MapPicker from "../../components/MapPicker";


import {
    FaBuilding,
    FaEdit,
    FaTrash,
    FaPlus,
    FaMapMarkerAlt,
    FaRupeeSign ,
    FaList,
    FaImage,
    FaCheckCircle,
    FaClock,
    FaCog,
    FaTimes
} from "react-icons/fa";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        area: "",
        location: "",
        description: "",
        status: "upcoming",
        features: "",
        priceRange: "",
        image: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem("token");
    console.log(JSON.parse(atob(token.split('.')[1])));

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
                location: "",
                description: "",
                status: "upcoming",
                features: "",
                priceRange: "",
                image: "",
            });
            setEditingId(null);
            setShowForm(false);
            fetchProjects();
            console.error("Error submitting project:", err.response?.data || err.message);

        } catch (err) {
            console.error("Error submitting project:", err);
        }
    };

    const handleEdit = (project) => {
        setFormData({
            name: project.name,
            area: project.area,
            location: project.location,
            description: project.description,
            status: project.status,
            features: project.features.join(", "),
            priceRange: project.priceRange,
            image: project.image,
        });
        setEditingId(project._id);
        setShowForm(true);
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

    const getStatusColor = (status) => {
        switch (status) {
            case "upcoming": return "from-yellow-500 to-amber-500";
            case "in-progress": return "from-blue-500 to-cyan-500";
            case "completed": return "from-green-500 to-emerald-500";
            default: return "from-gray-500 to-gray-600";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "upcoming": return <FaClock className="text-yellow-500" />;
            case "in-progress": return <FaCog className="text-blue-500 animate-spin" />;
            case "completed": return <FaCheckCircle className="text-green-500" />;
            default: return <FaClock className="text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Loading Projects...
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
                            <FaBuilding className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Projects
                            </h1>
                            <p className="text-blue-700">Manage your real estate projects</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {projects.length}
                        </div>
                        <div className="text-sm text-blue-600">Total Projects</div>
                    </div>
                </div>
            </div>

            {/* Toggle Form Button */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setFormData({
                            name: "",
                            area: "",
                            location: "",
                            description: "",
                            status: "upcoming",
                            features: "",
                            priceRange: "",
                            image: "",
                        });
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    {showForm ? <FaTimes /> : <FaPlus />}
                    {showForm ? "Cancel" : "Add New Project"}
                </button>
            </div>

            {/* Create / Edit Form */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-blue-500 transform animate-fade-in-up">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
                        {editingId ? "Edit Project" : "Create New Project"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                    <FaBuilding />
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter project name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                    <FaMapMarkerAlt />
                                    Area
                                </label>
                                <input
                                    type="text"
                                    name="area"
                                    placeholder="Enter area in square meters"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="w-full p-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900"
                                    required
                                />
                            </div>

                            


                            <div>
                                <label className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                    <FaRupeeSign  />
                                    Price Range
                                </label>
                                <input
                                    type="text"
                                    name="priceRange"
                                    placeholder="e.g. Rs.500000"
                                    value={formData.priceRange}
                                    onChange={handleChange}
                                    className="w-full p-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900 font-semibold"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                    Description
                                </label>
                                <input
                                    name="description"
                                    placeholder="Enter project description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900 "
                                   
                                ></input>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                    <FaList />
                                    Features
                                </label>
                                <input
                                    type="text"
                                    name="features"
                                    placeholder="Swimming pool, Gym, Garden (comma separated)"
                                    value={formData.features}
                                    onChange={handleChange}
                                    className="w-full p-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                    <FaImage />
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Enter image URL"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full p-3 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                <FaMapMarkerAlt />
                                Project Location (Select on Map)
                            </label>

                            <MapPicker
                                selectedLocation={
                                    formData.latitude && formData.longitude
                                        ? [formData.latitude, formData.longitude]
                                        : null
                                }
                                onSelectLocation={({ lat, lng }) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        latitude: lat,
                                        longitude: lng,
                                        location: ` ${lat.toFixed(4)},  ${lng.toFixed(4)}`,
                                    }))
                                }
                            />

                            {formData.location && (
                                <p className="mt-2 text-sm text-blue-700 font-medium">
                                    📍 Selected: {formData.location}
                                </p>
                            )}
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                {editingId ? "Update Project" : "Create Project"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaBuilding className="text-4xl text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">No Projects Found</h3>
                        <p className="text-blue-700 mb-6">
                            Get started by creating your first project.
                        </p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
                        >
                            {/* Project Image */}
                            {project.image && (
                                <div className="h-48 overflow-hidden rounded-t-2xl">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-blue-900 truncate">
                                        {project.name}
                                    </h3>
                                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(project.status)} text-white text-xs font-bold flex items-center gap-1`}>
                                        {getStatusIcon(project.status)}
                                        {project.status.replace("-", " ")}
                                    </div>
                                </div>

                                
                                <div className="flex items-center gap-2 text-blue-700 mb-3">
                                    <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                    <span className="text-sm">{project.area}</span>
                                </div>

                                <div className="flex items-center gap-2 text-blue-700 mb-3">
                                    <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                    <span className="text-sm">{project.location}</span>
                                </div>

                                {/* Price */}
                                {project.priceRange && (
                                    <div className="flex items-center gap-2 text-green-600 mb-3">
                                        <FaRupeeSign  className="text-green-500" />
                                        <span className="font-semibold">{project.priceRange}</span>
                                    </div>
                                )}

                             
                               
                                {/* Features */}
                                {project.features && project.features.length > 0 && (
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 text-blue-700 mb-2">
                                            <FaList className="text-blue-500" />
                                            <span className="text-sm font-semibold">Features:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {project.features.slice(0, 3).map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                            {project.features.length > 3 && (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                                    +{project.features.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                                    >
                                        <FaEdit />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Stats Summary */}
            {projects.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border-l-4 border-blue-500">
                        <div className="text-2xl font-bold text-blue-600">
                            {projects.length}
                        </div>
                        <div className="text-blue-700 font-semibold">Total Projects</div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 text-center border-l-4 border-yellow-500">
                        <div className="text-2xl font-bold text-yellow-600">
                            {projects.filter(p => p.status === "upcoming").length}
                        </div>
                        <div className="text-yellow-700 font-semibold">Upcoming</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 text-center border-l-4 border-purple-500">
                        <div className="text-2xl font-bold text-purple-600">
                            {projects.filter(p => p.status === "in-progress").length}
                        </div>
                        <div className="text-purple-700 font-semibold">In Progress</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 text-center border-l-4 border-green-500">
                        <div className="text-2xl font-bold text-green-600">
                            {projects.filter(p => p.status === "completed").length}
                        </div>
                        <div className="text-green-700 font-semibold">Completed</div>
                    </div>
                </div>
            )}
        </div>
    );
}