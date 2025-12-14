import { useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
    const [activeProject, setActiveProject] = useState(0);

    const projects = [
        {
            id: 1,
            name: "Project Alpha",
            status: "Available",
            units: "15/50",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
        },
        {
            id: 2,
            name: "Project Beta",
            status: "Sold Out",
            units: "30/30",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        },
        {
            id: 3,
            name: "Project Gamma",
            status: "Coming Soon",
            units: "0/40",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        },
    ];

    return (
        <section
            id="projects"
            className="py-16 bg-linear-to-b from-black to-gray-900"
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
                                <p className="text-gray-400 mb-4">
                                    Units: {project.units}
                                </p>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-linear-to-r from-amber-500 to-yellow-600 text-black font-semibold py-2 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition cursor-pointer">
                                        Gallery
                                    </button>
                                    <button className="flex-1 border border-amber-500 text-amber-500 py-2 rounded-lg hover:bg-amber-500 hover:text-black transition cursor-pointer">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
