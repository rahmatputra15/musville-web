import { Head, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Dashboard = () => {
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post("/logout");
    };
    const [animateProgress, setAnimateProgress] = useState(false);

    useEffect(() => {
        // Trigger progress bar animation after component mounts
        const timer = setTimeout(() => {
            setAnimateProgress(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);
    const stats = [
        {
            name: "Total Projects",
            value: "24",
            change: "+12%",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                </svg>
            ),
        },
        {
            name: "Active Users",
            value: "1,234",
            change: "+8%",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                </svg>
            ),
        },
        {
            name: "Revenue",
            value: "$45.2K",
            change: "+23%",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
        {
            name: "Completion Rate",
            value: "94%",
            change: "+5%",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
    ];

    const recentProjects = [
        {
            name: "Villa Seaside Resort",
            status: "In Progress",
            progress: 75,
            date: "Dec 10, 2025",
        },
        {
            name: "Commercial Plaza Downtown",
            status: "Planning",
            progress: 30,
            date: "Dec 8, 2025",
        },
        {
            name: "Elite Residential Complex",
            status: "Completed",
            progress: 100,
            date: "Dec 5, 2025",
        },
    ];

    return (
        <>
            <Head title="Dashboard - Musville">
                <meta
                    name="description"
                    content="Musville Dashboard - Manage your projects and properties"
                />
            </Head>

            <DashboardLayout activePage="/admin/dashboard">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-amber-400 mb-2">
                        Welcome back, Admin
                    </h1>
                    <p className="text-gray-400">
                        Here's what's happening with your projects today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.name}
                            className="bg-gray-900/80 backdrop-blur-xl border border-amber-500/30 rounded-xl p-6 shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400">
                                    {stat.icon}
                                </div>
                                <span className="text-green-400 text-sm font-semibold">
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-400 text-sm mb-1">
                                {stat.name}
                            </h3>
                            <p className="text-3xl font-bold text-white">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Recent Projects */}
                <div className="bg-gray-900/80 backdrop-blur-xl border border-amber-500/30 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-amber-400">
                            Recent Projects
                        </h2>
                        <button className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
                            View All →
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentProjects.map((project, index) => (
                            <div
                                key={project.name}
                                className="bg-black/50 border border-amber-500/20 rounded-lg p-4 hover:border-amber-500/40 transition"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="text-white font-semibold">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {project.date}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            project.status === "Completed"
                                                ? "bg-green-500/20 text-green-400"
                                                : project.status ===
                                                  "In Progress"
                                                ? "bg-blue-500/20 text-blue-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div
                                        className="bg-linear-to-r from-amber-500 to-yellow-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: animateProgress
                                                ? `${project.progress}%`
                                                : "0%",
                                        }}
                                    />
                                </div>
                                <p className="text-right text-gray-400 text-sm mt-1">
                                    {project.progress}%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
