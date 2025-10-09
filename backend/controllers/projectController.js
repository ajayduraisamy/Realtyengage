import Project from "../models/Project.js";

// @desc    Create new project (Admin only)
export const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.user._id, 
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error: error.message });
  }
};

// @desc    Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email role");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};

// @desc    Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("createdBy", "name email role");

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error: error.message });
  }
};

// @desc    Update project (Admin only)
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProject) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};

// @desc    Delete project (Admin only)
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};
