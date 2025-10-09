import Enquiry from "../models/Enquiry.js";
import Payment from "../models/Payment.js";
import Project from "../models/Project.js";
import Support from "../models/Support.js";
import User from "../models/User.js";

// @desc    Get dashboard stats (Admin only)
export const getDashboardStats = async (req, res) => {
  try {
    // Total customers
    const totalCustomers = await User.countDocuments({ role: "customer" });

    // Total projects
    const totalProjects = await Project.countDocuments();

    // Total enquiries
    const totalEnquiries = await Enquiry.countDocuments();

    // Total payments and revenue
   const payments = await Payment.find();
const totalPayments = payments.length;
const totalRevenue = payments.reduce((sum, p) => sum + p.paidAmount, 0);

    // Total support requests
    const totalSupport = await Support.countDocuments();

    res.status(200).json({
      totalCustomers,
      totalProjects,
      totalEnquiries,
      totalPayments,
      totalRevenue,
      totalSupport,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
};
