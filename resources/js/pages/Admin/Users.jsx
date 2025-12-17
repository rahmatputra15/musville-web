import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Users = () => {
    const { users, filters, flash, auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [selectedRole, setSelectedRole] = useState(filters.role || "");
    const [selectedStatus, setSelectedStatus] = useState(filters.status ?? "");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        role: "",
        is_active: true,
    });
    const [formErrors, setFormErrors] = useState({});

    const roles = ["super-admin", "admin", "editor", "viewer"];

    // Auto-hide notification after 3 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Auto-hide flash messages after 3 seconds
    useEffect(() => {
        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => {
                router.reload({ only: ["flash"] });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/admin/users",
            {
                search: search,
                role: selectedRole,
                status: selectedStatus,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleFilter = (key, value) => {
        router.get(
            "/admin/users",
            {
                search: search,
                role: key === "role" ? value : selectedRole,
                status: key === "status" ? value : selectedStatus,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleToggleStatus = (userId) => {
        router.post(
            `/admin/users/${userId}/toggle-status`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNotification({
                        type: "success",
                        message: "User status updated",
                    });
                },
            }
        );
    };

    const handleDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            router.delete(`/admin/users/${userToDelete.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                    setNotification({
                        type: "success",
                        message: "User deleted successfully",
                    });
                },
            });
        }
    };

    const openCreateModal = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            phone: "",
            role: "",
            is_active: true,
        });
        setFormErrors({});
        setShowCreateModal(true);
    };

    const openEditModal = (user) => {
        setUserToEdit(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: "",
            password_confirmation: "",
            phone: user.phone || "",
            role: user.roles[0]?.name || "",
            is_active: user.is_active,
        });
        setFormErrors({});
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowCreateModal(false);
        setShowEditModal(false);
        setUserToEdit(null);
        setFormData({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            phone: "",
            role: "",
            is_active: true,
        });
        setFormErrors({});
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors({});

        if (showEditModal && userToEdit) {
            router.put(`/admin/users/${userToEdit.id}`, formData, {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setNotification({
                        type: "success",
                        message: "User updated successfully",
                    });
                },
                onError: (errors) => {
                    setFormErrors(errors);
                },
            });
        } else {
            router.post("/admin/users", formData, {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setNotification({
                        type: "success",
                        message: "User created successfully",
                    });
                },
                onError: (errors) => {
                    setFormErrors(errors);
                },
            });
        }
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getStatusBadge = (isActive) => {
        return isActive ? (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                Active
            </span>
        ) : (
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                Inactive
            </span>
        );
    };

    return (
        <>
            <Head title="Users Management - Musville" />

            <DashboardLayout activePage="/admin/users">
                {/* Flash Notification */}
                <AnimatePresence>
                    {(notification || flash?.success || flash?.error) && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed bottom-6 right-6 z-50 max-w-md"
                        >
                            <div
                                className={`relative p-4 pr-12 rounded-lg shadow-2xl border overflow-hidden ${
                                    notification?.type === "error" ||
                                    flash?.error
                                        ? "bg-red-500/95 border-red-600 text-white"
                                        : "bg-green-500/95 border-green-600 text-white"
                                } backdrop-blur-sm`}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => {
                                        setNotification(null);
                                        if (flash?.success || flash?.error) {
                                            router.reload({ only: ["flash"] });
                                        }
                                    }}
                                    className="absolute top-3 right-3 hover:bg-white/20 rounded-full p-1 transition-colors"
                                    aria-label="Close notification"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>

                                {/* Message */}
                                <div className="pr-2">
                                    {notification?.message ||
                                        flash?.success ||
                                        flash?.error}
                                </div>

                                {/* Loading Bar */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-1 bg-white/40"
                                    initial={{ width: "100%" }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: 3, ease: "linear" }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="p-6">
                    {/* Header */}
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-amber-400 mb-2">
                                Users Management
                            </h1>
                            <p className="text-gray-400">
                                Manage all users and their permissions
                            </p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-600 transition flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add User
                        </button>
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg p-6 mb-6">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Search */}
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Search by name or email..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>

                                {/* Role Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => {
                                            setSelectedRole(e.target.value);
                                            handleFilter(
                                                "role",
                                                e.target.value
                                            );
                                        }}
                                        className="w-full pl-4 pr-10 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                                    >
                                        <option value="">All Roles</option>
                                        {roles.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg
                                            className="h-5 w-5 text-amber-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => {
                                            setSelectedStatus(e.target.value);
                                            handleFilter(
                                                "status",
                                                e.target.value
                                            );
                                        }}
                                        className="w-full pl-4 pr-10 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                                    >
                                        <option value="">All Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg
                                            className="h-5 w-5 text-amber-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Users Table */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto scrollbar-thin">
                            <table className="w-full">
                                <thead className="bg-black/50 border-b border-amber-500/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-amber-400 font-semibold">
                                            User
                                        </th>
                                        <th className="px-6 py-4 text-left text-amber-400 font-semibold">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-amber-400 font-semibold">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-amber-400 font-semibold">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-amber-400 font-semibold">
                                            Last Login
                                        </th>
                                        <th className="px-6 py-4 text-left text-amber-400 font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.length > 0 ? (
                                        users.data.map((user, index) => (
                                            <motion.tr
                                                key={user.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                }}
                                                className="border-b border-amber-500/10 hover:bg-amber-500/5 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {user.avatar ? (
                                                            <img
                                                                src={
                                                                    user.avatar
                                                                }
                                                                alt={user.name}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">
                                                                {getInitials(
                                                                    user.name
                                                                )}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-white font-medium">
                                                                {user.name}
                                                            </p>
                                                            <p className="text-gray-400 text-sm">
                                                                ID: {user.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.roles &&
                                                    user.roles.length > 0 ? (
                                                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full">
                                                            {user.roles[0].name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">
                                                            No role
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(
                                                        user.is_active
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-gray-300 text-sm">
                                                    {user.last_login_at
                                                        ? new Date(
                                                              user.last_login_at
                                                          ).toLocaleDateString()
                                                        : "Never"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {/* Edit */}
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    user
                                                                )
                                                            }
                                                            className="p-2 text-amber-400 hover:bg-amber-500/20 rounded-lg transition"
                                                            title="Edit"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        {/* Toggle Status */}
                                                        <button
                                                            onClick={() =>
                                                                handleToggleStatus(
                                                                    user.id
                                                                )
                                                            }
                                                            disabled={
                                                                user.id ===
                                                                auth.user.id
                                                            }
                                                            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                            title={
                                                                user.is_active
                                                                    ? "Deactivate"
                                                                    : "Activate"
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                                                />
                                                            </svg>
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user
                                                                )
                                                            }
                                                            disabled={
                                                                user.id ===
                                                                auth.user.id
                                                            }
                                                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                            title="Delete"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-12 text-center text-gray-400"
                                            >
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {users.links.length > 3 && (
                            <div className="px-6 py-4 border-t border-amber-500/30 flex items-center justify-between">
                                <div className="text-gray-400 text-sm">
                                    Showing {users.from} to {users.to} of{" "}
                                    {users.total} users
                                </div>
                                <div className="flex gap-2">
                                    {users.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                link.url && router.get(link.url)
                                            }
                                            disabled={!link.url}
                                            className={`px-3 py-1 rounded-lg transition ${
                                                link.active
                                                    ? "bg-amber-500 text-black"
                                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {showDeleteModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-md w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-xl font-bold text-amber-400 mb-4">
                                    Confirm Delete
                                </h3>
                                <p className="text-gray-300 mb-6">
                                    Are you sure you want to delete user{" "}
                                    <strong>{userToDelete?.name}</strong>? This
                                    action cannot be undone.
                                </p>
                                <div className="flex gap-4 justify-end">
                                    <button
                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }
                                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Create/Edit User Modal */}
                <AnimatePresence>
                    {(showCreateModal || showEditModal) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
                            onClick={closeModal}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-2xl w-full my-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-2xl font-bold text-amber-400 mb-6">
                                    {showEditModal
                                        ? "Edit User"
                                        : "Create New User"}
                                </h3>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Name{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleFormChange}
                                                className={`w-full px-4 py-2 bg-black/50 border ${
                                                    formErrors.name
                                                        ? "border-red-500"
                                                        : "border-amber-500/50"
                                                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                                placeholder="Enter full name"
                                            />
                                            {formErrors.name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Email{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                className={`w-full px-4 py-2 bg-black/50 border ${
                                                    formErrors.email
                                                        ? "border-red-500"
                                                        : "border-amber-500/50"
                                                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                                placeholder="Enter email address"
                                            />
                                            {formErrors.email && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleFormChange}
                                                className={`w-full px-4 py-2 bg-black/50 border ${
                                                    formErrors.phone
                                                        ? "border-red-500"
                                                        : "border-amber-500/50"
                                                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                                placeholder="Enter phone number"
                                            />
                                            {formErrors.phone && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.phone}
                                                </p>
                                            )}
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Role{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleFormChange}
                                                    className={`w-full pl-4 pr-10 py-2 bg-black/50 border ${
                                                        formErrors.role
                                                            ? "border-red-500"
                                                            : "border-amber-500/50"
                                                    } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none`}
                                                >
                                                    <option value="">
                                                        Select role
                                                    </option>
                                                    {roles.map((role) => (
                                                        <option
                                                            key={role}
                                                            value={role}
                                                        >
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                    <svg
                                                        className="h-5 w-5 text-amber-500"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            {formErrors.role && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.role}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Password{" "}
                                                {!showEditModal && (
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                )}
                                                {showEditModal && (
                                                    <span className="text-gray-500 text-sm">
                                                        (leave blank to keep
                                                        current)
                                                    </span>
                                                )}
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleFormChange}
                                                className={`w-full px-4 py-2 bg-black/50 border ${
                                                    formErrors.password
                                                        ? "border-red-500"
                                                        : "border-amber-500/50"
                                                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                                placeholder="Enter password"
                                            />
                                            {formErrors.password && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.password}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password Confirmation */}
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Confirm Password{" "}
                                                {!showEditModal && (
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                )}
                                            </label>
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                value={
                                                    formData.password_confirmation
                                                }
                                                onChange={handleFormChange}
                                                className={`w-full px-4 py-2 bg-black/50 border ${
                                                    formErrors.password_confirmation
                                                        ? "border-red-500"
                                                        : "border-amber-500/50"
                                                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                                placeholder="Confirm password"
                                            />
                                            {formErrors.password_confirmation && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {
                                                        formErrors.password_confirmation
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Active Status */}
                                    <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            checked={formData.is_active}
                                            onChange={handleFormChange}
                                            className="w-5 h-5 text-amber-500 bg-black/50 border-amber-500/50 rounded focus:ring-amber-500"
                                        />
                                        <label className="text-gray-300 font-medium">
                                            Active User
                                        </label>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex gap-4 justify-end pt-4 border-t border-amber-500/30">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-600 transition"
                                        >
                                            {showEditModal
                                                ? "Update User"
                                                : "Create User"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DashboardLayout>
        </>
    );
};

export default Users;
