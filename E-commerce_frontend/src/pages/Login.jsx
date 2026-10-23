
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const shouldReduceMotion = useReducedMotion();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginComplete, setLoginComplete] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    // Handle login
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch(
                "http://localhost:8000/api/v1/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Login failed. Please check your credentials."
                );
            }

            // Update the shared authentication state
            setUser(result.data);

            setSuccessMessage("Login successful! Welcome back.");
            setLoginComplete(true);

            console.log("Login successful:", result);
        } catch (error) {
            console.error("Login error:", error);

            setErrorMessage(
                error.message || "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Clear notifications automatically
    useEffect(() => {
        if (!successMessage && !errorMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage, errorMessage]);

    // Redirect after successful login
    useEffect(() => {
        if (!loginComplete) return;

        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, [loginComplete, navigate]);

    const reveal = (delay = 0) => ({
        initial: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
        },
        animate: {
            opacity: 1,
            y: 0,
        },
        transition: {
            duration: shouldReduceMotion ? 0 : 0.65,
            delay: shouldReduceMotion ? 0 : delay,
            ease: [0.16, 1, 0.3, 1],
        },
    });

    return (
        <section className="relative isolate flex min-h-[calc(100vh-68px)] items-center justify-center overflow-hidden bg-[#101116] px-5 py-12 text-white sm:px-8">

            {/* Animated background */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, 30, 0],
                                y: [0, -20, 0],
                                scale: [1, 1.08, 1],
                            }
                    }
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px]"
                />

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, -25, 0],
                                y: [0, 25, 0],
                            }
                    }
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-indigo-500/20 blur-[130px]"
                />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#101116_85%)]" />
            </div>

            {/* Notifications */}
            <div className="fixed right-4 top-5 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6">
                <AnimatePresence>
                    {successMessage && (
                        <motion.div
                            key="success"
                            role="status"
                            initial={{
                                opacity: 0,
                                x: shouldReduceMotion ? 0 : 25,
                                scale: 0.96,
                            }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-[#191f22]/95 px-5 py-4 text-sm text-white shadow-2xl backdrop-blur-2xl"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                                ✓
                            </span>

                            <span className="flex-1">{successMessage}</span>

                            <button
                                type="button"
                                onClick={() => setSuccessMessage("")}
                                aria-label="Close notification"
                                className="text-xl text-gray-400 transition hover:text-white"
                            >
                                ×
                            </button>
                        </motion.div>
                    )}

                    {errorMessage && (
                        <motion.div
                            key="error"
                            role="alert"
                            initial={{
                                opacity: 0,
                                x: shouldReduceMotion ? 0 : 25,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 rounded-2xl border border-red-400/20 bg-[#24191d]/95 px-5 py-4 text-sm text-white shadow-2xl backdrop-blur-2xl"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-400/15 text-red-300">
                                !
                            </span>

                            <span className="flex-1">{errorMessage}</span>

                            <button
                                type="button"
                                onClick={() => setErrorMessage("")}
                                aria-label="Close notification"
                                className="text-xl text-gray-400 transition hover:text-white"
                            >
                                ×
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Login layout */}
            <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

                {/* Left introduction */}
                <motion.div
                    {...reveal(0.1)}
                    className="hidden lg:block"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-xl">
                        <span className="text-violet-300">✦</span>
                        Welcome to your store
                    </span>

                    <h1 className="mt-7 text-5xl font-bold leading-[1.1] tracking-tight xl:text-6xl">
                        Good to see
                        <br />
                        <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent">
                            you again.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-lg leading-8 text-gray-400">
                        Sign in to continue exploring products, manage your
                        cart, and pick up where you left off.
                    </p>

                    <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-2xl">
                            🛍️
                        </div>

                        <div>
                            <p className="font-medium text-gray-200">
                                Your shopping journey
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                All in one place.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Login card */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : 25,
                        scale: shouldReduceMotion ? 1 : 0.98,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.7,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative mx-auto w-full max-w-md"
                >
                    {/* Card glow */}
                    <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-violet-500/15 via-transparent to-indigo-500/15 blur-2xl" />

                    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#1a1b24]/80 p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">

                        {/* Top accent */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

                        <div className="text-center">
                            <motion.div
                                whileHover={
                                    shouldReduceMotion ? {} : { rotate: -5, scale: 1.05 }
                                }
                                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/15 bg-gradient-to-br from-violet-500/20 to-indigo-500/10 text-3xl shadow-lg shadow-violet-950/20"
                            >
                                ✦
                            </motion.div>

                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                                Welcome Back
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-400">
                                Login to your account to continue.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-200"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 hover:border-white/20 focus:border-violet-400/60 focus:bg-black/30 focus:ring-4 focus:ring-violet-500/10"
                                    required
                                    disabled={isSubmitting || loginComplete}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-200"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 hover:border-white/20 focus:border-violet-400/60 focus:bg-black/30 focus:ring-4 focus:ring-violet-500/10"
                                    required
                                    disabled={isSubmitting || loginComplete}
                                />
                            </div>

                            {/* Submit button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting || loginComplete}
                                whileHover={
                                    shouldReduceMotion || isSubmitting || loginComplete
                                        ? {}
                                        : { y: -2, scale: 1.01 }
                                }
                                whileTap={
                                    shouldReduceMotion || isSubmitting || loginComplete
                                        ? {}
                                        : { scale: 0.98 }
                                }
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1b24] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Signing in...
                                    </>
                                ) : loginComplete ? (
                                    "Login successful"
                                ) : (
                                    <>
                                        Login
                                        <span aria-hidden="true">→</span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Registration link */}
                        <div className="mt-7 border-t border-white/[0.08] pt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                disabled={loginComplete}
                                className="mt-2 text-sm font-semibold text-violet-300 transition-colors hover:text-violet-200 hover:underline disabled:opacity-50"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>

                    <p className="mt-5 text-center text-xs text-gray-600">
                        Welcome back to your shopping experience.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default Login;
