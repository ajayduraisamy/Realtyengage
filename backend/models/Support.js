import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
    },
    email: {
      type: String,
      required: [true, "Customer email is required"],
    },
    number: {
      type: String,
      required: [true, "Customer phone number is required"],
    },
    requestType: {
      type: String,
      enum: ["Feedback", "Grievance", "Suggestion"],
      required: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);
export default Support;
