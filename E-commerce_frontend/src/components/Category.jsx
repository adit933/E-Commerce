
import React, { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

function Category({ categories }) {
    const scrollref = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    const categoryList = Array.isArray(categories) ? categories : [];

    const leftScroll = () => {
        scrollref.current?.scrollBy({
            left: -300,
            behavior: shouldReduceMotion ? "auto" : "smooth",
        });
    };

    const rightScroll = () => {
        scrollref.current?.scrollBy({
            left: 300,
            behavior: shouldReduceMotion ? "auto" : "smooth",
        });
    };

    return (
        <section className="relative isolate overflow-hidden bg-[#101116] px-6 py-16 text-white sm:px-10 lg:px-20 lg:py-24">

            {/* Ambient background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-32 -top-24 h-[350px] w-[350px] rounded-full bg-violet-600/15 blur-[110px]" />
                <div className="absolute -bottom-32 -right-24 h-[350px] w-[350px] rounded-full bg-indigo-500/15 blur-[110px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#101116_85%)]" />
            </div>

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-9">

                {/* Heading */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : 20,
                    }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-gray-300 shadow-lg backdrop-blur-xl">
                        <span className="text-violet-300">✦</span>
                        Explore
                    </span>

                    <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Shop by{" "}
                                <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent">
                                    Category
                                </span>
                            </h2>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                                Browse products by category and discover
                                something new for your everyday needs.
                            </p>

                            <div className="mt-6 h-px w-24 bg-gradient-to-r from-violet-400 to-transparent" />
                        </div>

                        {/* Carousel controls */}
                        <div className="flex items-center gap-3">
                            <span className="mr-1 text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
                                Explore more
                            </span>

                            <motion.button
                                type="button"
                                onClick={leftScroll}
                                whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                                whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
                                aria-label="Scroll categories left"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xl text-gray-200 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:border-violet-400/40 hover:bg-violet-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                            >
                                ←
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={rightScroll}
                                whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                                whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
                                aria-label="Scroll categories right"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xl text-gray-200 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:border-violet-400/40 hover:bg-violet-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                            >
                                →
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Category carousel */}
                {categoryList.length > 0 ? (
                    <div className="relative">

                        {/* Left edge fade */}
                        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-8 bg-gradient-to-r from-[#101116] to-transparent sm:block" />

                        <div
                            ref={scrollref}
                            className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-1 pb-5 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {categoryList.map((category, index) => (
                                <motion.article
                                    key={category._id}
                                    initial={{
                                        opacity: 0,
                                        y: shouldReduceMotion ? 0 : 22,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.2,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: shouldReduceMotion
                                            ? 0
                                            : (index % 5) * 0.08,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    whileHover={
                                        shouldReduceMotion ? {} : { y: -7 }
                                    }
                                    className="group relative w-[240px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/[0.09] bg-[#1a1b24]/75 shadow-lg shadow-black/10 backdrop-blur-2xl transition-[border-color,box-shadow] duration-500 hover:border-violet-400/30 hover:shadow-xl hover:shadow-violet-950/25 sm:w-[260px] lg:w-[270px]"
                                >
                                    {/* Glass highlight */}
                                    <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl bg-gradient-to-br from-white/[0.06] via-transparent to-violet-400/[0.05]" />

                                    {/* Category visual */}
                                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#22212f] via-[#20212c] to-[#171821] sm:h-52">
                                        {/* Decorative orbs */}
                                        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-500/15 blur-3xl transition-all duration-500 group-hover:bg-violet-400/30" />

                                        <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-indigo-500/15 blur-3xl transition-all duration-500 group-hover:bg-indigo-400/30" />

                                        {/* Decorative rings */}
                                        <div className="absolute h-32 w-32 rounded-full border border-white/[0.06] transition-transform duration-700 group-hover:scale-125" />
                                        <div className="absolute h-24 w-24 rounded-full border border-white/[0.08] transition-transform duration-700 group-hover:scale-125" />

                                        <motion.span
                                            animate={
                                                shouldReduceMotion
                                                    ? {}
                                                    : { y: [0, -5, 0] }
                                            }
                                            transition={{
                                                duration: 3.5,
                                                delay: (index % 4) * 0.3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] text-5xl shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-500 group-hover:border-violet-300/25 group-hover:bg-white/[0.1] group-hover:shadow-violet-500/10"
                                        >
                                            🛍️
                                        </motion.span>

                                        {/* Category number */}
                                        <span className="absolute right-4 top-4 text-xs font-medium tracking-widest text-white/35">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        {/* Bottom image fade */}
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1a1b24] to-transparent" />
                                    </div>

                                    {/* Category details */}
                                    <div className="relative z-20 flex items-center justify-between gap-3 p-5">
                                        <div className="min-w-0">
                                            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-violet-200">
                                                {category.name}
                                            </h3>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Explore collection
                                            </p>
                                        </div>

                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:border-violet-400/30 group-hover:bg-violet-500/15 group-hover:text-white">
                                            →
                                        </span>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        {/* Right edge fade */}
                        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-8 bg-gradient-to-l from-[#101116] to-transparent sm:block" />
                    </div>
                ) : (
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-12 text-center backdrop-blur-xl">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-2xl">
                            🛍️
                        </div>

                        <h3 className="mt-4 font-semibold text-white">
                            Categories are coming soon
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Check back soon to explore our collections.
                        </p>
                    </div>
                )}

                {/* Bottom hint */}
                {categoryList.length > 0 && (
                    <p className="text-center text-xs tracking-wide text-gray-500 sm:text-left">
                        Scroll horizontally or use the arrows to discover more
                        categories.
                    </p>
                )}
            </div>
        </section>
    );
}

export default Category;
