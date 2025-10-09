import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    area: {
      type: String,
      required: [true, "Area is required"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["upcoming", "in-progress", "completed"],
      default: "upcoming",
    },
    features: {
      type: [String], 
    },

    priceRange: {
      type: String, 
    },

    location: {
      type: String,
    },
    image: {
      type: String, 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
