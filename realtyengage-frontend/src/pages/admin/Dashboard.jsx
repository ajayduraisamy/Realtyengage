import { useEffect, useState } from "react";
import API from "../../api/api"; // keep api.js simple, just axios instance
import DashboardCard from "../../components/DashboardCard";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalProjects: 0,
        totalEnquiries: 0,
        totalPayments: 0,
        totalRevenue: 0,
        totalSupport: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const token = localStorage.getItem("token"); // admin JWT token
                const { data } = await API.get("/admin/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(data);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading dashboard...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <DashboardCard title="Total Customers" value={stats.totalCustomers} />
            <DashboardCard title="Total Projects" value={stats.totalProjects} />
            <DashboardCard title="Total Enquiries" value={stats.totalEnquiries} />
            <DashboardCard title="Total Payments" value={stats.totalPayments} />
            <DashboardCard title="Total Revenue" value={`$${stats.totalRevenue}`} />
            <DashboardCard title="Total Support Requests" value={stats.totalSupport} />
        </div>
    );
}
