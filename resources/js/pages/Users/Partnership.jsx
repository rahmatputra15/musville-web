import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import UsersLayout from "../../components/Users/UsersLayout";

const Partnership = ({ banner, partnerships = [], commitments = [] }) => {
    const opportunities = partnerships.map((partnership) => ({
        title: partnership.title,
        description: partnership.subtitle,
        icon: partnership.icon,
        benefit: partnership.benefit,
        contact: partnership.contact,
    }));

    const commits = commitments.map((commitment) => ({
        title: commitment.title,
        description: commitment.subtitle,
        icon: commitment.icon,
    }));

    return (
        <>
            <Head title="Partnership - Musville">
                <meta
                    name="description"
                    content="Join our partnership opportunities as an investor or agency. Be part of our growth story in shariah-compliant property development."
                />
                <meta
                    name="keywords"
                    content="partnership musville, property investment, agency opportunity, real estate partnership, shariah investment"
                />
                <meta property="og:title" content="Partnership - Musville" />
                <meta
                    property="og:description"
                    content="Join our partnership opportunities as an investor or agency"
                />
                <meta property="og:image" content="/assets/logos/logo.png" />
            </Head>

            <UsersLayout activePage="partnership">
                {/* Banner Section */}
                <section className="relative h-80 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50 z-10"></div>
                    <img
                        src={
                            banner
                                ? "storage/" + banner.image
                                : "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=600&fit=crop"
                        }
                        alt="Partnership Banner"
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
                                {banner
                                    ? banner.title
                                    : "Partnership Opportunities"}
                            </h1>
                            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
                                {banner
                                    ? banner.subtitle
                                    : "Explore our partnership opportunities and grow with us."}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-16 bg-linear-to-b from-gray-900 to-black">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-center"
                        >
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We believe in creating mutually beneficial
                                partnerships that drive sustainable growth.
                                Whether you're looking to invest in premium
                                properties or build a career in the property
                                sector, we offer opportunities tailored to help
                                you succeed.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Partnership Cards */}
                <section className="py-16 bg-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {opportunities.map((opportunity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.2 + 0.4,
                                    }}
                                    className="bg-gray-900 border border-amber-500/30 rounded-lg shadow-lg shadow-amber-500/20 p-8 hover:border-amber-500/50 transition cursor-pointer"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.2 + 0.6,
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

                                    {/* Benefits List */}
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-amber-500 mb-3">
                                            Benefits:
                                        </h4>
                                        <div
                                            className="text-gray-300"
                                            dangerouslySetInnerHTML={{
                                                __html: opportunity.benefit
                                                    ? opportunity.benefit
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

                                    <a
                                        href={`https://wa.me/${opportunity.contact}`}
                                        target="_blank"
                                        className="w-full bg-linear-to-r from-amber-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition shadow-lg shadow-amber-500/30 cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Contact Admin
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Partner Section */}
                <section className="py-16 bg-linear-to-b from-black to-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold text-amber-500 mb-4">
                                Company Subsidiaries
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Kami berkomitmen untuk membangun hubungan jangka
                                panjang berdasarkan kepercayaan dan kesuksesan
                                bersama
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {commits.map((commit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="bg-gray-900 border border-amber-500/20 rounded-lg p-6 text-center hover:border-amber-500/50 transition"
                                >
                                    <div className="w-16 h-16 bg-linear-to-br from-amber-500/20 to-yellow-600/20 border border-amber-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
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
                                                d={commit.icon}
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-amber-500 mb-3">
                                        {commit.title}
                                    </h3>
                                    <p className="text-gray-400">
                                        {commit.description}
                                    </p>
                                </motion.div>
                            ))}
                            {commits.length === 0 && (
                                <p className="text-gray-400 col-span-3 text-center">
                                    -- No commitments available at the moment --
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </UsersLayout>
        </>
    );
};

export default Partnership;
