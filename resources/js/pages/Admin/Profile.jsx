import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TextEditor from "../../components/TextEditor";

const Profile = () => {
    const { profile, flash } = usePage().props;
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        starter: "",
        starter_company: "",
        business_unit: "",
        our_story: "",
        core_business: "",
        our_commitment: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load existing profile data
    useEffect(() => {
        if (profile) {
            setFormData({
                starter: profile.starter || "",
                starter_company: profile.starter_company || "",
                business_unit: profile.business_unit || "",
                our_story: profile.our_story || "",
                core_business: profile.core_business || "",
                our_commitment: profile.our_commitment || "",
            });
        }
    }, [profile]);

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

        router.post("/admin/about-us/profile", formData, {
            preserveScroll: true,
            onSuccess: () => {
                setFormErrors({});
                setIsSubmitting(false);
                setNotification({
                    type: "success",
                    message: profile
                        ? "Profile updated successfully"
                        : "Profile created successfully",
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
            <Head title="Profile - Musville" />

            <DashboardLayout activePage="/admin/about-us/profile">
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
                            Profile Management
                        </h1>
                        <p className="text-gray-400">
                            Manage company profile information displayed on
                            About Us page
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                        <form onSubmit={handleSubmit}>
                            {/* Form Body */}
                            <div className="p-6 space-y-6">
                                {/* First Row - Grid 3 Columns */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Starter Year */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Starter Year{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1900"
                                            max={new Date().getFullYear() + 10}
                                            value={formData.starter}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    starter: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            placeholder="e.g. 2010"
                                        />
                                        {formErrors.starter && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.starter}
                                            </p>
                                        )}
                                    </div>

                                    {/* Company Starter Year */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Company Starter Year{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1900"
                                            max={new Date().getFullYear() + 10}
                                            value={formData.starter_company}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    starter_company:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            placeholder="e.g. 2015"
                                        />
                                        {formErrors.starter_company && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.starter_company}
                                            </p>
                                        )}
                                    </div>

                                    {/* Business Unit */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Business Unit{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.business_unit}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    business_unit:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            placeholder="Enter business unit"
                                        />
                                        {formErrors.business_unit && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {formErrors.business_unit}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Our Story */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Our Story{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <TextEditor
                                        content={formData.our_story}
                                        onChange={(content) =>
                                            setFormData({
                                                ...formData,
                                                our_story: content,
                                            })
                                        }
                                        placeholder="Enter the company story"
                                    />
                                    {formErrors.our_story && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {formErrors.our_story}
                                        </p>
                                    )}
                                </div>

                                {/* Core Business */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Core Business{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <TextEditor
                                        content={formData.core_business}
                                        onChange={(content) =>
                                            setFormData({
                                                ...formData,
                                                core_business: content,
                                            })
                                        }
                                        placeholder="Enter core business information"
                                    />
                                    {formErrors.core_business && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {formErrors.core_business}
                                        </p>
                                    )}
                                </div>

                                {/* Our Commitment */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Our Commitment{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <TextEditor
                                        content={formData.our_commitment}
                                        onChange={(content) =>
                                            setFormData({
                                                ...formData,
                                                our_commitment: content,
                                            })
                                        }
                                        placeholder="Enter company commitment"
                                    />
                                    {formErrors.our_commitment && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {formErrors.our_commitment}
                                        </p>
                                    )}
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
                                        : profile
                                        ? "Update Profile"
                                        : "Create Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Profile;
