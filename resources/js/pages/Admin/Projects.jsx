import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Projects = () => {
    const { projects, filters, flash, auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [selectedStatus, setSelectedStatus] = useState(filters.status || "");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        total_unit: 0,
        unit_sold: 0,
        status: "available",
        banner: null,
    });
    const [formErrors, setFormErrors] = useState({});
    const [bannerPreview, setBannerPreview] = useState(null);

    const statuses = [
        { value: "available", label: "Available" },
        { value: "sold", label: "Sold" },
        { value: "coming_soon", label: "Coming Soon" },
    ];

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
            "/admin/projects",
            {
                search: search,
                status: selectedStatus,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleFilter = (value) => {
        router.get(
            "/admin/projects",
            {
                search: search,
                status: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleDelete = (project) => {
        setProjectToDelete(project);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            router.delete(`/admin/projects/${projectToDelete.slug}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setProjectToDelete(null);
                    setNotification({
                        type: "success",
                        message: "Project deleted successfully",
                    });
                },
            });
        }
    };

    const openCreateModal = () => {
        setFormData({
            name: "",
            total_unit: 0,
            unit_sold: 0,
            status: "available",
            banner: null,
        });
        setBannerPreview(null);
        setFormErrors({});
        setShowCreateModal(true);
    };

    const openEditModal = (project) => {
        setProjectToEdit(project);
        setFormData({
            name: project.name,
            total_unit: project.total_unit,
            unit_sold: project.unit_sold,
            status: project.status,
            banner: null,
        });
        setBannerPreview(project.banner ? `/storage/${project.banner}` : null);
        setFormErrors({});
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowCreateModal(false);
        setShowEditModal(false);
        setProjectToEdit(null);
        setBannerPreview(null);
        setFormErrors({});
    };

    const handleFormChange = (e) => {
        const { name, value, files, type } = e.target;

        if (type === "file") {
            const file = files[0];
            setFormData({ ...formData, [name]: file });

            // Preview image
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBannerPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== "") {
                data.append(key, formData[key]);
            }
        });

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setNotification({
                    type: "success",
                    message: projectToEdit
                        ? "Project updated successfully"
                        : "Project created successfully",
                });
            },
            onError: (errors) => {
                setFormErrors(errors);
            },
        };

        if (projectToEdit) {
            data.append("_method", "PUT");
            router.post(`/admin/projects/${projectToEdit.slug}`, data, options);
        } else {
            router.post("/admin/projects", data, options);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            available: "bg-green-500/20 text-green-400 border-green-500/50",
            sold: "bg-red-500/20 text-red-400 border-red-500/50",
            coming_soon: "bg-blue-500/20 text-blue-400 border-blue-500/50",
        };
        const labels = {
            available: "Available",
            sold: "Sold",
            coming_soon: "Coming Soon",
        };
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    return (
        <>
            <Head title="Projects Management - Musville" />

            <DashboardLayout activePage="/admin/projects">
                {/* Flash Notification */}
                {(notification || flash?.success || flash?.error) && (
                    <div className="fixed bottom-6 right-6 z-50 max-w-md">
                        <div
                            className={`relative p-4 pr-12 rounded-lg shadow-2xl border overflow-hidden ${
                                notification?.type === "error" || flash?.error
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
                            <div className="absolute bottom-0 left-0 h-1 bg-white/40 animate-shrink" />
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {/* Header */}
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-amber-400 mb-2">
                                Projects Management
                            </h1>
                            <p className="text-gray-400">
                                Manage all projects and their details
                            </p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/50 flex items-center gap-2"
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
                                <path d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Project
                        </button>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-6 bg-gray-900/50 border border-amber-500/30 rounded-lg p-4">
                        <form onSubmit={handleSearch}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Search */}
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Search by project name..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>

                                {/* Status Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => {
                                            setSelectedStatus(e.target.value);
                                            handleFilter(e.target.value);
                                        }}
                                        className="w-full pl-4 pr-10 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                                    >
                                        <option value="">All Status</option>
                                        {statuses.map((status) => (
                                            <option
                                                key={status.value}
                                                value={status.value}
                                            >
                                                {status.label}
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
                            </div>
                        </form>
                    </div>

                    {/* Projects Table */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto scrollbar-thin">
                            <table className="w-full">
                                <thead className="bg-black/50 border-b border-amber-500/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Banner
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Name / Slug
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Total Units
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Unit Sold
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Remaining
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Media
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {projects.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="px-6 py-8 text-center text-gray-400"
                                            >
                                                No projects found
                                            </td>
                                        </tr>
                                    ) : (
                                        projects.data.map((project) => (
                                            <tr
                                                key={project.id}
                                                className="hover:bg-amber-500/5 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    {project.banner ? (
                                                        <img
                                                            src={`/storage/${project.banner}`}
                                                            alt={project.name}
                                                            className="w-16 h-16 object-cover rounded-lg border border-amber-500/30"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 bg-gray-800 rounded-lg border border-amber-500/30 flex items-center justify-center">
                                                            <svg
                                                                className="w-8 h-8 text-gray-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-white font-medium">
                                                            {project.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            /{project.slug}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">
                                                    {project.total_unit}
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">
                                                    {project.unit_sold}
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">
                                                    {project.total_unit -
                                                        project.unit_sold}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(
                                                        project.status
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-3 text-sm">
                                                        <span className="text-gray-400">
                                                            📷{" "}
                                                            {
                                                                project.images_count
                                                            }
                                                        </span>
                                                        <span className="text-gray-400">
                                                            🎥{" "}
                                                            {
                                                                project.videos_count
                                                            }
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={`/admin/projects/${project.slug}`}
                                                            className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                                                            title="View Details"
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
                                                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    project
                                                                )
                                                            }
                                                            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                                            title="Edit"
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
                                                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    project
                                                                )
                                                            }
                                                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                                            title="Delete"
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
                                                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {projects.links && projects.links.length > 3 && (
                            <div className="bg-black/30 px-6 py-4 border-t border-amber-500/30">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-400">
                                        Showing {projects.from} to {projects.to}{" "}
                                        of {projects.total} projects
                                    </div>
                                    <div className="flex gap-2">
                                        {projects.links.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    if (link.url) {
                                                        router.get(link.url, {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                        });
                                                    }
                                                }}
                                                disabled={!link.url}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    link.active
                                                        ? "bg-amber-500 text-white"
                                                        : link.url
                                                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                        : "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Create/Edit Modal */}
                {(showCreateModal || showEditModal) && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-gray-900 border border-amber-500/30 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-gray-900 border-b border-amber-500/30 px-6 py-4 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-amber-400">
                                    {projectToEdit
                                        ? "Edit Project"
                                        : "Create New Project"}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="space-y-6">
                                    {/* Project Name */}
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">
                                            Project Name{" "}
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
                                            placeholder="Enter project name"
                                        />
                                        {formErrors.name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formErrors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Total Unit */}
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Total Unit{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                name="total_unit"
                                                value={formData.total_unit}
                                                onChange={handleFormChange}
                                                min="0"
                                                className={`w-full px-4 py-2 bg-black/50 border ${
                                                    formErrors.total_unit
                                                        ? "border-red-500"
                                                        : "border-amber-500/50"
                                                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                                placeholder="0"
                                            />
                                            {formErrors.total_unit && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.total_unit}
                                                </p>
                                            )}
                                        </div>

                                        {/* Unit Sold */}
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Unit Sold{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                name="unit_sold"
                                                value={formData.unit_sold}
                                                onChange={handleFormChange}
                                                min="0"
                                                className={`w-full px-4 py-2 bg-black/50 border ${
                                                    formErrors.unit_sold
                                                        ? "border-red-500"
                                                        : "border-amber-500/50"
                                                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                                placeholder="0"
                                            />
                                            {formErrors.unit_sold && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.unit_sold}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">
                                            Status{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleFormChange}
                                                className={`w-full pl-4 pr-10 py-2 bg-black/50 border ${
                                                    formErrors.status
                                                        ? "border-red-500"
                                                        : "border-amber-500/50"
                                                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none`}
                                            >
                                                {statuses.map((status) => (
                                                    <option
                                                        key={status.value}
                                                        value={status.value}
                                                    >
                                                        {status.label}
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
                                        {formErrors.status && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formErrors.status}
                                            </p>
                                        )}
                                    </div>

                                    {/* Banner */}
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">
                                            Banner Image
                                        </label>
                                        <input
                                            type="file"
                                            name="banner"
                                            onChange={handleFormChange}
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            className={`w-full px-4 py-2 bg-black/50 border ${
                                                formErrors.banner
                                                    ? "border-red-500"
                                                    : "border-amber-500/50"
                                            } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                        />
                                        <p className="text-gray-400 text-sm mt-1">
                                            Supported formats: JPEG, JPG, PNG,
                                            WEBP. Max size: 2MB
                                        </p>
                                        {formErrors.banner && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formErrors.banner}
                                            </p>
                                        )}
                                        {bannerPreview && (
                                            <div className="mt-4">
                                                <img
                                                    src={bannerPreview}
                                                    alt="Banner preview"
                                                    className="w-full h-48 object-cover rounded-lg border border-amber-500/30"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/50"
                                    >
                                        {projectToEdit
                                            ? "Update Project"
                                            : "Create Project"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <div
                            className="bg-gray-900 border border-red-500/30 rounded-lg shadow-2xl w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-red-500/20 rounded-full">
                                        <svg
                                            className="w-6 h-6 text-red-500"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            Delete Project
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            This action cannot be undone
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-6">
                                    Are you sure you want to delete "
                                    <span className="font-semibold text-white">
                                        {projectToDelete?.name}
                                    </span>
                                    "? This will also delete all associated
                                    images and videos.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }
                                        className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="flex-1 px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-red-500/50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </DashboardLayout>
        </>
    );
};

export default Projects;
