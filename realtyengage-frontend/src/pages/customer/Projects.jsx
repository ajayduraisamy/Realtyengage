import { useEffect, useState } from "react";

import API from "../../api/api"; // axios instance

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token"); // customer token
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

        fetchProjects();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading projects...</p>;

    return (
        <div>
         

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Projects</h2>

                {projects.length === 0 ? (
                    <p>No projects available.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="p-4 border rounded shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="text-lg font-bold">{project.name}</h3>
                                <p>
                                    <strong>Area:</strong> {project.area}
                                </p>
                                <p>
                                    <strong>Status:</strong> {project.status}
                                </p>
                                <p>
                                    <strong>Created By:</strong> {project.createdBy?.name || "Admin"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
