import { useEffect, useState } from "react";
import API from "../../api/api";
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
                const token = localStorage.getItem("token");
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
        return (
            <div className="flex justify-center items-center h-[80vh] bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white text-xl font-semibold animate-pulse">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white p-8">
            <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
                Admin Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard title="Total Customers" value={stats.totalCustomers} color="from-cyan-400 to-blue-500" />
                <DashboardCard title="Total Projects" value={stats.totalProjects} color="from-green-400 to-emerald-500" />
                <DashboardCard title="Total Enquiries" value={stats.totalEnquiries} color="from-purple-400 to-indigo-500" />
                <DashboardCard title="Total Payments" value={stats.totalPayments} color="from-pink-400 to-rose-500" />
                <DashboardCard title="Total Revenue" value={`Rs.${stats.totalRevenue}`} color="from-yellow-400 to-orange-500" />
                <DashboardCard title="Total Support Requests" value={stats.totalSupport} color="from-red-400 to-pink-500" />
            </div>
        </div>
    );
}
