
import React, { useContext, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    LockKeyhole,
    Mail,
    ArrowLeft,
    ArrowRight,
    Shield,
    Sparkles
} from "lucide-react";

import { AdminAuthContext } from "../../context/AdminAuthContext.jsx";

function AdminLogin() {
    const navigate = useNavigate();
    const { setAdmin, refreshAdmin } = useContext(AdminAuthContext);
    const shouldReduceMotion = useReducedMotion();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8000/api/v1/users/admin/login",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            if (result.data?.role !== "admin") {
                throw new Error("Access denied. Admin account required.");
            }

            const admin = await refreshAdmin();

            if (!admin) {
                throw new Error("Admin authentication verification failed.");
            }

            setAdmin(admin);

            navigate("/admin");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const reveal = (delay = 0) => ({
        initial: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 22
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: shouldReduceMotion ? 0 : 0.7,
            delay: shouldReduceMotion ? 0 : delay,
            ease: [0.16, 1, 0.3, 1]
        }
    });

    return (
        <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#0b1020] px-5 py-12 text-white sm:px-8">

            {/* Animated background */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, 35, 0],
                                y: [0, -25, 0],
                                scale: [1, 1.08, 1]
                            }
                    }
                    transition={{
                        duration: 13,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -left-40 -top-36 h-[430px] w-[430px] rounded-full bg-violet-600/20 blur-[125px]"
                />

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, -30, 0],
                                y: [0, 30, 0],
                                scale: [1, 1.1, 1]
                            }
                    }
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-blue-600/20 blur-[135px]"
                />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0b1020_85%)]" />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "55px 55px"
                    }}
                />
            </div>

            {/* Main layout */}
            <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

                {/* Left introduction */}
                <motion.div
                    {...reveal(0.1)}
                    className="hidden lg:block"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-400/[0.07] px-4 py-2 text-sm font-medium text-violet-200 backdrop-blur-xl">
                        <Sparkles size={15} />
                        Store Administration
                    </div>

                    <h1 className="mt-8 text-5xl font-bold leading-[1.12] tracking-tight xl:text-6xl">
                        Control your
                        <br />
                        <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent">
                            store universe.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-lg text-lg leading-8 text-slate-400">
                        Manage your products, monitor store activity,
                        organize orders, and keep everything running
                        from one central workspace.
                    </p>

                    {/* Feature highlights */}
                    <div className="mt-10 space-y-5 border-t border-white/10 pt-7">

                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-500/10 text-violet-300">
                                <ShieldCheck size={21} />
                            </div>

                            <div>
                                <p className="font-medium text-slate-200">
                                    Secure administration
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Restricted access for authorized admins.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-500/10 text-blue-300">
                                <Sparkles size={21} />
                            </div>

                            <div>
                                <p className="font-medium text-slate-200">
                                    Everything in one place
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Your store management workspace.
                                </p>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* Login card */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : 28,
                        scale: shouldReduceMotion ? 1 : 0.97
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                    }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.75,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative mx-auto w-full max-w-md"
                >

                    {/* Card glow */}
                    <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-transparent to-blue-500/20 blur-2xl" />

                    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#151a2a]/85 p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9">

                        {/* Top accent */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />

                        {/* Card heading */}
                        <div className="text-center">

                            <motion.div
                                whileHover={
                                    shouldReduceMotion
                                        ? {}
                                        : { rotate: -5, scale: 1.06 }
                                }
                                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/20 to-indigo-500/10 text-violet-200 shadow-lg shadow-violet-950/30"
                            >
                                <ShieldCheck size={31} strokeWidth={1.7} />
                            </motion.div>

                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                                Admin Portal
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Sign in to access your administration panel.
                            </p>
                        </div>

                        {/* Login form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-9 space-y-5"
                        >

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Email address
                                </label>

                                <div className="group relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-300"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="admin@example.com"
                                        required
                                        disabled={loading}
                                        className="w-full rounded-xl border border-white/10 bg-black/25 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-400/60 focus:bg-black/35 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Password
                                </label>

                                <div className="group relative">
                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-300"
                                    />

                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        disabled={loading}
                                        className="w-full rounded-xl border border-white/10 bg-black/25 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-400/60 focus:bg-black/35 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            {/* Error notification */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        role="alert"
                                        initial={{
                                            opacity: 0,
                                            y: shouldReduceMotion ? 0 : -8
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: shouldReduceMotion ? 0 : -5
                                        }}
                                        className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={
                                    shouldReduceMotion || loading
                                        ? {}
                                        : { y: -2, scale: 1.01 }
                                }
                                whileTap={
                                    shouldReduceMotion || loading
                                        ? {}
                                        : { scale: 0.98 }
                                }
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#151a2a] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        Sign In to Admin Panel
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </motion.button>

                        </form>

                        {/* Security note */}
                        <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/[0.08] pt-6 text-center">
                            <Shield size={14} className="text-violet-300" />

                            <p className="text-xs text-slate-500">
                                Restricted access · Authorized administrators only
                            </p>
                        </div>

                    </div>

                    {/* Back to store */}
                    <motion.button
                        type="button"
                        onClick={() => navigate("/")}
                        whileHover={shouldReduceMotion ? {} : { x: -3 }}
                        className="mx-auto mt-6 flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to Store
                    </motion.button>

                </motion.div>

            </div>
        </section>
    );
}

export default AdminLogin;
