import User from "../models/User.js";

// @desc    Get all customers (Admin only)
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
};

// @desc    Get single customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select("-password");
    if (!customer || customer.role !== "customer") {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error: error.message });
  }
};

// @desc    Update customer details
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error: error.message });
  }
};

// @desc    Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await User.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error: error.message });
  }
};


export const getProfile = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id).select("-password");
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

// Update logged-in customer profile
export const updateProfile = async (req, res) => {
  try {
    const updatedCustomer = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};