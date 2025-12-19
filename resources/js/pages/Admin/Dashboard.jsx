import { Head, usePage, router, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Dashboard = () => {
    const { auth, stats, recentProjects } = usePage().props;

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

    // Calculate percentages for content sections
    const totalContent =
        stats.bannerHeroes +
        stats.bannerPages +
        stats.partnerships +
        stats.commitments +
        stats.goals +
        stats.journeys;
    const contentDistribution = [
        {
            name: "Banner Heroes",
            value: stats.bannerHeroes,
            color: "bg-amber-500",
        },
        {
            name: "Banner Pages",
            value: stats.bannerPages,
            color: "bg-yellow-500",
        },
        {
            name: "Partnerships",
            value: stats.partnerships,
            color: "bg-orange-500",
        },
        { name: "Commitments", value: stats.commitments, color: "bg-red-500" },
        { name: "Company Goals", value: stats.goals, color: "bg-pink-500" },
        {
            name: "Journey Items",
            value: stats.journeys,
            color: "bg-purple-500",
        },
    ];

    const statsCards = [
        {
            name: "Total Projects",
            value: stats.projects,
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
            link: "/admin/projects",
        },
        {
            name: "Active Users",
            value: stats.users,
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
            link: "/admin/users",
        },
        {
            name: "Partnership Programs",
            value: stats.partnerships,
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
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                </svg>
            ),
            link: "/admin/partnership/programs",
        },
        {
            name: "Total Content",
            value: totalContent,
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
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                </svg>
            ),
        },
    ];

    // Project status distribution
    const projectStatusData = [
        {
            name: "Available",
            value: stats.availableProjects,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-500/20",
            textColor: "text-green-400",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
        {
            name: "Sold",
            value: stats.soldProjects,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-500/20",
            textColor: "text-blue-400",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
        {
            name: "Coming Soon",
            value: stats.comingSoonProjects,
            color: "from-yellow-500 to-yellow-600",
            bgColor: "bg-yellow-500/20",
            textColor: "text-yellow-400",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
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
                    {statsCards.map((stat, index) => (
                        <Link
                            key={stat.name}
                            href={stat.link || "#"}
                            className={`bg-gray-900/80 backdrop-blur-xl border border-amber-500/30 rounded-xl p-6 shadow-lg ${
                                stat.link
                                    ? "hover:border-amber-500/60 cursor-pointer transition-all"
                                    : ""
                            }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400">
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-gray-400 text-sm mb-1">
                                {stat.name}
                            </h3>
                            <p className="text-3xl font-bold text-white">
                                {stat.value}
                            </p>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Project Status Distribution */}
                    <div className="bg-gray-900/80 backdrop-blur-xl border border-amber-500/30 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold text-amber-400 mb-6">
                            Project Status Distribution
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {projectStatusData.map((status, index) => (
                                <div
                                    key={status.name}
                                    className="bg-black/50 border border-amber-500/20 rounded-xl p-4 hover:border-amber-500/40 transition-all"
                                >
                                    <div
                                        className={`inline-flex p-3 rounded-lg ${status.bgColor} mb-3`}
                                    >
                                        <div className={status.textColor}>
                                            {status.icon}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div
                                            className={`text-4xl font-bold ${status.textColor}`}
                                        >
                                            {status.value}
                                        </div>
                                        <div className="text-gray-400 text-sm font-medium">
                                            {status.name}
                                        </div>
                                    </div>
                                    {/* Mini progress indicator */}
                                    <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5">
                                        <div
                                            className={`bg-linear-to-r ${status.color} h-1.5 rounded-full transition-all duration-1000 ease-out`}
                                            style={{
                                                width:
                                                    animateProgress &&
                                                    stats.projects > 0
                                                        ? `${
                                                              (status.value /
                                                                  stats.projects) *
                                                              100
                                                          }%`
                                                        : "0%",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Distribution */}
                    <div className="bg-gray-900/80 backdrop-blur-xl border border-amber-500/30 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold text-amber-400 mb-6">
                            Content Distribution
                        </h2>
                        <div className="space-y-4">
                            {contentDistribution.map((item, index) => (
                                <div key={item.name}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white text-sm">
                                            {item.name}
                                        </span>
                                        <span className="text-amber-400 font-bold">
                                            {item.value}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-2">
                                        <div
                                            className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                                            style={{
                                                width:
                                                    animateProgress &&
                                                    totalContent > 0
                                                        ? `${
                                                              (item.value /
                                                                  totalContent) *
                                                              100
                                                          }%`
                                                        : "0%",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Projects */}
                <div className="bg-gray-900/80 backdrop-blur-xl border border-amber-500/30 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-amber-400">
                            Recent Projects
                        </h2>
                        <Link
                            href="/admin/projects"
                            className="text-amber-400 hover:text-amber-300 text-sm font-semibold"
                        >
                            View All →
                        </Link>
                    </div>

                    {recentProjects.length > 0 ? (
                        <div className="space-y-4">
                            {recentProjects.map((project, index) => (
                                <Link
                                    key={project.id}
                                    href={`/admin/projects/${project.slug}`}
                                    className="block bg-black/50 border border-amber-500/20 rounded-lg p-4 hover:border-amber-500/40 transition"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Banner Image */}
                                        <div className="shrink-0">
                                            {project.banner ? (
                                                <img
                                                    src={`/storage/${project.banner}`}
                                                    alt={project.name}
                                                    className="w-16 h-16 object-cover rounded-lg border-2 border-amber-500/30"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 bg-gray-800 rounded-lg border-2 border-amber-500/30 flex items-center justify-center">
                                                    <svg
                                                        className="w-10 h-10 text-gray-600"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Project Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-semibold truncate">
                                                {project.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                {new Date(
                                                    project.created_at
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>

                                        {/* Status Badge */}
                                        <span
                                            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                                                project.status === "available"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : project.status === "sold"
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                        >
                                            {project.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                project.status
                                                    .slice(1)
                                                    .replace("_", " ")}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg
                                className="w-16 h-16 mx-auto text-gray-600 mb-4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-gray-400">No projects yet</p>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
