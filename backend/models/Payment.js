import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  plan: { type: String, required: true }, // e.g., "10k/month"
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  pendingAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["card", "upi"], required: true },
  status: { type: String, enum: ["pending", "partial", "paid"], default: "pending" },
  month: { type: Number, default: 0 }, // Number of months paid
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
