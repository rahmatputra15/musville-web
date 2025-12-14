import { Link } from "@inertiajs/react";
import { useState } from "react";

const DashboardNavbar = ({
    isCollapsed,
    setIsCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
}) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <nav
            className={`fixed top-0 right-0 left-0 bg-gray-900/80 backdrop-blur-xl border-b border-amber-500/30 shadow-lg z-30 transition-all duration-300 ${
                isCollapsed ? "lg:left-20" : "lg:left-64"
            }`}
        >
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Toggle Button */}
                    <button
                        onClick={() => {
                            if (window.innerWidth < 1024) {
                                setMobileMenuOpen(!mobileMenuOpen);
                            } else {
                                setIsCollapsed(!isCollapsed);
                            }
                        }}
                        className="p-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition mr-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4 ml-6">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setShowNotifications(!showNotifications)
                                }
                                className="relative p-2 text-gray-400 hover:text-amber-400 hover:bg-gray-800 rounded-lg transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-amber-500/30 rounded-lg shadow-2xl overflow-hidden">
                                    <div className="p-4 border-b border-amber-500/30">
                                        <h3 className="text-lg font-semibold text-amber-400">
                                            Notifications
                                        </h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="p-4 border-b border-gray-800 hover:bg-gray-800/50 transition cursor-pointer"
                                            >
                                                <p className="text-sm text-white font-medium">
                                                    New project created
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    2 hours ago
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 text-center border-t border-amber-500/30">
                                        <Link
                                            href="/dashboard/notifications"
                                            className="text-sm text-amber-400 hover:text-amber-300"
                                        >
                                            View all notifications
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition"
                            >
                                <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                                    A
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-white">
                                        Admin User
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        admin@musville.com
                                    </p>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </button>

                            {/* User Dropdown Menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-amber-500/30 rounded-lg shadow-2xl overflow-hidden z-50">
                                    <div className="p-4 border-b border-amber-500/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">
                                                A
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">
                                                    Admin User
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    admin@musville.com
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <Link
                                            href="/dashboard/profile"
                                            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                                />
                                            </svg>
                                            Profile
                                        </Link>
                                        <Link
                                            href="/dashboard/settings"
                                            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            Settings
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-amber-500/30">
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                                />
                                            </svg>
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
