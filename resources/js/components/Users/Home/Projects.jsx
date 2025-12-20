import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";

const Projects = ({ projects = [] }) => {
    const [activeProject, setActiveProject] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectGallery, setSelectedProjectGallery] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const openGallery = (gallery) => {
        setSelectedProjectGallery(gallery);
        setCurrentSlideIndex(0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProjectGallery([]);
        setCurrentSlideIndex(0);
    };

    const nextSlide = () => {
        setCurrentSlideIndex((prev) =>
            prev === selectedProjectGallery.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlideIndex((prev) =>
            prev === 0 ? selectedProjectGallery.length - 1 : prev - 1
        );
    };

    return (
        <section
            id="projects"
            className="py-16 bg-linear-to-b from-gray-900 to-black"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-amber-500 mb-4">
                        Our Projects
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Explore our premium property developments
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-900 border border-amber-500/20 rounded-lg shadow-lg shadow-amber-500/10 overflow-hidden hover:shadow-xl hover:shadow-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer"
                        >
                            <div className="relative h-64 bg-gray-200">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            project.status === "Available"
                                                ? "bg-green-500 text-white"
                                                : project.status === "Sold Out"
                                                ? "bg-red-500 text-white"
                                                : "bg-yellow-500 text-white"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-amber-500 mb-2">
                                    {project.name}
                                </h3>
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                                        <span>Units Sold</span>
                                        <span>
                                            {project.unitsSold} /{" "}
                                            {project.unitsTotal}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="bg-linear-to-r from-amber-500 to-yellow-600 h-2.5 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${
                                                    (project.unitsSold /
                                                        project.unitsTotal) *
                                                    100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            openGallery(project.gallery)
                                        }
                                        className="flex-1 bg-linear-to-r from-amber-500 to-yellow-600 text-black font-semibold py-2 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition cursor-pointer"
                                    >
                                        Gallery
                                    </button>
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="flex-1 border border-amber-500 text-amber-500 py-2 rounded-lg hover:bg-amber-500 hover:text-black transition cursor-pointer text-center"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Slider Gallery */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
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
                            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                                <motion.img
                                    key={currentSlideIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                    src={
                                        selectedProjectGallery[
                                            currentSlideIndex
                                        ]
                                    }
                                    alt={`Slide ${currentSlideIndex + 1}`}
                                    className="w-full h-[70vh] object-cover"
                                />

                                {/* Navigation Buttons */}
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

                                {/* Slide Counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                                    {currentSlideIndex + 1} /{" "}
                                    {selectedProjectGallery.length}
                                </div>
                            </div>

                            {/* Thumbnail Navigation */}
                            <div className="mt-4 bg-gray-900/50 rounded-lg p-3 border border-amber-500/20">
                                <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-800 pb-2">
                                    {selectedProjectGallery.map(
                                        (img, index) => (
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
                                        )
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
