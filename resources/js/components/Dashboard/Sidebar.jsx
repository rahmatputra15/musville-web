import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

const Sidebar = ({
    activePage,
    isCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
}) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };
    const menuItems = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: (
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
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                </svg>
            ),
        },
        {
            name: "Projects",
            href: "/admin/projects",
            icon: (
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
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                </svg>
            ),
        },
        {
            name: "Banner",
            icon: (
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
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                </svg>
            ),
            submenu: [
                {
                    name: "Hero",
                    href: "/admin/banner/hero",
                },
                {
                    name: "Banner Page",
                    href: "/admin/banner/page",
                },
            ],
        },
        {
            name: "About Us",
            icon: (
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
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                </svg>
            ),
            submenu: [
                {
                    name: "Statement",
                    href: "/admin/about-us/statement",
                },
                {
                    name: "Profile",
                    href: "/admin/about-us/profile",
                },
                {
                    name: "Goals",
                    href: "/admin/about-us/goals",
                },
                {
                    name: "Journeys",
                    href: "/admin/about-us/journeys",
                },
            ],
        },
        {
            name: "Partnership",
            icon: (
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
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                </svg>
            ),
            submenu: [
                {
                    name: "Programs",
                    href: "/admin/partnership/programs",
                },
                {
                    name: "Commitment",
                    href: "/admin/partnership/commitment",
                },
            ],
        },
        {
            name: "Contact",
            href: "/admin/contact",
            icon: (
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
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                </svg>
            ),
        },
        {
            name: "Users",
            href: "/admin/users",
            icon: (
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
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                </svg>
            ),
        },
    ];

    // Auto-open dropdown if child page is active
    useEffect(() => {
        menuItems.forEach((item) => {
            if (item.submenu) {
                const isChildActive = item.submenu.some(
                    (sub) => activePage === sub.href
                );
                if (isChildActive) {
                    setOpenDropdown(item.name);
                }
            }
        });
    }, [activePage]);

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-gray-900 border-r border-amber-500/30 shadow-2xl shadow-amber-500/10 z-40 transition-all duration-300 lg:block ${
                mobileMenuOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
            }`}
            style={{ width: isCollapsed ? "80px" : "256px" }}
        >
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-between p-6 border-b border-amber-500/30">
                    {!isCollapsed && (
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/assets/logos/logo.png"
                                alt="Musville Logo"
                                className="w-10 h-10 object-contain"
                            />
                            <span className="text-xl font-bold text-amber-400">
                                MUSVILLE
                            </span>
                        </Link>
                    )}
                    {isCollapsed && (
                        <Link href="/" className="mx-auto">
                            <img
                                src="/assets/logos/logo.png"
                                alt="Musville Logo"
                                className="w-10 h-10 object-contain"
                            />
                        </Link>
                    )}
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            if (item.submenu) {
                                const isOpen = openDropdown === item.name;
                                const isSubmenuActive = item.submenu.some(
                                    (sub) => activePage === sub.href
                                );
                                return (
                                    <li key={item.name}>
                                        <button
                                            onClick={() =>
                                                toggleDropdown(item.name)
                                            }
                                            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all group cursor-pointer ${
                                                isSubmenuActive
                                                    ? "bg-amber-500 text-black"
                                                    : "text-gray-300 hover:bg-gray-800 hover:text-amber-400"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={
                                                        isSubmenuActive
                                                            ? "text-black"
                                                            : "text-gray-400 group-hover:text-amber-400"
                                                    }
                                                >
                                                    {item.icon}
                                                </span>
                                                {!isCollapsed && (
                                                    <span className="font-medium">
                                                        {item.name}
                                                    </span>
                                                )}
                                            </div>
                                            {!isCollapsed && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className={`w-4 h-4 transition-transform ${
                                                        isOpen
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                        {!isCollapsed && isOpen && (
                                            <ul className="mt-1 ml-4 space-y-1">
                                                {item.submenu.map((subitem) => {
                                                    const isActive =
                                                        activePage ===
                                                        subitem.href;
                                                    return (
                                                        <li key={subitem.name}>
                                                            <Link
                                                                href={
                                                                    subitem.href
                                                                }
                                                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                                                                    isActive
                                                                        ? "bg-amber-400/20 text-amber-400 font-medium border border-amber-500/30"
                                                                        : "text-gray-400 hover:bg-gray-800 hover:text-amber-400"
                                                                }`}
                                                            >
                                                                <span className="relative flex items-center justify-center">
                                                                    <span
                                                                        className={`w-2 h-2 rounded-full ${
                                                                            isActive
                                                                                ? "bg-amber-400"
                                                                                : "bg-amber-500"
                                                                        }`}
                                                                    ></span>
                                                                    <span
                                                                        className={`absolute w-2 h-2 rounded-full ${
                                                                            isActive
                                                                                ? "bg-amber-400"
                                                                                : "bg-amber-500"
                                                                        } opacity-50 animate-ping`}
                                                                    ></span>
                                                                </span>
                                                                {subitem.name}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            } else {
                                const isActive = activePage === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                                                isActive
                                                    ? "bg-amber-500 text-black"
                                                    : "text-gray-300 hover:bg-gray-800 hover:text-amber-400"
                                            }`}
                                        >
                                            <span
                                                className={
                                                    isActive
                                                        ? "text-black"
                                                        : "text-gray-400 group-hover:text-amber-400"
                                                }
                                            >
                                                {item.icon}
                                            </span>
                                            {!isCollapsed && (
                                                <span className="font-medium">
                                                    {item.name}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
