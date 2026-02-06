import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TextEditor from "../../components/TextEditor";

const Partnerships = () => {
    const { partnerships, filters, flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [selectedStatus, setSelectedStatus] = useState(filters.status || "");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [partnershipToDelete, setPartnershipToDelete] = useState(null);
    const [partnershipToEdit, setPartnershipToEdit] = useState(null);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        icon: "",
        title: "",
        subtitle: "",
        benefit: "",
        contact: "",
        status: "active",
    });
    const [formErrors, setFormErrors] = useState({});

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
            "/admin/partnership/programs",
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
            "/admin/partnership/programs",
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

    const handleDelete = (partnership) => {
        setPartnershipToDelete(partnership);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (partnershipToDelete) {
            router.delete(
                `/admin/partnership/programs/${partnershipToDelete.id}`,
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setShowDeleteModal(false);
                        setPartnershipToDelete(null);
                        setNotification({
                            type: "success",
                            message: "Partnership deleted successfully",
                        });
                    },
                }
            );
        }
    };

    const openCreateModal = () => {
        setFormData({
            icon: "",
            title: "",
            subtitle: "",
            benefit: "",
            contact: "",
            status: "active",
        });
        setFormErrors({});
        setShowCreateModal(true);
    };

    const openEditModal = (partnership) => {
        setPartnershipToEdit(partnership);
        setFormData({
            icon: partnership.icon || "",
            title: partnership.title,
            subtitle: partnership.subtitle || "",
            benefit: partnership.benefit,
            contact: partnership.contact,
            status: partnership.status,
        });
        setFormErrors({});
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowCreateModal(false);
        setShowEditModal(false);
        setPartnershipToEdit(null);
        setFormErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setNotification({
                    type: "success",
                    message: partnershipToEdit
                        ? "Partnership updated successfully"
                        : "Partnership created successfully",
                });
            },
            onError: (errors) => {
                setFormErrors(errors);
            },
        };

        if (partnershipToEdit) {
            router.put(
                `/admin/partnership/programs/${partnershipToEdit.id}`,
                formData,
                options
            );
        } else {
            router.post("/admin/partnership/programs", formData, options);
        }
    };

    const getStatusBadge = (status) => {
        return status === "active" ? (
            <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-green-500/20 text-green-400 border-green-500/50">
                Active
            </span>
        ) : (
            <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-gray-500/20 text-gray-400 border-gray-500/50">
                Inactive
            </span>
        );
    };

    return (
        <>
            <Head title="Partnerships - Musville" />

            <DashboardLayout activePage="/admin/partnership/programs">
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

                            <div className="pr-2">
                                {notification?.message ||
                                    flash?.success ||
                                    flash?.error}
                            </div>

                            <div className="absolute bottom-0 left-0 h-1 bg-white/40 animate-shrink" />
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {/* Header */}
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-amber-400 mb-2">
                                Partnership Programs
                            </h1>
                            <p className="text-gray-400">
                                Manage partnership opportunities and benefits
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
                            Add New Partnership
                        </button>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-6 bg-gray-900/50 border border-amber-500/30 rounded-lg p-4">
                        <form onSubmit={handleSearch}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Search by title, subtitle or benefit..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>

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
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
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

                    {/* Partnerships Table */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto scrollbar-thin">
                            <table className="w-full">
                                <thead className="bg-black/50 border-b border-amber-500/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Icon
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Subtitle
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                            Contact
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
                                    {partnerships.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-8 text-center text-gray-400"
                                            >
                                                No partnerships found
                                            </td>
                                        </tr>
                                    ) : (
                                        partnerships.map((partnership) => (
                                            <tr
                                                key={partnership.id}
                                                className="hover:bg-amber-500/5 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    {partnership.icon ? (
                                                        <svg
                                                            className="w-8 h-8 text-amber-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d={
                                                                    partnership.icon
                                                                }
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <span className="text-gray-600">
                                                            -
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-white font-medium">
                                                        {partnership.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-300 text-sm">
                                                        {partnership.subtitle ||
                                                            "-"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href={`https://wa.me/${partnership.contact}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                        </svg>
                                                        {partnership.contact}
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(
                                                        partnership.status
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    partnership
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
                                                                    partnership
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
                    </div>
                </div>

                {/* Create/Edit Modal */}
                {(showCreateModal || showEditModal) && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 border border-amber-500/50 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                            {/* Modal Header */}
                            <div className="bg-linear-to-r from-amber-500/10 via-amber-600/10 to-amber-500/10 px-6 py-4 border-b border-amber-500/30 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-amber-400">
                                    {partnershipToEdit
                                        ? "Edit Partnership"
                                        : "Add New Partnership"}
                                </h3>
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
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col flex-1 overflow-hidden"
                            >
                                <div className="p-6 space-y-4 overflow-y-auto scrollbar-thin max-h-[calc(90vh-140px)]">
                                    {/* Icon */}
                                    <div>
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
                                                placeholder="Enter partnership title"
                                            />
                                            {formErrors.title && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.title}
                                                </p>
                                            )}
                                        </div>
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
                                            placeholder="Enter partnership subtitle"
                                        />
                                        {formErrors.subtitle && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {/* Benefit */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Benefit{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <TextEditor
                                            content={formData.benefit}
                                            onChange={(content) =>
                                                setFormData({
                                                    ...formData,
                                                    benefit: content,
                                                })
                                            }
                                            placeholder="Enter partnership benefits"
                                        />
                                        {formErrors.benefit && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.benefit}
                                            </p>
                                        )}
                                    </div>

                                    {/* Icon */}
                                    <div className="md:col-span-4 mb-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Icon SVG Path (d attribute)
                                        </label>
                                        <div className="flex gap-2">
                                            {formData.icon && (
                                                <div className="shrink-0">
                                                    <svg
                                                        className="w-10 h-10 text-amber-400 bg-gray-800 rounded p-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d={formData.icon}
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <textarea
                                                    value={formData.icon}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            icon: e.target
                                                                .value,
                                                        })
                                                    }
                                                    rows="2"
                                                    className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 scrollbar-thin resize-none text-sm font-mono"
                                                    placeholder="M12 2C6.48 2 2 6.48 2 12s4.48..."
                                                />
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Paste only the 'd' attribute
                                                    value from SVG path
                                                </p>
                                            </div>
                                        </div>
                                        {formErrors.icon && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.icon}
                                            </p>
                                        )}
                                    </div>

                                    {/* Contact and Status Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Contact */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                WhatsApp Contact{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.contact}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        contact: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                placeholder="628123456789"
                                            />
                                            {formErrors.contact && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.contact}
                                                </p>
                                            )}
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Status{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        status: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            >
                                                <option value="active">
                                                    Active
                                                </option>
                                                <option value="inactive">
                                                    Inactive
                                                </option>
                                            </select>
                                            {formErrors.status && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.status}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="bg-black/30 border-t border-amber-500/30 px-6 py-4 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/50"
                                    >
                                        {partnershipToEdit
                                            ? "Update Partnership"
                                            : "Create Partnership"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 border border-red-500/50 rounded-xl shadow-2xl w-full max-w-md">
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
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
                                            Delete Partnership
                                        </h3>
                                        <p className="text-gray-400 text-sm mt-1">
                                            This action cannot be undone
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-6">
                                    Are you sure you want to delete{" "}
                                    <span className="font-semibold text-amber-400">
                                        {partnershipToDelete?.title}
                                    </span>
                                    ?
                                </p>

                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }
                                        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
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

export default Partnerships;
