
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import heroImage from "../assets/shutter-speed-BQ9usyzHx_w-unsplash.jpg";

function Hero() {
    const shouldReduceMotion = useReducedMotion();

    const reveal = (delay = 0) => ({
        initial: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 24,
        },
        animate: {
            opacity: 1,
            y: 0,
        },
        transition: {
            duration: shouldReduceMotion ? 0 : 0.7,
            delay: shouldReduceMotion ? 0 : delay,
            ease: [0.16, 1, 0.3, 1],
        },
    });

    return (
        <section className="relative isolate flex min-h-[calc(100vh-68px)] items-center overflow-hidden bg-[#101116] px-6 py-16 text-white sm:px-10 lg:px-20">

            {/* Ambient background lighting */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, 35, 0],
                                y: [0, -25, 0],
                                scale: [1, 1.08, 1],
                            }
                    }
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[110px]"
                />

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, -30, 0],
                                y: [0, 25, 0],
                                scale: [1, 1.1, 1],
                            }
                    }
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-indigo-500/20 blur-[120px]"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#101116_85%)]" />
            </div>

            {/* Main content */}
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">

                {/* Left section */}
                <div className="relative z-10 flex flex-col items-start">

                    <motion.span
                        {...reveal(0.1)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-gray-200 shadow-lg shadow-black/10 backdrop-blur-xl"
                    >
                        <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
                        ✨ Discover Something New
                    </motion.span>

                    <motion.h1
                        {...reveal(0.2)}
                        className="mt-7 text-5xl font-bold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
                    >
                        Everything you want.
                        <br />
                        <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent">
                            All in one place.
                        </span>
                    </motion.h1>

                    <motion.p
                        {...reveal(0.3)}
                        className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg"
                    >
                        Explore products carefully selected for your everyday
                        life. Simple shopping, great products, delivered to
                        your door.
                    </motion.p>

                    {/* Action buttons */}
                    <motion.div
                        {...reveal(0.4)}
                        className="mt-9 flex w-full flex-wrap gap-4 sm:w-auto"
                    >
                        <motion.div
                            whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        >
                            <Link
                                to="/shop"
                                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-950/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                            >
                                Shop Now
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        >
                            <Link
                                to="/categories"
                                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 font-medium text-gray-200 backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                            >
                                Explore Categories
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Extra trust details */}
                    <motion.div
                        {...reveal(0.5)}
                        className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-gray-400"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-violet-300">✦</span>
                            Carefully selected products
                        </span>

                        <span className="flex items-center gap-2">
                            <span className="text-violet-300">✦</span>
                            Simple shopping experience
                        </span>
                    </motion.div>
                </div>

                {/* Right section */}
                <motion.div
                    initial={{
                        opacity: 0,
                        x: shouldReduceMotion ? 0 : 35,
                        scale: shouldReduceMotion ? 1 : 0.97,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.9,
                        delay: shouldReduceMotion ? 0 : 0.25,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative mx-auto w-full max-w-[510px] lg:ml-auto"
                >
                    {/* Decorative glow behind image */}
                    <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-blue-500/20 opacity-80 blur-2xl" />

                    {/* Product image card */}
                    <motion.div
                        whileHover={shouldReduceMotion ? {} : { y: -7 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="group relative aspect-[4/4.5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b1c25] shadow-2xl shadow-black/40"
                    >
                        <img
                            src={heroImage}
                            alt="Featured collection"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Dark overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

                        {/* Top label */}
                        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Selected for you
                        </div>

                        {/* Bottom information panel */}
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                            <div className="rounded-2xl border border-white/15 bg-black/40 p-5 shadow-xl backdrop-blur-xl sm:p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                                    Today's Pick
                                </p>

                                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                    Premium Collection
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-300">
                                    Discover something special for your
                                    everyday life.
                                </p>

                                <Link
                                    to="/shop"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-violet-300"
                                >
                                    Explore the collection
                                    <span aria-hidden="true">↗</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating decorative badge */}
                    <motion.div
                        animate={
                            shouldReduceMotion
                                ? {}
                                : { y: [0, -8, 0] }
                        }
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -right-3 top-1/4 hidden rounded-2xl border border-white/10 bg-[#20212b]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:block md:-right-5"
                    >
                        <p className="text-xs text-gray-400">
                            Your next favorite
                        </p>
                        <p className="mt-1 font-semibold text-white">
                            Starts here ✨
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
