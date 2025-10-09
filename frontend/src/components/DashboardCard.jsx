export default function DashboardCard({ title, value, color }) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl shadow-lg p-6 text-center bg-gradient-to-br ${color} transform transition duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
        >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <h2 className="text-lg font-semibold mb-2 text-gray-100 tracking-wide uppercase">
                {title}
            </h2>
            <p className="text-4xl font-extrabold text-white drop-shadow-md">
                {value}
            </p>
            <div className="mt-3 h-1 w-16 bg-white/70 mx-auto rounded-full animate-pulse"></div>
        </div>
    );
}
