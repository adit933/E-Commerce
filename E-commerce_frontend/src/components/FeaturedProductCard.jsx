
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";

function FeaturedProduct({ product }) {
    const navigate = useNavigate();
    const shouldReduceMotion = useReducedMotion();

    const products = Array.isArray(product) ? product : [];

    return (
        <section className="relative isolate overflow-hidden bg-[#101116] px-6 py-16 text-white sm:px-10 lg:px-20 lg:py-24">

            {/* Ambient background lighting */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -right-32 -top-24 h-[350px] w-[350px] rounded-full bg-violet-600/15 blur-[110px]" />
                <div className="absolute -bottom-32 -left-24 h-[350px] w-[350px] rounded-full bg-indigo-500/15 blur-[110px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#101116_85%)]" />
            </div>

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10">

                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65 }}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-gray-300 shadow-lg backdrop-blur-xl">
                        <span className="text-violet-300">✦</span>
                        Our Selection
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent">
                            Products
                        </span>
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                        Discover some of our most popular products, carefully
                        selected to bring something special to your everyday life.
                    </p>

                    <div className="mt-6 h-px w-24 bg-gradient-to-r from-violet-400 to-transparent" />
                </motion.div>

                {/* Product grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((pr, index) => {
                            const imageUrl = pr.images?.[0]?.url;

                            return (
                                <motion.article
                                    key={pr._id}
                                    initial={{
                                        opacity: 0,
                                        y: shouldReduceMotion ? 0 : 25,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.15,
                                    }}
                                    transition={{
                                        duration: 0.55,
                                        delay: shouldReduceMotion
                                            ? 0
                                            : (index % 4) * 0.1,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    whileHover={
                                        shouldReduceMotion
                                            ? {}
                                            : { y: -8 }
                                    }
                                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.09] bg-[#1a1b24]/75 shadow-lg shadow-black/10 backdrop-blur-2xl transition-[border-color,box-shadow] duration-500 hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-950/25"
                                >
                                    {/* Subtle glass highlight */}
                                    <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl bg-gradient-to-br from-white/[0.06] via-transparent to-violet-400/[0.04] opacity-70" />

                                    {/* Product image */}
                                    <div className="relative overflow-hidden bg-[#22232d]">
                                        <div className="aspect-[4/4.2] overflow-hidden">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={pr.name || "Product"}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                                                    Image unavailable
                                                </div>
                                            )}
                                        </div>

                                        {/* Image overlay */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101116]/80 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

                                        {/* Featured badge */}
                                        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-xl">
                                            <span className="text-violet-300">✦</span>
                                            Featured
                                        </span>

                                        {/* Hover image indicator */}
                                        <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-lg text-white opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            ↗
                                        </div>
                                    </div>

                                    {/* Product information */}
                                    <div className="relative z-20 flex flex-1 flex-col p-5">
                                        <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-violet-200">
                                            {pr.name}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
                                            {pr.description}
                                        </p>

                                        {/* Price and action */}
                                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5 mt-5">
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500">
                                                    Price
                                                </p>
                                                <p className="mt-1 text-xl font-bold tracking-tight text-white">
                                                    ₹{pr.price}
                                                </p>
                                            </div>

                                            <motion.button
                                                type="button"
                                                onClick={() =>
                                                    navigate(`/products/${pr._id}`)
                                                }
                                                whileHover={
                                                    shouldReduceMotion
                                                        ? {}
                                                        : { scale: 1.04 }
                                                }
                                                whileTap={
                                                    shouldReduceMotion
                                                        ? {}
                                                        : { scale: 0.96 }
                                                }
                                                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-950/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1b24]"
                                            >
                                                View
                                                <span aria-hidden="true">→</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-14 text-center backdrop-blur-xl">
                        <p className="text-lg font-medium text-gray-200">
                            No featured products yet
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            Check back soon to discover our latest picks.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default FeaturedProduct;
