import { motion, time } from "framer-motion";

const CompanyProfile = ({ profile, journeys = [], companyGoals }) => {
    if (!profile) return null;

    // Timeline from journeys table
    const timeline = journeys.map((journey) => ({
        year: journey.year,
        events: [journey.description],
    }));

    const profiles = [
        {
            title: "Cerita Kami",
            content: profile.our_story,
        },
        {
            title: "Bisnis Inti Kami",
            content: profile.core_business,
        },
        {
            title: "Komitmen Kami",
            content: profile.our_commitment,
        },
    ];

    return (
        <>
            {/* Company Profile */}
            <section
                id="about"
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
                            Profil Perusahaan
                        </h2>
                    </motion.div>

                    {/* Company Info Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    >
                        <div className="group">
                            <div className="text-4xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                                {profile.starter}
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wide">
                                Didirikan sebagai Agensi
                            </div>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                                {profile.starter_company}
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wide">
                                PT MUS Didirikan
                            </div>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                                {profile.business_unit}
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wide">
                                Unit Bisnis
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
                                <div
                                    className="text-gray-300"
                                    dangerouslySetInnerHTML={{
                                        __html: profile.content
                                            ? profile.content
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
                            Tujuan Perusahaan
                        </h2>
                        <p className="text-amber-100">
                            Visi kami untuk masa depan properti berkualitas
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {companyGoals.map((goal, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-lg p-8 hover:bg-black/40 transition"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-14 w-14 text-amber-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={goal.icon}
                                        />
                                    </svg>
                                    <div className="text-5xl font-bold text-amber-200">
                                        {goal.title}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    Visi
                                </h3>
                                <p className="text-amber-100">
                                    {goal.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Journey */}
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
                            Perjalanan Perusahaan
                        </h2>
                        <p className="text-gray-400">
                            Langkah kami dalam membangun properti berkualitas
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
                                    <div className="shrink-0 flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-500 to-yellow-600 rounded-full text-black font-bold text-sm shadow-lg shadow-amber-500/50">
                                        {item.year}
                                    </div>
                                    {index < timeline.length - 1 && (
                                        <div className="w-1 flex-1 bg-linear-to-b from-amber-500 to-yellow-600"></div>
                                    )}
                                </div>
                                <div className="bg-gray-900 border border-amber-500/30 rounded-lg p-6 flex-1 hover:border-amber-500/50 transition">
                                    <h3 className="text-xl font-semibold text-amber-500 mb-3">
                                        {item.year}
                                    </h3>
                                    <div
                                        className="text-gray-300"
                                        dangerouslySetInnerHTML={{
                                            __html: item.events[0]
                                                ? item.events[0]
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
                                </div>
                            </motion.div>
                        ))}
                        {timeline.length === 0 && (
                            <p className="text-gray-400 text-center">
                                -- Tidak ada perjalanan --
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CompanyProfile;
