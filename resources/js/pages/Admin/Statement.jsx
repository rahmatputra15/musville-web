import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Statement = () => {
    const { statement, flash } = usePage().props;
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        image: null,
        statement: "",
        name: "",
        position: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load existing statement data
    useEffect(() => {
        if (statement) {
            setFormData({
                image: null,
                statement: statement.statement || "",
                name: statement.name || "",
                position: statement.position || "",
            });
            setImagePreview(statement.image_url);
        }
    }, [statement]);

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
        data.append("statement", formData.statement);
        data.append("name", formData.name);
        data.append("position", formData.position);
        if (formData.image) {
            data.append("image", formData.image);
        }

        router.post("/admin/about-us/statement", data, {
            preserveScroll: true,
            onSuccess: () => {
                setFormErrors({});
                setIsSubmitting(false);
                setNotification({
                    type: "success",
                    message: statement
                        ? "Statement updated successfully"
                        : "Statement created successfully",
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
            <Head title="Statement - Musville" />

            <DashboardLayout activePage="/admin/about-us/statement">
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
                            Statement Management
                        </h1>
                        <p className="text-gray-400">
                            Manage the company statement displayed on About Us
                            page
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                        <form onSubmit={handleSubmit}>
                            {/* Form Body */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column - Image */}
                                    <div className="lg:col-span-1">
                                        <div className="sticky top-6">
                                            <label className="block text-sm font-medium text-gray-300 mb-4">
                                                Profile Image
                                                {!statement && (
                                                    <span className="text-red-500">
                                                        {" "}
                                                        *
                                                    </span>
                                                )}
                                            </label>

                                            {/* Circle Image Preview */}
                                            <div className="flex flex-col items-center space-y-4">
                                                <div className="relative">
                                                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-amber-500/30 bg-gray-800/50">
                                                        {imagePreview ? (
                                                            <img
                                                                src={
                                                                    imagePreview
                                                                }
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <div className="text-center">
                                                                    <svg
                                                                        className="w-20 h-20 mx-auto text-gray-600 mb-2"
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="1.5"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                    <p className="text-gray-500 text-sm">
                                                                        No Image
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Upload Button */}
                                                <div className="w-full">
                                                    <input
                                                        type="file"
                                                        id="image-upload"
                                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="image-upload"
                                                        className="block w-full px-4 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white text-center rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all cursor-pointer"
                                                    >
                                                        Choose Image
                                                    </label>
                                                    <p className="text-gray-500 text-xs mt-2 text-center">
                                                        Max 2MB
                                                        (jpeg/jpg/png/webp)
                                                    </p>
                                                    {formErrors.image && (
                                                        <p className="mt-2 text-sm text-red-500 text-center">
                                                            {formErrors.image}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Form Fields */}
                                    <div className="lg:col-span-2 space-y-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Name{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                placeholder="Enter name"
                                            />
                                            {formErrors.name && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Position */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Position{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.position}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        position:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                placeholder="Enter position"
                                            />
                                            {formErrors.position && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.position}
                                                </p>
                                            )}
                                        </div>

                                        {/* Statement */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Statement{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <textarea
                                                value={formData.statement}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        statement:
                                                            e.target.value,
                                                    })
                                                }
                                                rows="12"
                                                className="w-full px-4 py-2 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 scrollbar-thin resize-none"
                                                placeholder="Enter the company statement"
                                            />
                                            {formErrors.statement && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.statement}
                                                </p>
                                            )}
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
                                        : statement
                                        ? "Update Statement"
                                        : "Create Statement"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Statement;
