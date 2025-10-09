import { useEffect, useState } from "react";
import API from "../../api/api"; // Axios instance

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem("token"); // admin token
            const { data } = await API.get("/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCustomers(data);
        } catch (err) {
            console.error("Error fetching customers:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading customers...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>

            <div className="bg-white shadow rounded p-4 overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Number</th>
                            <th className="p-2">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-2 text-center">
                                    No customers found.
                                </td>
                            </tr>
                        ) : (
                            customers.map((c) => (
                                <tr key={c._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{c.name}</td>
                                    <td className="p-2">{c.email}</td>
                                    <td className="p-2">{c.number}</td>
                                    <td className="p-2">{c.address}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
