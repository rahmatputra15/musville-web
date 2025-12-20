import { Head, Link, usePage, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TextEditor from "../../components/TextEditor";

const ProjectDetail = () => {
    const { project, flash } = usePage().props;
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [newBanner, setNewBanner] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [isUpdatingBanner, setIsUpdatingBanner] = useState(false);
    const [bannerError, setBannerError] = useState(null);

    const [showStatsModal, setShowStatsModal] = useState(false);
    const [statsForm, setStatsForm] = useState({
        name: project.name,
        total_unit: project.total_unit,
        unit_sold: project.unit_sold,
        status: project.status,
    });
    const [isUpdatingStats, setIsUpdatingStats] = useState(false);
    const [statsErrors, setStatsErrors] = useState({});

    const [showImageModal, setShowImageModal] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageCaption, setImageCaption] = useState("");
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [imageError, setImageError] = useState(null);

    const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [isDeletingImage, setIsDeletingImage] = useState(false);

    const [showVideoModal, setShowVideoModal] = useState(false);
    const [newVideo, setNewVideo] = useState(null);
    const [videoThumbnail, setVideoThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [videoForm, setVideoForm] = useState({
        title: "",
        description: "",
    });
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [videoErrors, setVideoErrors] = useState({});

    const [showDeleteVideoModal, setShowDeleteVideoModal] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);
    const [isDeletingVideo, setIsDeletingVideo] = useState(false);

    // Tambahkan state untuk form overview, facilities, area
    const [infoForm, setInfoForm] = useState({
        overview: project.overview || "",
        facilities: project.facilities || "",
        area: project.area || "",
    });
    const [infoErrors, setInfoErrors] = useState({});
    const [isInfoSubmitting, setIsInfoSubmitting] = useState(false);
    const [infoNotification, setInfoNotification] = useState(null);
    const [notification, setNotification] = useState(null);

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

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        setBannerError(null);

        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                setBannerError("Please select a valid image file");
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setBannerError("File size must be less than 2MB");
                return;
            }

            setNewBanner(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerSubmit = (e) => {
        e.preventDefault();
        if (!newBanner) return;

        setIsUpdatingBanner(true);
        const formData = new FormData();
        formData.append("banner", newBanner);
        formData.append("_method", "PUT");

        router.post(`/admin/projects/${project.slug}`, formData, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowBannerModal(false);
                setNewBanner(null);
                setBannerPreview(null);
                setBannerError(null);
                setIsUpdatingBanner(false);
            },
            onError: (errors) => {
                if (errors.banner) {
                    setBannerError(errors.banner);
                }
                setIsUpdatingBanner(false);
            },
        });
    };

    const closeBannerModal = () => {
        if (!isUpdatingBanner) {
            setBannerError(null);
            setShowBannerModal(false);
            setNewBanner(null);
            setBannerPreview(null);
        }
    };

    const handleStatsSubmit = (e) => {
        e.preventDefault();
        setIsUpdatingStats(true);
        setStatsErrors({});

        router.put(`/admin/projects/${project.slug}`, statsForm, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowStatsModal(false);
                setIsUpdatingStats(false);
            },
            onError: (errors) => {
                setStatsErrors(errors);
                setIsUpdatingStats(false);
            },
        });
    };

    const closeStatsModal = () => {
        if (!isUpdatingStats) {
            setShowStatsModal(false);
            setStatsForm({
                name: project.name,
                total_unit: project.total_unit,
                unit_sold: project.unit_sold,
                status: project.status,
            });
            setStatsErrors({});
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageError(null);

        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                setImageError("Please select a valid image file");
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setImageError("File size must be less than 2MB");
                return;
            }

            setNewImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageSubmit = (e) => {
        e.preventDefault();
        if (!newImage) return;

        setIsUploadingImage(true);
        const formData = new FormData();
        formData.append("image", newImage);
        formData.append("caption", imageCaption);

        router.post(`/admin/projects/${project.slug}/images`, formData, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowImageModal(false);
                setNewImage(null);
                setImagePreview(null);
                setImageCaption("");
                setImageError(null);
                setIsUploadingImage(false);
            },
            onError: (errors) => {
                if (errors.image) {
                    setImageError(errors.image);
                }
                setIsUploadingImage(false);
            },
        });
    };

    const closeImageModal = () => {
        if (!isUploadingImage) {
            setShowImageModal(false);
            setNewImage(null);
            setImagePreview(null);
            setImageCaption("");
            setImageError(null);
        }
    };

    const handleDeleteImage = (image, e) => {
        e.preventDefault();
        e.stopPropagation();
        setImageToDelete(image);
        setShowDeleteImageModal(true);
    };

    const confirmDeleteImage = () => {
        if (!imageToDelete) return;

        setIsDeletingImage(true);
        router.delete(
            `/admin/projects/${project.slug}/images/${imageToDelete.id}`,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteImageModal(false);
                    setImageToDelete(null);
                    setIsDeletingImage(false);
                },
                onError: () => {
                    setIsDeletingImage(false);
                },
            }
        );
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideoErrors({ ...videoErrors, video: null });

        if (file) {
            // Validate file type
            if (!file.type.startsWith("video/")) {
                setVideoErrors({
                    ...videoErrors,
                    video: "Please select a valid video file",
                });
                return;
            }

            // Validate file size (max 50MB)
            if (file.size > 50 * 1024 * 1024) {
                setVideoErrors({
                    ...videoErrors,
                    video: "File size must be less than 50MB",
                });
                return;
            }

            setNewVideo(file);
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setVideoErrors({ ...videoErrors, thumbnail: null });

        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                setVideoErrors({
                    ...videoErrors,
                    thumbnail: "Please select a valid image file",
                });
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setVideoErrors({
                    ...videoErrors,
                    thumbnail: "File size must be less than 2MB",
                });
                return;
            }

            setVideoThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoSubmit = (e) => {
        e.preventDefault();
        if (!newVideo) return;

        setIsUploadingVideo(true);
        const formData = new FormData();
        formData.append("video", newVideo);
        if (videoThumbnail) {
            formData.append("thumbnail", videoThumbnail);
        }
        formData.append("title", videoForm.title);
        formData.append("description", videoForm.description);

        router.post(`/admin/projects/${project.slug}/videos`, formData, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowVideoModal(false);
                setNewVideo(null);
                setVideoThumbnail(null);
                setThumbnailPreview(null);
                setVideoForm({ title: "", description: "" });
                setVideoErrors({});
                setIsUploadingVideo(false);
            },
            onError: (errors) => {
                setVideoErrors(errors);
                setIsUploadingVideo(false);
            },
        });
    };

    const closeVideoModal = () => {
        if (!isUploadingVideo) {
            setShowVideoModal(false);
            setNewVideo(null);
            setVideoThumbnail(null);
            setThumbnailPreview(null);
            setVideoForm({ title: "", description: "" });
            setVideoErrors({});
        }
    };

    const handleDeleteVideo = (video, e) => {
        e.preventDefault();
        e.stopPropagation();
        setVideoToDelete(video);
        setShowDeleteVideoModal(true);
    };

    const confirmDeleteVideo = () => {
        if (!videoToDelete) return;

        setIsDeletingVideo(true);
        router.delete(
            `/admin/projects/${project.slug}/videos/${videoToDelete.id}`,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteVideoModal(false);
                    setVideoToDelete(null);
                    setIsDeletingVideo(false);
                },
                onError: () => {
                    setIsDeletingVideo(false);
                },
            }
        );
    };

    const handleInfoChange = (e) => {
        setInfoForm({
            ...infoForm,
            [e.target.name]: e.target.value,
        });
    };

    // Untuk update info overview, facilities, area
    const handleInfoEditorChange = (name, value) => {
        setInfoForm({
            ...infoForm,
            [name]: value,
        });
    };

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setIsInfoSubmitting(true);
        setInfoNotification(null);
        setInfoErrors({});
        router.put(`/admin/projects/${project.slug}/update-info`, infoForm, {
            preserveScroll: true,
            onSuccess: () => {
                setInfoErrors({});
                setIsInfoSubmitting(false);
            },
            onError: (errors) => {
                setInfoErrors(errors);
                setIsInfoSubmitting(false);
            },
        });
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

    const remainingUnits = project.total_unit - project.unit_sold;
    const soldPercentage = (project.unit_sold / project.total_unit) * 100;

    return (
        <>
            <Head title={`${project.name} - Project Details`} />

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
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Link
                                href="/admin/projects"
                                className="p-2 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
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
                                    <path d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-amber-400">
                                    {project.name}
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Project Details and Media Gallery
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Project Info Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Banner Card */}
                        <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-amber-500/30 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-amber-400">
                                    Project Banner
                                </h2>
                                <button
                                    onClick={() => setShowBannerModal(true)}
                                    className="flex items-center gap-2 px-3 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors text-xs font-semibold"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Change Banner
                                </button>
                            </div>
                            <div className="p-4">
                                {project.banner ? (
                                    <img
                                        src={`/storage/${project.banner}`}
                                        alt={project.name}
                                        className="w-full h-64 object-cover rounded-lg border border-amber-500/30"
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-gray-800 rounded-lg border border-amber-500/30 flex items-center justify-center">
                                        <div className="text-center">
                                            <svg
                                                className="w-16 h-16 text-gray-600 mx-auto mb-2"
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
                                            <p className="text-gray-500">
                                                No banner image
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Project Statistics */}
                        <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-amber-500/30 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-amber-400">
                                    Project Statistics
                                </h2>
                                <button
                                    onClick={() => setShowStatsModal(true)}
                                    className="flex items-center gap-2 px-3 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors text-xs font-semibold"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit Info
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Status */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Status
                                    </label>
                                    {getStatusBadge(project.status)}
                                </div>

                                {/* Total Units */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Total Units
                                    </label>
                                    <p className="text-2xl font-bold text-white">
                                        {project.total_unit}
                                    </p>
                                </div>

                                {/* Units Sold */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Units Sold
                                    </label>
                                    <p className="text-2xl font-bold text-green-400">
                                        {project.unit_sold}
                                    </p>
                                </div>

                                {/* Remaining Units */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Remaining Units
                                    </label>
                                    <p className="text-2xl font-bold text-amber-400">
                                        {remainingUnits}
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Sales Progress
                                    </label>
                                    <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${soldPercentage}%`,
                                            }}
                                            transition={{
                                                duration: 1,
                                                ease: "easeOut",
                                            }}
                                            className="h-full bg-linear-to-r from-amber-500 to-amber-600"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {soldPercentage.toFixed(1)}% Sold
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Info Card: Overview, Facilities, Area */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden mb-8">
                        <form
                            id="project-info-form"
                            onSubmit={handleInfoSubmit}
                        >
                            <div className="p-4 border-b border-amber-500/30 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-amber-400">
                                    Project Information
                                </h2>
                                <button
                                    type="submit"
                                    form="project-info-form"
                                    className="flex gap-1 px-3 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors text-xs"
                                    disabled={isInfoSubmitting}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    {isInfoSubmitting
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Overview
                                    </label>
                                    <TextEditor
                                        content={infoForm.overview}
                                        onChange={(content) =>
                                            handleInfoEditorChange(
                                                "overview",
                                                content
                                            )
                                        }
                                        placeholder="Project overview..."
                                    />
                                    {infoErrors.overview && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {infoErrors.overview}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Facilities
                                    </label>
                                    <TextEditor
                                        content={infoForm.facilities}
                                        onChange={(content) =>
                                            handleInfoEditorChange(
                                                "facilities",
                                                content
                                            )
                                        }
                                        placeholder="Project facilities..."
                                    />
                                    {infoErrors.facilities && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {infoErrors.facilities}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Area
                                    </label>
                                    <TextEditor
                                        content={infoForm.area}
                                        onChange={(content) =>
                                            handleInfoEditorChange(
                                                "area",
                                                content
                                            )
                                        }
                                        placeholder="Project area..."
                                    />
                                    {infoErrors.area && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {infoErrors.area}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Images Gallery */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden mb-8">
                        <div className="p-4 border-b border-amber-500/30 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold text-amber-400">
                                    Images Gallery
                                </h2>
                                <span className="text-sm text-gray-400">
                                    {project.images.length} images
                                </span>
                            </div>
                            <button
                                onClick={() => setShowImageModal(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors text-xs font-semibold"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 4v16m8-8H4" />
                                </svg>
                                Add Photo
                            </button>
                        </div>
                        <div className="p-6">
                            {project.images.length > 0 ? (
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {project.images.map((image, index) => (
                                        <div
                                            key={image.id}
                                            className="group relative aspect-square"
                                        >
                                            <a
                                                href={`/storage/${image.image_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full h-full overflow-hidden border border-amber-500/30 hover:border-amber-500 transition-colors cursor-pointer"
                                            >
                                                <img
                                                    src={`/storage/${image.image_path}`}
                                                    alt={
                                                        image.caption ||
                                                        `Image ${index + 1}`
                                                    }
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                {image.caption && (
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-2">
                                                        <p className="text-xs text-white truncate">
                                                            {image.caption}
                                                        </p>
                                                    </div>
                                                )}
                                                {/* Click indicator overlay */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <svg
                                                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </div>
                                            </a>
                                            {/* Delete Button */}
                                            <button
                                                onClick={(e) =>
                                                    handleDeleteImage(image, e)
                                                }
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                title="Delete image"
                                            >
                                                <svg
                                                    className="w-4 h-4 text-white"
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
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg
                                        className="w-16 h-16 text-gray-600 mx-auto mb-4"
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
                                    <p className="text-gray-500">
                                        No images available for this project
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Videos Gallery */}
                    <div className="bg-gray-900/50 border border-amber-500/30 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-amber-500/30 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold text-amber-400">
                                    Videos Gallery
                                </h2>
                                <span className="text-sm text-gray-400">
                                    {project.videos.length} videos
                                </span>
                            </div>
                            <button
                                onClick={() => setShowVideoModal(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors text-xs font-semibold"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 4v16m8-8H4" />
                                </svg>
                                Add Video
                            </button>
                        </div>
                        <div className="p-6">
                            {project.videos.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {project.videos.map((video, index) => (
                                        <div
                                            key={video.id}
                                            className="group relative rounded-lg overflow-hidden border border-amber-500/30 hover:border-amber-500 transition-colors bg-black"
                                        >
                                            {/* Delete Button */}
                                            <button
                                                onClick={(e) =>
                                                    handleDeleteVideo(video, e)
                                                }
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                title="Delete video"
                                            >
                                                <svg
                                                    className="w-4 h-4 text-white"
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
                                            {video.thumbnail ? (
                                                <a
                                                    href={`/storage/${video.video_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block relative aspect-video cursor-pointer"
                                                >
                                                    <img
                                                        src={`/storage/${video.thumbnail}`}
                                                        alt={
                                                            video.title ||
                                                            `Video ${index + 1}`
                                                        }
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Play Button Overlay */}
                                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                                                        <div className="w-16 h-16 bg-amber-500 group-hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors shadow-lg">
                                                            <svg
                                                                className="w-6 h-6 text-gray-900"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </a>
                                            ) : (
                                                <video
                                                    src={`/storage/${video.video_path}`}
                                                    controls
                                                    className="w-full aspect-video"
                                                />
                                            )}
                                            {(video.title ||
                                                video.description) && (
                                                <div className="p-4 bg-gray-900/90">
                                                    {video.title && (
                                                        <h3 className="text-white font-semibold mb-1">
                                                            {video.title}
                                                        </h3>
                                                    )}
                                                    {video.description && (
                                                        <p className="text-sm text-gray-400 line-clamp-2">
                                                            {video.description}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg
                                        className="w-16 h-16 text-gray-600 mx-auto mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <p className="text-gray-500">
                                        No videos available for this project
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Change Banner Modal */}
                {showBannerModal && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={closeBannerModal}
                    >
                        <div
                            className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-amber-400 mb-6">
                                Change Project Banner
                            </h3>

                            <form onSubmit={handleBannerSubmit}>
                                {/* Current Banner Preview */}
                                {project.banner && !bannerPreview && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Current Banner
                                        </label>
                                        <img
                                            src={`/storage/${project.banner}`}
                                            alt="Current banner"
                                            className="w-full h-48 object-cover rounded-lg border border-amber-500/30"
                                        />
                                    </div>
                                )}

                                {/* New Banner Preview */}
                                {bannerPreview && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            New Banner Preview
                                        </label>
                                        <img
                                            src={bannerPreview}
                                            alt="New banner preview"
                                            className="w-full h-48 object-cover rounded-lg border border-amber-500/30"
                                        />
                                    </div>
                                )}

                                {/* File Input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Select New Banner Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBannerChange}
                                        className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-gray-900 hover:file:bg-amber-600 transition-colors ${
                                            bannerError
                                                ? "border-red-500"
                                                : "border-amber-500/30"
                                        }`}
                                        disabled={isUpdatingBanner}
                                    />
                                    {bannerError && (
                                        <p className="text-sm text-red-400 mt-2">
                                            {bannerError}
                                        </p>
                                    )}
                                    {!bannerError && (
                                        <p className="text-xs text-gray-400 mt-2">
                                            Recommended: 1200x600px or larger.
                                            Max size: 2MB
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 justify-end">
                                    <button
                                        type="button"
                                        onClick={closeBannerModal}
                                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                        disabled={isUpdatingBanner}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={
                                            !newBanner || isUpdatingBanner
                                        }
                                    >
                                        {isUpdatingBanner
                                            ? "Updating..."
                                            : "Update Banner"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Statistics Modal */}
                {showStatsModal && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={closeStatsModal}
                    >
                        <div
                            className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-amber-400 mb-6">
                                Edit Project Information
                            </h3>

                            <form onSubmit={handleStatsSubmit}>
                                <div className="space-y-4">
                                    {/* Project Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Project Name
                                        </label>
                                        <input
                                            type="text"
                                            value={statsForm.name}
                                            onChange={(e) =>
                                                setStatsForm({
                                                    ...statsForm,
                                                    name: e.target.value,
                                                })
                                            }
                                            className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                                statsErrors.name
                                                    ? "border-red-500"
                                                    : "border-amber-500/30"
                                            }`}
                                            disabled={isUpdatingStats}
                                        />
                                        {statsErrors.name && (
                                            <p className="text-sm text-red-400 mt-1">
                                                {statsErrors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Total Units */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Total Units
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={statsForm.total_unit}
                                            onChange={(e) =>
                                                setStatsForm({
                                                    ...statsForm,
                                                    total_unit: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                                statsErrors.total_unit
                                                    ? "border-red-500"
                                                    : "border-amber-500/30"
                                            }`}
                                            disabled={isUpdatingStats}
                                        />
                                        {statsErrors.total_unit && (
                                            <p className="text-sm text-red-400 mt-1">
                                                {statsErrors.total_unit}
                                            </p>
                                        )}
                                    </div>

                                    {/* Units Sold */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Units Sold
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={statsForm.unit_sold}
                                            onChange={(e) =>
                                                setStatsForm({
                                                    ...statsForm,
                                                    unit_sold: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                                statsErrors.unit_sold
                                                    ? "border-red-500"
                                                    : "border-amber-500/30"
                                            }`}
                                            disabled={isUpdatingStats}
                                        />
                                        {statsErrors.unit_sold && (
                                            <p className="text-sm text-red-400 mt-1">
                                                {statsErrors.unit_sold}
                                            </p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={statsForm.status}
                                                onChange={(e) =>
                                                    setStatsForm({
                                                        ...statsForm,
                                                        status: e.target.value,
                                                    })
                                                }
                                                className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                                    statsErrors.status
                                                        ? "border-red-500"
                                                        : "border-amber-500/30"
                                                }`}
                                                disabled={isUpdatingStats}
                                            >
                                                <option value="available">
                                                    Available
                                                </option>
                                                <option value="sold">
                                                    Sold
                                                </option>
                                                <option value="coming_soon">
                                                    Coming Soon
                                                </option>
                                            </select>
                                            <svg
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {statsErrors.status && (
                                            <p className="text-sm text-red-400 mt-1">
                                                {statsErrors.status}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 justify-end mt-6">
                                    <button
                                        type="button"
                                        onClick={closeStatsModal}
                                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                        disabled={isUpdatingStats}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isUpdatingStats}
                                    >
                                        {isUpdatingStats
                                            ? "Updating..."
                                            : "Update Information"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add Image Modal */}
                {showImageModal && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={closeImageModal}
                    >
                        <div
                            className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-amber-400 mb-6">
                                Add New Image
                            </h3>

                            <form onSubmit={handleImageSubmit}>
                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Image Preview
                                        </label>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-64 object-cover rounded-lg border border-amber-500/30"
                                        />
                                    </div>
                                )}

                                {/* File Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Select Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-gray-900 hover:file:bg-amber-600 transition-colors ${
                                            imageError
                                                ? "border-red-500"
                                                : "border-amber-500/30"
                                        }`}
                                        disabled={isUploadingImage}
                                    />
                                    {imageError && (
                                        <p className="text-sm text-red-400 mt-2">
                                            {imageError}
                                        </p>
                                    )}
                                    {!imageError && (
                                        <p className="text-xs text-gray-400 mt-2">
                                            Recommended: Square format (1:1
                                            ratio). Max size: 2MB
                                        </p>
                                    )}
                                </div>

                                {/* Caption Input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Caption (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={imageCaption}
                                        onChange={(e) =>
                                            setImageCaption(e.target.value)
                                        }
                                        placeholder="Enter image caption"
                                        className="w-full px-4 py-2 bg-gray-800 border border-amber-500/30 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        disabled={isUploadingImage}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 justify-end">
                                    <button
                                        type="button"
                                        onClick={closeImageModal}
                                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                        disabled={isUploadingImage}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!newImage || isUploadingImage}
                                    >
                                        {isUploadingImage
                                            ? "Uploading..."
                                            : "Upload Image"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Image Confirmation Modal */}
                {showDeleteImageModal && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() =>
                            !isDeletingImage && setShowDeleteImageModal(false)
                        }
                    >
                        <div
                            className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-amber-400 mb-4">
                                Confirm Delete Image
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Are you sure you want to delete this image? This
                                action cannot be undone.
                            </p>
                            {imageToDelete?.caption && (
                                <div className="mb-4 p-3 bg-gray-800 rounded border border-amber-500/20">
                                    <p className="text-sm text-gray-400">
                                        Caption:
                                    </p>
                                    <p className="text-gray-200">
                                        {imageToDelete.caption}
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={() =>
                                        setShowDeleteImageModal(false)
                                    }
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                                    disabled={isDeletingImage}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteImage}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                                    disabled={isDeletingImage}
                                >
                                    {isDeletingImage ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Video Modal */}
                {showVideoModal && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={closeVideoModal}
                    >
                        <div
                            className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-amber-400 mb-6">
                                Add New Video
                            </h3>

                            <form onSubmit={handleVideoSubmit}>
                                {/* Video File Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Select Video{" "}
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoChange}
                                        className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-gray-900 hover:file:bg-amber-600 transition-colors ${
                                            videoErrors.video
                                                ? "border-red-500"
                                                : "border-amber-500/30"
                                        }`}
                                        disabled={isUploadingVideo}
                                    />
                                    {videoErrors.video && (
                                        <p className="text-sm text-red-400 mt-2">
                                            {videoErrors.video}
                                        </p>
                                    )}
                                    {!videoErrors.video && (
                                        <p className="text-xs text-gray-400 mt-2">
                                            Max size: 50MB. Supported formats:
                                            MP4, WebM, OGG
                                        </p>
                                    )}
                                </div>

                                {/* Thumbnail Preview */}
                                {thumbnailPreview && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Thumbnail Preview
                                        </label>
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="w-full h-48 object-cover rounded-lg border border-amber-500/30"
                                        />
                                    </div>
                                )}

                                {/* Thumbnail Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Thumbnail (Optional)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-gray-900 hover:file:bg-amber-600 transition-colors ${
                                            videoErrors.thumbnail
                                                ? "border-red-500"
                                                : "border-amber-500/30"
                                        }`}
                                        disabled={isUploadingVideo}
                                    />
                                    {videoErrors.thumbnail && (
                                        <p className="text-sm text-red-400 mt-2">
                                            {videoErrors.thumbnail}
                                        </p>
                                    )}
                                    {!videoErrors.thumbnail && (
                                        <p className="text-xs text-gray-400 mt-2">
                                            Recommended: 16:9 ratio. Max size:
                                            2MB
                                        </p>
                                    )}
                                </div>

                                {/* Title Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Title (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={videoForm.title}
                                        onChange={(e) =>
                                            setVideoForm({
                                                ...videoForm,
                                                title: e.target.value,
                                            })
                                        }
                                        placeholder="Enter video title"
                                        className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                            videoErrors.title
                                                ? "border-red-500"
                                                : "border-amber-500/30"
                                        }`}
                                        disabled={isUploadingVideo}
                                    />
                                    {videoErrors.title && (
                                        <p className="text-sm text-red-400 mt-1">
                                            {videoErrors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Description Input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        value={videoForm.description}
                                        onChange={(e) =>
                                            setVideoForm({
                                                ...videoForm,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Enter video description"
                                        rows="3"
                                        className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                            videoErrors.description
                                                ? "border-red-500"
                                                : "border-amber-500/30"
                                        }`}
                                        disabled={isUploadingVideo}
                                    />
                                    {videoErrors.description && (
                                        <p className="text-sm text-red-400 mt-1">
                                            {videoErrors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 justify-end">
                                    <button
                                        type="button"
                                        onClick={closeVideoModal}
                                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                        disabled={isUploadingVideo}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!newVideo || isUploadingVideo}
                                    >
                                        {isUploadingVideo
                                            ? "Uploading..."
                                            : "Upload Video"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Video Confirmation Modal */}
                {showDeleteVideoModal && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() =>
                            !isDeletingVideo && setShowDeleteVideoModal(false)
                        }
                    >
                        <div
                            className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-amber-400 mb-4">
                                Confirm Delete Video
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Are you sure you want to delete this video? This
                                action cannot be undone.
                            </p>
                            {(videoToDelete?.title ||
                                videoToDelete?.description) && (
                                <div className="mb-4 p-3 bg-gray-800 rounded border border-amber-500/20">
                                    {videoToDelete?.title && (
                                        <>
                                            <p className="text-sm text-gray-400">
                                                Title:
                                            </p>
                                            <p className="text-gray-200 mb-2">
                                                {videoToDelete.title}
                                            </p>
                                        </>
                                    )}
                                    {videoToDelete?.description && (
                                        <>
                                            <p className="text-sm text-gray-400">
                                                Description:
                                            </p>
                                            <p className="text-gray-200 line-clamp-2">
                                                {videoToDelete.description}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={() =>
                                        setShowDeleteVideoModal(false)
                                    }
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                                    disabled={isDeletingVideo}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteVideo}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                                    disabled={isDeletingVideo}
                                >
                                    {isDeletingVideo ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </DashboardLayout>
        </>
    );
};

export default ProjectDetail;
