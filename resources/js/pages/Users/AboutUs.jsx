import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import UsersLayout from "../../components/Users/UsersLayout";

const AboutUs = () => {
    const timeline = [
        {
            year: "2023",
            events: [
                "Mendirikan PT. Madani Utama Celebes",
                "Membuat izin perumahan",
                'Mendaftarkan merk dagang "MUSVILLE"',
            ],
        },
        {
            year: "2024",
            events: [
                'Membangun perumahan syari\'ah pertama, "Musville Residence Baliase" dan SOLD OUT dalam 3 bulan',
                'Persiapan Project kedua "Musville SkyView"',
            ],
        },
        {
            year: "2025",
            events: [
                "Pembangunan Project Kedua, Musville SkyView",
                "Persiapan Project Ketiga",
            ],
        },
    ];

    const profiles = [
        {
            title: "Our History",
            content:
                "PT Madani Utama Selebes didirikan pada tanggal 29 Juli 2023 yang bergerak di bidang Real Estate, Konstruksi, dan Pengembangan Area Wisata. Berawal dari CV. Langit Karya Tadulako yang telah beroperasi sejak 2017 dalam Agency Real Estate.",
        },
        {
            title: "Core Business",
            items: [
                "Real Estate Development",
                "Construction (Residential & Civil Infrastructure)",
                "Tourism Area Development",
            ],
        },
        {
            title: "Our Commitment",
            content:
                "Mengembangkan properti berbasis syariah dengan kualitas terbaik dan memberikan manfaat bagi masyarakat",
        },
    ];

    return (
        <>
            <Head title="About Us - Musville">
                <meta
                    name="description"
                    content="Learn about PT. Madani Utama Selebes - Our history, vision, mission, and commitment to quality shariah-compliant property development."
                />
                <meta
                    name="keywords"
                    content="about musville, company profile, shariah developer, PT Madani Utama Selebes, real estate company"
                />
                <meta property="og:title" content="About Us - Musville" />
                <meta
                    property="og:description"
                    content="Learn about our commitment to quality shariah-compliant property development"
                />
                <meta property="og:image" content="/assets/logos/logo.png" />
            </Head>

            <UsersLayout activePage="about">
                {/* Banner Section */}
                <section className="relative h-80 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1920&h=600&fit=crop"
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
                                About Us
                            </h1>
                            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
                                Building dreams, creating value
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
                                    className="w-32 h-32 rounded-full bg-linear-to-br from-amber-500 to-yellow-600 shrink-0 overflow-hidden border-4 border-amber-500"
                                >
                                    <img
                                        src="/assets/images/profil.jpeg"
                                        alt="Muhammad Arief Mustafa"
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
                                        "Sebaik-baik manusia ialah yang
                                        bermanfaat bagi yang lainnya. Begitupula
                                        Perusahaan, bisnis mana yang paling
                                        banyak memberi manfaat, itulah yang akan
                                        terus bertumbuh"
                                    </p>
                                    <div>
                                        <p className="font-semibold text-amber-500">
                                            Muhammad Arief Mustafa
                                        </p>
                                        <p className="text-gray-400">
                                            Direktur Utama PT. MUS
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
                                Company Profile
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
                                    2017
                                </div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">
                                    Founded As Agency
                                </div>
                            </div>
                            <div className="group">
                                <div className="text-4xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                                    2023
                                </div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">
                                    PT MUS Established
                                </div>
                            </div>
                            <div className="group">
                                <div className="text-4xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                                    3
                                </div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">
                                    Business Units
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
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    <div className="text-5xl font-bold text-amber-200">
                                        2030
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    Vision
                                </h3>
                                <p className="text-amber-100">
                                    Menjadi Developer Perumahan Syariah terbaik
                                    di Indonesia
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
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
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div className="text-5xl font-bold text-amber-200">
                                        2050
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    Vision
                                </h3>
                                <p className="text-amber-100">
                                    Menjadi Ikonik Wisata Islami dan Resort
                                    Syariah terbesar di Indonesia
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
            </UsersLayout>
        </>
    );
};

export default AboutUs;
