import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Login = () => {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (flash?.error) {
            setNotification({ type: "error", message: flash.error });
            setTimeout(() => setNotification(null), 5000);
        }
        if (flash?.success) {
            setNotification({ type: "success", message: flash.success });
            setTimeout(() => setNotification(null), 5000);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login", {
            onError: () => {
                reset("password");
            },
        });
    };

    return (
        <>
            <Head title="Login - Musville">
                <meta
                    name="description"
                    content="Login to your Musville account - PT. Madani Utama Selebes"
                />
                <meta property="og:title" content="Login - Musville" />
                <meta
                    property="og:description"
                    content="Access your Musville account"
                />
            </Head>

            <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Notification */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed top-4 right-4 z-50 max-w-md"
                        >
                            <div
                                className={`p-4 rounded-lg shadow-lg border ${
                                    notification.type === "error"
                                        ? "bg-red-500/90 border-red-600 text-white"
                                        : "bg-green-500/90 border-green-600 text-white"
                                } backdrop-blur-sm`}
                            >
                                <div className="flex items-center gap-3">
                                    {notification.type === "error" ? (
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
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    ) : (
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
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    )}
                                    <p className="font-medium">
                                        {notification.message}
                                    </p>
                                    <button
                                        onClick={() => setNotification(null)}
                                        className="ml-auto hover:opacity-70"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-amber-500/20 to-yellow-600/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-amber-500/20 to-yellow-600/20 rounded-full blur-3xl"
                    />
                </div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-full max-w-md"
                >
                    {/* Logo */}
                    <Link href="/" className="flex justify-center mb-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src="/assets/logos/logo.png"
                                alt="Musville Logo"
                                className="w-20 h-20 object-contain"
                            />
                            <h1 className="text-4xl font-bold text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                                MUSVILLE
                            </h1>
                        </motion.div>
                    </Link>

                    {/* Login Form */}
                    <div className="bg-gray-900/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold text-amber-400 mb-2 text-center">
                                Welcome Back
                            </h2>
                            <p className="text-gray-400 text-center mb-8">
                                Sign in to your account
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-400">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 bg-black/50 border border-amber-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400 transition"
                                        >
                                            {showPassword ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-400">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            className="w-4 h-4 bg-black/50 border-amber-500/50 rounded text-amber-500 focus:ring-amber-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-sm text-gray-400">
                                            Remember me
                                        </span>
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-amber-400 hover:text-amber-300 transition"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-linear-to-r from-amber-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition shadow-lg shadow-amber-500/50 hover:shadow-amber-500/70 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? "Signing in..." : "Sign In"}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Back to Home */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 text-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                />
                            </svg>
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default Login;
