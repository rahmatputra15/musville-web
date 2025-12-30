import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import UsersLayout from "../../components/Users/UsersLayout";

const AboutUs = ({ banner, statement, profile, goals, journeys }) => {
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
            <Head>
                <title>About Us</title>
            </Head>

            <UsersLayout activePage="about">
                {/* Banner Section */}
                <section className="relative h-80 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50 z-10"></div>
                    <img
                        src={
                            banner
                                ? "storage/" + banner.image
                                : "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1920&h=600&fit=crop"
                        }
                        alt="About Us Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-20 h-full flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center px-4"
                        >
                            <h1 className="mt-10 text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                {banner ? banner.title : "Tentang Kami"}
                            </h1>
                            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
                                {banner
                                    ? banner.subtitle
                                    : "Membangun impian, menciptakan nilai bersama"}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* CEO Statement */}
                <section className="py-16 bg-linear-to-b from-gray-900 to-black">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-4xl font-bold text-amber-500 mb-4">
                                Sambutan CEO
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
                                    className="w-32 h-32 rounded-full bg-linear-to-br from-amber-500 to-yellow-600 shrink-0 overflow-hidden border-4 border-amber-500"
                                >
                                    <img
                                        src={
                                            statement.image_url ||
                                            "/assets/images/profil.jpeg"
                                        }
                                        alt={statement.name || "CEO"}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <p className="text-gray-300 text-lg italic mb-6">
                                        {statement.statement}
                                    </p>
                                    <div>
                                        <p className="font-semibold text-amber-500">
                                            {statement.name}
                                        </p>
                                        <p className="text-gray-400">
                                            {statement.position}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Company Profile */}
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

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                            {goals.map((goal, index) => (
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
                                Perjalanan Perusahaan
                            </h2>
                            <p className="text-gray-400">
                                Langkah kami dalam membangun properti
                                berkualitas
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
                        </div>
                    </div>
                </section>
            </UsersLayout>
        </>
    );
};

export default AboutUs;
