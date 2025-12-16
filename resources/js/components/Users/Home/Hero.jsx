import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
    const images = [
        {
            url: "/assets/images/skyview.jpg",
            alt: "Skyview Modern Building",
        },
        {
            url: "/assets/images/baliase.jpg",
            alt: "Baliase Modern Building",
        },
        {
            url: "/assets/images/comming-soon.jpeg",
            alt: "Coming Soon Modern Building",
        },
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000); // Ganti gambar setiap 5 detik

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Background Image Slideshow */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 1 },
                            scale: { duration: 8, ease: "linear" },
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={images[currentImage].url}
                            alt={images[currentImage].alt}
                            className="absolute w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/90"></div>
                {/* Gold Overlay Effect */}
                <div className="absolute inset-0 bg-linear-to-tr from-amber-900/20 via-transparent to-yellow-900/20"></div>
                {/* Animated Gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/5 to-transparent animate-pulse"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-6xl font-bold text-amber-400 mb-6 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                    >
                        PT. Madani Utama Selebes
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-amber-200 mb-4 drop-shadow-lg"
                    >
                        The Best Shariah Development and Sustainable Company
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg text-gray-300 max-w-3xl mx-auto drop-shadow-md"
                    >
                        Commercial Building, Resort & Elite Residential in
                        Indonesia
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-10 flex justify-center gap-4"
                    >
                        <button className="bg-linear-to-r from-amber-500 to-yellow-600 text-black px-8 py-3 rounded-lg text-lg font-semibold hover:from-amber-600 hover:to-yellow-700 transition shadow-lg shadow-amber-500/50 hover:shadow-amber-500/70 hover:scale-105 transform cursor-pointer">
                            Explore Projects
                        </button>
                        <button className="border-2 border-amber-500 text-amber-400 bg-black/30 backdrop-blur-sm px-8 py-3 rounded-lg text-lg font-medium hover:bg-amber-500 hover:text-black transition hover:scale-105 transform cursor-pointer">
                            Contact Us
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
