// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ProjectsAdmin from "./pages/admin/Projects";
import Customers from "./pages/admin/Customers";
import EnquiriesAdmin from "./pages/admin/Enquiries";
import PaymentsAdmin from "./pages/admin/Payments";
import SupportAdmin from "./pages/admin/Support";

// Customer Pages
import Home from "./pages/customer/Home";
import Projects from "./pages/customer/Projects";
import MyEnquiries from "./pages/customer/MyEnquiries";
import MyPayments from "./pages/customer/MyPayments";
import SupportForm from "./pages/customer/SupportForm";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Simple auth check (token + role)
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // save role at login
  if (!token) return <Navigate to="/login" />;
  if (role && role !== userRole) return <Navigate to={`/${userRole}`} />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="customers" element={<Customers />} />
          <Route path="enquiries" element={<EnquiriesAdmin />} />
          <Route path="payments" element={<PaymentsAdmin />} />
          <Route path="support" element={<SupportAdmin />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/customer/*"
          element={
            <ProtectedRoute role="customer">
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="enquiries" element={<MyEnquiries />} />
          <Route path="payments" element={<MyPayments />} />
          <Route path="support" element={<SupportForm />} />
        </Route>

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
