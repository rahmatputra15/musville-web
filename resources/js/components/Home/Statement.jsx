import { motion } from "framer-motion";

const Statement = () => {
    return (
        <section className="py-16 bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl font-bold text-amber-500 mb-4">
                        CEO Statement
                    </h2>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-linear-to-br from-gray-900 to-gray-800 border border-amber-500/30 rounded-lg shadow-lg shadow-amber-500/20 p-8 md:p-12"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="w-32 h-32 rounded-full bg-linear-to-br from-amber-500 to-yellow-600 shrink-0"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <p className="text-gray-300 text-lg italic mb-6">
                                "The best companies are those that bring the
                                most benefit to others. We are committed to
                                creating sustainable and quality developments
                                that serve our community."
                            </p>
                            <div>
                                <p className="font-semibold text-amber-500">
                                    John Doe
                                </p>
                                <p className="text-gray-400">CEO & Founder</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Statement;
