import { motion } from "framer-motion";

const Partnership = () => {
    const opportunities = [
        {
            title: "Investor",
            description:
                "Join us in developing premium properties and be part of our growth story.",
            icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            title: "Agency",
            description:
                "Earn additional income while learning about property business with us.",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        },
    ];

    return (
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
                        Partnership Opportunities
                    </h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {opportunities.map((opportunity, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-gray-900 border border-amber-500/30 rounded-lg shadow-lg shadow-amber-500/20 p-8 hover:border-amber-500/50 transition cursor-pointer"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2 + 0.2,
                                }}
                                className="w-16 h-16 bg-linear-to-br from-amber-500/20 to-yellow-600/20 border border-amber-500/50 rounded-full flex items-center justify-center mb-6"
                            >
                                <svg
                                    className="w-8 h-8 text-amber-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={opportunity.icon}
                                    />
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-semibold text-amber-500 mb-4">
                                {opportunity.title}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {opportunity.description}
                            </p>
                            <button className="w-full bg-linear-to-r from-amber-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition shadow-lg shadow-amber-500/30 cursor-pointer">
                                Contact Admin
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partnership;
