import Payment from "../models/Payment.js";

// @desc    Create a new payment (Customer)
export const createPayment = async (req, res) => {
  try {
    const payment = new Payment({
      ...req.body,
      customer: req.user._id,
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error: error.message });
  }
};

// @desc    Get all payments (Admin only)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("customer", "name email number")
      .populate("project", "name area status");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

// @desc    Get single payment by ID (Admin or Owner)
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("customer", "name email number")
      .populate("project", "name area status");

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (req.user.role !== "admin" && payment.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this payment" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error: error.message });
  }
};

// @desc    Update payment status (Admin only)
export const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = req.body.status || payment.status;
    await payment.save();

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error updating payment", error: error.message });
  }
};

// @desc    Delete payment (Admin only)
export const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error: error.message });
  }
};
