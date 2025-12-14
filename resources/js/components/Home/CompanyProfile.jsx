import { motion } from "framer-motion";

const CompanyProfile = () => {
    const timeline = [
        { year: "2023", events: ["Company Founded", "First Project Planning"] },
        { year: "2024", events: ["Project Alpha Launch", "Sold 50% Units"] },
        { year: "2025", events: ["Project Beta Launch", "Expansion Plans"] },
    ];

    const profiles = [
        {
            title: "Our History",
            content:
                "Founded in 2023, we specialize in Real Estate, Construction, and Tourism Area Development with a commitment to quality and sustainability.",
        },
        {
            title: "Core Business",
            items: [
                "Real Estate Development",
                "Construction Services",
                "Tourism Area Development",
            ],
        },
        {
            title: "Our Commitment",
            content:
                "Developing shariah-based properties with the best quality and providing benefits to the community.",
        },
    ];

    return (
        <>
            {/* Company Profile */}
            <section
                id="about"
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
                            Company Profile
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {profiles.map((profile, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="bg-linear-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-lg p-8 hover:border-amber-500/50 transition"
                            >
                                <h3 className="text-xl font-semibold text-amber-500 mb-4">
                                    {profile.title}
                                </h3>
                                {profile.content ? (
                                    <p className="text-gray-300">
                                        {profile.content}
                                    </p>
                                ) : (
                                    <ul className="text-gray-300 space-y-2">
                                        {profile.items.map((item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Goals */}
            <section className="py-16 bg-linear-to-br from-amber-600 via-yellow-700 to-amber-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                            Company Goals
                        </h2>
                        <p className="text-amber-100">
                            Our vision for the future
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-lg p-8 hover:bg-black/40 transition"
                        >
                            <div className="text-5xl font-bold mb-4 text-amber-200">
                                2030
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">
                                Vision
                            </h3>
                            <p className="text-amber-100">
                                To become the best Shariah Housing Developer in
                                Indonesia
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-lg p-8 hover:bg-black/40 transition"
                        >
                            <div className="text-5xl font-bold mb-4 text-amber-200">
                                2050
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">
                                Vision
                            </h3>
                            <p className="text-amber-100">
                                To become an iconic Islamic Tourism and the
                                largest Shariah Resort in Indonesia
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Company Journey */}
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
                            Company Journey
                        </h2>
                        <p className="text-gray-400">
                            Our path to building quality properties
                        </p>
                    </motion.div>
                    <div className="relative">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                }}
                                className="mb-8 flex"
                            >
                                <div className="flex flex-col items-center mr-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-amber-500 to-yellow-600 rounded-full text-black font-bold shadow-lg shadow-amber-500/50">
                                        {item.year}
                                    </div>
                                    {index < timeline.length - 1 && (
                                        <div className="w-1 h-full bg-linear-to-b from-amber-500 to-yellow-600"></div>
                                    )}
                                </div>
                                <div className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 flex-1 hover:border-amber-500/50 transition">
                                    <h3 className="text-xl font-semibold text-amber-500 mb-3">
                                        {item.year}
                                    </h3>
                                    <ul className="space-y-2">
                                        {item.events.map((event, idx) => (
                                            <li
                                                key={idx}
                                                className="text-gray-300"
                                            >
                                                • {event}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CompanyProfile;
