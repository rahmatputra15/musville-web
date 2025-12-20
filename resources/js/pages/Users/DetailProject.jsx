import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UsersLayout from "../../components/Users/UsersLayout";

const DetailProject = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const openGallery = (index = 0) => {
        setCurrentSlideIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSlideIndex(0);
    };

    const nextSlide = () => {
        setCurrentSlideIndex((prev) =>
            prev === project.gallery.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlideIndex((prev) =>
            prev === 0 ? project.gallery.length - 1 : prev - 1
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "available":
                return "bg-green-500";
            case "sold out":
                return "bg-red-500";
            case "coming soon":
                return "bg-yellow-500";
            default:
                return "bg-gray-500";
        }
    };

    console.log(project);

    return (
        <>
            <Head title={`${project.name} - Musville`}>
                <meta
                    name="description"
                    content={`${project.name} - ${project.status}. ${project.unitsSold}/${project.unitsTotal} units sold.`}
                />
                <meta
                    name="keywords"
                    content={`musville, ${project.slug}, property, real estate, shariah, Indonesia`}
                />
                <meta
                    property="og:title"
                    content={`${project.name} - Musville`}
                />
                <meta
                    property="og:description"
                    content={`${project.name} - ${project.status}. ${project.unitsSold}/${project.unitsTotal} units sold.`}
                />
                <meta property="og:image" content={project.image} />
            </Head>

            <UsersLayout activePage="projects">
                {/* Banner Section */}
                <section className="relative h-96 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/60 z-10"></div>
                    <img
                        src={project.image}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-20 h-full flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center px-4"
                        >
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Back to Projects
                            </Link>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                {project.name}
                            </h1>
                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                <span
                                    className={`${getStatusColor(
                                        project.status
                                    )} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg`}
                                >
                                    {project.status}
                                </span>
                                <span className="text-gray-200 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                                    {project.unitsSold}/{project.unitsTotal}{" "}
                                    Units Sold
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Project Stats */}
                <section className="py-16 bg-linear-to-b from-gray-900 to-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                        >
                            <div className="group">
                                <div className="text-5xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                                    {project.unitsTotal}
                                </div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">
                                    Total Units
                                </div>
                            </div>
                            <div className="group">
                                <div className="text-5xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                                    {project.unitsSold}
                                </div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">
                                    Units Sold
                                </div>
                            </div>
                            <div className="group">
                                <div className="text-5xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                                    {Math.round(
                                        (project.unitsSold /
                                            project.unitsTotal) *
                                            100
                                    )}
                                    %
                                </div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">
                                    Sold Progress
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Project Info Section */}
                <section className="py-16 bg-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold text-amber-500 mb-4">
                                Project Information
                            </h2>
                            <p className="text-gray-400">
                                Complete details about the project
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-linear-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-lg p-6 hover:border-amber-500/50 transition"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-amber-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-amber-500">
                                        Status
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-xl font-semibold">
                                    {project.status}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-linear-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-lg p-6 hover:border-amber-500/50 transition"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-amber-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-amber-500">
                                        Total Units
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-xl font-semibold">
                                    {project.unitsTotal} units
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-linear-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-lg p-6 hover:border-amber-500/50 transition"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-amber-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-amber-500">
                                        Units Sold
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-xl font-semibold">
                                    {project.unitsSold} units
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-linear-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-lg p-6 hover:border-amber-500/50 transition"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-amber-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-amber-500">
                                        Available
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-xl font-semibold">
                                    {project.unitsTotal - project.unitsSold}{" "}
                                    units
                                </p>
                            </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-12 bg-linear-to-br from-gray-900 to-gray-800 border border-amber-500/30 rounded-lg shadow-lg shadow-amber-500/20 p-8"
                        >
                            <h3 className="text-2xl font-semibold text-amber-500 mb-6 text-center">
                                Sales Progress
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{
                                            width: `${
                                                (project.unitsSold /
                                                    project.unitsTotal) *
                                                100
                                            }%`,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.7 }}
                                        className="h-full bg-linear-to-r from-amber-500 to-yellow-600 transition-all duration-500"
                                    />
                                </div>
                                <span className="text-amber-500 font-bold text-xl min-w-20 text-right">
                                    {Math.round(
                                        (project.unitsSold /
                                            project.unitsTotal) *
                                            100
                                    )}
                                    %
                                </span>
                            </div>
                        </motion.div>

                        {/* Overview, Facilities, Area Cards */}
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Overview Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-linear-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-lg p-6 shadow-lg shadow-amber-500/10"
                            >
                                <h3 className="text-xl font-bold text-amber-500 mb-3 text-center">
                                    Property Overview
                                </h3>
                                <div
                                    className="text-gray-300 prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: project.overview
                                            ? project.overview
                                                  .replace(
                                                      /<ul(.*?)>/gi,
                                                      '<ul class="list-disc pl-5"$1>'
                                                  )
                                                  .replace(
                                                      /<ol(.*?)>/gi,
                                                      '<ol class="list-decimal pl-5"$1>'
                                                  )
                                            : "",
                                    }}
                                />
                            </motion.div>
                            {/* Facilities Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-linear-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-lg p-6 shadow-lg shadow-amber-500/10"
                            >
                                <h3 className="text-xl font-bold text-amber-500 mb-3 text-center">
                                    Nearby Facilities
                                </h3>
                                <div
                                    className="text-gray-300 prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: project.facilities
                                            ? project.facilities
                                                  .replace(
                                                      /<ul(.*?)>/gi,
                                                      '<ul class="list-disc pl-5"$1>'
                                                  )
                                                  .replace(
                                                      /<ol(.*?)>/gi,
                                                      '<ol class="list-decimal pl-5"$1>'
                                                  )
                                            : "",
                                    }}
                                />
                            </motion.div>
                            {/* Area Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-linear-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-lg p-6 shadow-lg shadow-amber-500/10"
                            >
                                <h3 className="text-xl font-bold text-amber-500 mb-3 text-center">
                                    Area Features
                                </h3>
                                <div
                                    className="text-gray-300 prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: project.area
                                            ? project.area
                                                  .replace(
                                                      /<ul(.*?)>/gi,
                                                      '<ul class="list-disc pl-5"$1>'
                                                  )
                                                  .replace(
                                                      /<ol(.*?)>/gi,
                                                      '<ol class="list-decimal pl-5"$1>'
                                                  )
                                            : "",
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-16 bg-linear-to-b from-gray-900 to-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold text-amber-500 mb-4">
                                Project Gallery
                            </h2>
                            <p className="text-gray-400">
                                Explore the beauty of {project.name}
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {project.gallery.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.05,
                                    }}
                                    className="aspect-square rounded-lg overflow-hidden shadow-lg shadow-amber-500/10 border border-amber-500/20 cursor-pointer group hover:shadow-xl hover:shadow-amber-500/30 hover:border-amber-500/50 transition-all"
                                    onClick={() => openGallery(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.name} - Image ${
                                            index + 1
                                        }`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                            onClick={closeModal}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="relative max-w-6xl w-full mt-3"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute -top-12 right-0 text-white hover:text-amber-500 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                {/* Image Container */}
                                <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-amber-500/30">
                                    <motion.img
                                        key={currentSlideIndex}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        src={project.gallery[currentSlideIndex]}
                                        alt={`${project.name} - Slide ${
                                            currentSlideIndex + 1
                                        }`}
                                        className="w-full h-[70vh] object-cover"
                                    />

                                    {/* Navigation Buttons */}
                                    {project.gallery.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevSlide}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-amber-500/80 text-white p-3 rounded-full transition"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 19l-7-7 7-7"
                                                    />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={nextSlide}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-amber-500/80 text-white p-3 rounded-full transition"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>
                                        </>
                                    )}

                                    {/* Slide Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                                        {currentSlideIndex + 1} /{" "}
                                        {project.gallery.length}
                                    </div>
                                </div>

                                {/* Thumbnail Navigation */}
                                <div className="mt-4 bg-gray-900/50 rounded-lg p-3 border border-amber-500/20">
                                    <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-800 pb-2">
                                        {project.gallery.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setCurrentSlideIndex(index)
                                                }
                                                className={`shrink-0 w-24 h-20 m-1 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                                    index === currentSlideIndex
                                                        ? "border-amber-500 scale-105 shadow-lg shadow-amber-500/50"
                                                        : "border-gray-700 opacity-60 hover:opacity-100 hover:border-amber-500/50"
                                                }`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Thumbnail ${
                                                        index + 1
                                                    }`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </UsersLayout>
        </>
    );
};

export default DetailProject;
