import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const BannerPage = () => {
    const { banners, filters, flash, auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [selectedStatus, setSelectedStatus] = useState(
        filters.is_active ?? ""
    );
    const [selectedPage, setSelectedPage] = useState(filters.page_filter || "");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [bannerToDelete, setBannerToDelete] = useState(null);
    const [bannerToEdit, setBannerToEdit] = useState(null);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        image: null,
        page: "projects",
        order: 0,
        is_active: true,
    });
    const [formErrors, setFormErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const pageOptions = [
        { value: "projects", label: "Projects" },
        { value: "about-us", label: "About Us" },
        { value: "partnership", label: "Partnership" },
        { value: "contact", label: "Contact" },
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
            "/admin/banner/page",
            {
                search: search,
                is_active: selectedStatus,
                page_filter: selectedPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleFilter = (filterType, value) => {
        const params = {
            search: search,
        };

        if (filterType === "status") {
            params.is_active = value;
            params.page_filter = selectedPage;
            setSelectedStatus(value);
        } else if (filterType === "page") {
            params.page_filter = value;
            params.is_active = selectedStatus;
            setSelectedPage(value);
        }

        router.get("/admin/banner/page", params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (banner) => {
        setBannerToDelete(banner);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (bannerToDelete) {
            router.delete(`/admin/banner/page/${bannerToDelete.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setBannerToDelete(null);
                    setNotification({
                        type: "success",
                        message: "Banner page deleted successfully",
                    });
                },
            });
        }
    };

    const handleCreate = () => {
        setFormData({
            title: "",
            subtitle: "",
            image: null,
            page: "projects",
            order: 0,
            is_active: true,
        });
        setFormErrors({});
        setImagePreview(null);
        setShowCreateModal(true);
    };

    const handleEdit = (banner) => {
        setBannerToEdit(banner);
        setFormData({
            title: banner.title,
            subtitle: banner.subtitle || "",
            image: null,
            page: banner.page,
            order: banner.order,
            is_active: banner.is_active,
        });
        setFormErrors({});
        setImagePreview(banner.image_url);
        setShowEditModal(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ];
            if (!validTypes.includes(file.type)) {
                setFormErrors({
                    ...formErrors,
                    image: "The image must be a file of type: jpeg, jpg, png, webp.",
                });
                return;
            }

            // Validate file size (2MB)
            if (file.size > 2048 * 1024) {
                setFormErrors({
                    ...formErrors,
                    image: "The image may not be greater than 2MB.",
                });
                return;
            }

            setFormData({ ...formData, image: file });
            setFormErrors({ ...formErrors, image: null });

            // Preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("subtitle", formData.subtitle);
        data.append("page", formData.page);
        if (formData.image) {
            data.append("image", formData.image);
        }
        data.append("order", formData.order);
        data.append("is_active", formData.is_active ? 1 : 0);

        if (showEditModal) {
            data.append("_method", "PUT");
            router.post(`/admin/banner/page/${bannerToEdit.id}`, data, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowEditModal(false);
                    setBannerToEdit(null);
                    setFormErrors({});
                    setIsSubmitting(false);
                    setNotification({
                        type: "success",
                        message: "Banner page updated successfully",
                    });
                },
                onError: (errors) => {
                    setFormErrors(errors);
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post("/admin/banner/page", data, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateModal(false);
                    setFormErrors({});
                    setIsSubmitting(false);
                    setNotification({
                        type: "success",
                        message: "Banner page created successfully",
                    });
                },
                onError: (errors) => {
                    setFormErrors(errors);
                    setIsSubmitting(false);
                },
            });
        }
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        setFormData({
            title: "",
            subtitle: "",
            image: null,
            page: "projects",
            order: 0,
            is_active: true,
        });
        setFormErrors({});
        setImagePreview(null);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setBannerToEdit(null);
        setFormData({
            title: "",
            subtitle: "",
            image: null,
            page: "projects",
            order: 0,
            is_active: true,
        });
        setFormErrors({});
        setImagePreview(null);
    };

    return (
        <>
            <Head title="Banner Page Management - Musville" />

            <DashboardLayout activePage="/admin/banner/page">
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
                                Banner Page Management
                            </h1>
                            <p className="text-gray-400">
                                Manage banners for different pages
                            </p>
                        </div>
                        <button
                            onClick={handleCreate}
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
                            Add New Banner
                        </button>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-6 bg-gray-900/50 border border-amber-500/30 rounded-lg p-4">
                        <form onSubmit={handleSearch}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Search */}
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Search by title or subtitle..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>

                                {/* Page Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedPage}
                                        onChange={(e) =>
                                            handleFilter("page", e.target.value)
                                        }
                                        className="w-full pl-4 pr-10 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                                    >
                                        <option value="">All Pages</option>
                                        {pageOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
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
                                        onChange={(e) =>
                                            handleFilter(
                                                "status",
                                                e.target.value
                                            )
                                        }
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

                    {/* Banners Table */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto scrollbar-thin">
                            <table className="w-full">
                                <thead className="bg-black/50 border-b border-amber-500/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Subtitle
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Page
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Order
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {banners.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-8 text-center text-gray-400"
                                            >
                                                No banners found
                                            </td>
                                        </tr>
                                    ) : (
                                        banners.data.map((banner) => (
                                            <tr
                                                key={banner.id}
                                                className="hover:bg-amber-500/5 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <img
                                                        src={banner.image_url}
                                                        alt={banner.title}
                                                        className="w-24 h-16 object-cover rounded-lg border border-amber-500/30"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-white font-medium">
                                                        {banner.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-400 text-sm">
                                                        {banner.subtitle || "-"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/50">
                                                        {banner.page}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-300">
                                                        {banner.order}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                                            banner.is_active
                                                                ? "bg-green-500/20 text-green-400 border-green-500/50"
                                                                : "bg-red-500/20 text-red-400 border-red-500/50"
                                                        }`}
                                                    >
                                                        {banner.is_active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    banner
                                                                )
                                                            }
                                                            className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
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
                                                                    banner
                                                                )
                                                            }
                                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
                        {banners.data.length > 0 && (
                            <div className="px-6 py-4 border-t border-amber-500/30 bg-black/30">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-400">
                                        Showing{" "}
                                        <span className="text-medium">
                                            {banners.from}
                                        </span>{" "}
                                        to{" "}
                                        <span className="text-medium">
                                            {banners.to}
                                        </span>{" "}
                                        of{" "}
                                        <span className="text-medium">
                                            {banners.total}
                                        </span>{" "}
                                        results
                                    </div>

                                    {banners.links.length > 3 && (
                                        <div className="flex gap-2">
                                            {banners.links.map(
                                                (link, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            link.url &&
                                                            router.visit(
                                                                link.url
                                                            )
                                                        }
                                                        disabled={
                                                            !link.url ||
                                                            link.active
                                                        }
                                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                            link.active
                                                                ? "bg-amber-500 text-white"
                                                                : !link.url
                                                                ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                                                                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-amber-500/20"
                                                        }`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Create/Edit Modal */}
                {(showCreateModal || showEditModal) && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden border border-amber-500/30 shadow-2xl">
                            {/* Modal Header */}
                            <div className="bg-linear-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-500/30 px-6 py-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-amber-400">
                                    {showEditModal
                                        ? "Edit Banner Page"
                                        : "Create Banner Page"}
                                </h2>
                                <button
                                    onClick={
                                        showEditModal
                                            ? closeEditModal
                                            : closeCreateModal
                                    }
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
                            <form onSubmit={handleSubmit}>
                                <div className="p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto scrollbar-thin">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Title{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            placeholder="Enter banner title"
                                        />
                                        {formErrors.title && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Subtitle */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Subtitle
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subtitle}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    subtitle: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            placeholder="Enter banner subtitle"
                                        />
                                        {formErrors.subtitle && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {/* Page */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Page{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.page}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        page: e.target.value,
                                                    })
                                                }
                                                className="w-full pl-4 pr-10 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                                            >
                                                {pageOptions.map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
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
                                        {formErrors.page && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.page}
                                            </p>
                                        )}
                                    </div>

                                    {/* Image */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Image{" "}
                                            {!showEditModal && (
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            )}
                                            <span className="text-gray-500 text-xs ml-2">
                                                (Max 2MB, jpeg/jpg/png/webp)
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            onChange={handleImageChange}
                                            className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        {formErrors.image && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.image}
                                            </p>
                                        )}
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded-lg border border-amber-500/30"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Order */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Order
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.order}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    order: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            placeholder="0"
                                        />
                                        {formErrors.order && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.order}
                                            </p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_active}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        is_active:
                                                            e.target.checked,
                                                    })
                                                }
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-300">
                                                Active
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="bg-black/30 border-t border-amber-500/30 px-6 py-4 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={
                                            showEditModal
                                                ? closeEditModal
                                                : closeCreateModal
                                        }
                                        className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting
                                            ? "Saving..."
                                            : showEditModal
                                            ? "Update"
                                            : "Create"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && bannerToDelete && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-gray-900 rounded-lg max-w-md w-full border border-red-500/50 shadow-2xl">
                            <div className="p-6">
                                {/* Warning Icon */}
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-red-500"
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
                                </div>

                                <h3 className="text-xl font-bold text-white text-center mb-2">
                                    Delete Banner Page
                                </h3>
                                <p className="text-gray-400 text-center mb-6">
                                    Are you sure you want to delete{" "}
                                    <span className="text-amber-400 font-semibold">
                                        {bannerToDelete.title}
                                    </span>
                                    ? This action cannot be undone.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }
                                        className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
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

export default BannerPage;
