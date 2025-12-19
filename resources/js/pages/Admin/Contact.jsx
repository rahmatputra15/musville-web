import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Contact = () => {
    const { contact, flash } = usePage().props;
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        address: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        youtube: "",
        monfri: "",
        sat: "",
        sun: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load existing contact data
    useEffect(() => {
        if (contact) {
            setFormData({
                email: contact.email || "",
                phone: contact.phone || "",
                address: contact.address || "",
                facebook: contact.facebook || "",
                instagram: contact.instagram || "",
                tiktok: contact.tiktok || "",
                youtube: contact.youtube || "",
                monfri: contact.monfri || "",
                sat: contact.sat || "",
                sun: contact.sun || "",
            });
        }
    }, [contact]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post("/admin/contact", formData, {
            preserveScroll: true,
            onSuccess: () => {
                setFormErrors({});
                setIsSubmitting(false);
                setNotification({
                    type: "success",
                    message: contact
                        ? "Contact information updated successfully"
                        : "Contact information created successfully",
                });
            },
            onError: (errors) => {
                setFormErrors(errors);
                setIsSubmitting(false);
            },
        });
    };

    return (
        <>
            <Head title="Contact - Musville" />

            <DashboardLayout activePage="/admin/contact">
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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-amber-400 mb-2">
                            Contact Information
                        </h1>
                        <p className="text-gray-400">
                            Manage contact information displayed on the website
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                        <form onSubmit={handleSubmit}>
                            {/* Form Body */}
                            <div className="p-6">
                                <div className="space-y-6">
                                    {/* Basic Contact Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Email{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                placeholder="Enter email address"
                                            />
                                            {formErrors.email && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Phone{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                placeholder="Enter phone number"
                                            />
                                            {formErrors.phone && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Address{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    address: e.target.value,
                                                })
                                            }
                                            rows="3"
                                            className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 scrollbar-thin resize-none"
                                            placeholder="Enter company address"
                                        />
                                        {formErrors.address && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.address}
                                            </p>
                                        )}
                                    </div>

                                    {/* Social Media */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-amber-400 mb-4">
                                            Social Media
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Facebook */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Facebook URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.facebook}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            facebook:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    placeholder="https://facebook.com/..."
                                                />
                                                {formErrors.facebook && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.facebook}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Instagram */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Instagram URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.instagram}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            instagram:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    placeholder="https://instagram.com/..."
                                                />
                                                {formErrors.instagram && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.instagram}
                                                    </p>
                                                )}
                                            </div>

                                            {/* TikTok */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    TikTok URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.tiktok}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            tiktok: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    placeholder="https://tiktok.com/..."
                                                />
                                                {formErrors.tiktok && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.tiktok}
                                                    </p>
                                                )}
                                            </div>

                                            {/* YouTube */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    YouTube URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.youtube}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            youtube:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    placeholder="https://youtube.com/..."
                                                />
                                                {formErrors.youtube && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.youtube}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Operating Hours */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-amber-400 mb-4">
                                            Operating Hours
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Monday - Friday */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Monday - Friday
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.monfri}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            monfri: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    placeholder="08:00 - 17:00"
                                                />
                                                {formErrors.monfri && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.monfri}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Saturday */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Saturday
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.sat}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            sat: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    placeholder="09:00 - 15:00"
                                                />
                                                {formErrors.sat && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.sat}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Sunday */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Sunday
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.sun}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            sun: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    placeholder="Closed"
                                                />
                                                {formErrors.sun && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.sun}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Footer */}
                            <div className="bg-black/30 border-t border-amber-500/30 px-6 py-4 flex items-center justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/50"
                                >
                                    {isSubmitting
                                        ? "Saving..."
                                        : contact
                                        ? "Update Contact"
                                        : "Create Contact"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Contact;
