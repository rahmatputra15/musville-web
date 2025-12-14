import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = ({ children, activePage = "dashboard" }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black">
            <Sidebar
                activePage={activePage}
                isCollapsed={isCollapsed}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
            <DashboardNavbar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main
                className={`pt-24 p-6 transition-all duration-300 ${
                    isCollapsed ? "lg:ml-20" : "lg:ml-64"
                }`}
            >
                <div className="max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    );
};

export default DashboardLayout;
