import { useState } from "react";
import { Link } from "@inertiajs/react";

const Navbar = ({ activePage = "home" }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <nav className="bg-black/30 backdrop-blur-md border-b border-amber-500/20 shadow-lg fixed w-full top-0 z-50 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/logos/logo.png"
                                alt="Musville Logo"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-2xl font-bold text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                                MUSVILLE
                            </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/"
                                className={`font-medium cursor-pointer transition ${
                                    activePage === "home"
                                        ? "text-amber-400 border-b-2 border-amber-400"
                                        : "text-gray-200 hover:text-amber-400"
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/projects"
                                className={`font-medium cursor-pointer transition ${
                                    activePage === "projects"
                                        ? "text-amber-400 border-b-2 border-amber-400"
                                        : "text-gray-200 hover:text-amber-400"
                                }`}
                            >
                                Projects
                            </Link>
                            <Link
                                href="/about"
                                className={`font-medium cursor-pointer transition ${
                                    activePage === "about"
                                        ? "text-amber-400 border-b-2 border-amber-400"
                                        : "text-gray-200 hover:text-amber-400"
                                }`}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/partnership"
                                className={`font-medium cursor-pointer transition ${
                                    activePage === "partnership"
                                        ? "text-amber-400 border-b-2 border-amber-400"
                                        : "text-gray-200 hover:text-amber-400"
                                }`}
                            >
                                Partnership
                            </Link>
                            <Link
                                href="/contact"
                                className={`font-medium cursor-pointer transition ${
                                    activePage === "contact"
                                        ? "text-amber-400 border-b-2 border-amber-400"
                                        : "text-gray-200 hover:text-amber-400"
                                }`}
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="text-amber-500 hover:text-amber-400 focus:outline-none cursor-pointer"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {mobileMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu - Positioned below navbar */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-amber-500/20 shadow-lg animate-slide-down">
                    <div className="px-4 pt-4 pb-4 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-3 rounded-lg text-gray-200 hover:text-amber-400 hover:bg-amber-500/10 transition font-medium cursor-pointer"
                        >
                            Home
                        </Link>
                        <Link
                            href="/projects"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-3 rounded-lg text-gray-200 hover:text-amber-400 hover:bg-amber-500/10 transition font-medium cursor-pointer"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-3 rounded-lg text-gray-200 hover:text-amber-400 hover:bg-amber-500/10 transition font-medium cursor-pointer"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-3 rounded-lg text-gray-200 hover:text-amber-400 hover:bg-amber-500/10 transition font-medium cursor-pointer"
                        >
                            Contact
                        </Link>
                        <button className="w-full mt-3 bg-linear-to-r from-amber-500 to-yellow-600 text-black px-6 py-3 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition font-semibold shadow-lg shadow-amber-500/30 cursor-pointer">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
