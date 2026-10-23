
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const shouldReduceMotion = useReducedMotion();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);

    // Fetch product whenever the URL product ID changes
    useEffect(() => {
        const controller = new AbortController();

        const fetchProduct = async () => {
            setLoading(true);
            setErrorMessage("");
            setProduct(null);
            setQuantity(1);

            try {
                const response = await fetch(
                    `http://localhost:8000/api/v1/product/products/${id}`,
                    { signal: controller.signal }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load product.");
                }

                setProduct(data.data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching product:", error);
                    setErrorMessage(error.message || "Unable to load product.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchProduct();

        return () => controller.abort();
    }, [id]);

    // Automatically dismiss notifications after 3 seconds
    useEffect(() => {
        if (!successMessage && !errorMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage, errorMessage]);

    // Add product to cart
    const addToCart = async () => {
        if (!product || addingToCart) return;

        setAddingToCart(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await fetch(
                "http://localhost:8000/api/v1/cart/carts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        productId: id,
                        quantity: quantity,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not add product to cart.");
            }

            setSuccessMessage("Product added successfully to your cart!");
            console.log("Add to cart response:", data);
        } catch (error) {
            console.error("Error adding product to cart:", error);
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        } finally {
            setAddingToCart(false);
        }
    };

    const changeQuantity = (amount) => {
        setQuantity((current) => {
            const next = current + amount;
            const maxStock = Number(product?.stock);

            if (next < 1) return 1;

            if (Number.isFinite(maxStock) && maxStock >= 0) {
                return Math.min(next, maxStock);
            }

            return next;
        });
    };

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

    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101116] px-6 text-white">
                <motion.div
                    animate={shouldReduceMotion ? {} : { opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="h-12 w-12 rounded-full border-2 border-violet-400/20 border-t-violet-400 animate-spin" />
                    <p className="text-sm text-gray-400">Loading product...</p>
                </motion.div>
            </div>
        );
    }

    // Error or missing product state
    if (errorMessage && !product) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101116] px-6 text-white">
                <div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
                    <div className="text-4xl">⚠️</div>
                    <h2 className="mt-4 text-xl font-semibold">Product unavailable</h2>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        {errorMessage}
                    </p>
                    <button
                        onClick={() => navigate("/shop")}
                        className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-medium text-white transition hover:brightness-110"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const imageUrl = product.images?.[0]?.url;
    const outOfStock = Number(product.stock) <= 0;

    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-[#101116] px-6 py-12 text-white sm:px-10 lg:px-20 lg:py-20">

            {/* Ambient background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : { x: [0, 25, 0], y: [0, -20, 0] }
                    }
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-40 -top-32 h-[450px] w-[450px] rounded-full bg-violet-600/15 blur-[120px]"
                />
                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : { x: [0, -25, 0], y: [0, 20, 0] }
                    }
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[130px]"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#101116_85%)]" />
            </div>

            {/* Success and error notifications */}
            <div className="fixed right-4 top-5 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6">
                <AnimatePresence>
                    {successMessage && (
                        <motion.div
                            key="success"
                            role="status"
                            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-[#191f22]/95 px-5 py-4 text-sm text-white shadow-2xl shadow-black/30 backdrop-blur-2xl"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                                ✓
                            </span>
                            <span className="flex-1">{successMessage}</span>
                            <button
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
                            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 rounded-2xl border border-red-400/20 bg-[#24191d]/95 px-5 py-4 text-sm text-white shadow-2xl backdrop-blur-2xl"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-400/15 text-red-300">
                                !
                            </span>
                            <span className="flex-1">{errorMessage}</span>
                            <button
                                onClick={() => setErrorMessage("")}
                                aria-label="Close error notification"
                                className="text-xl text-gray-400 transition hover:text-white"
                            >
                                ×
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">

                {/* Breadcrumb */}
                <motion.button
                    {...reveal(0)}
                    onClick={() => navigate("/shop")}
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-violet-300"
                >
                    <span>←</span>
                    Back to Shop
                </motion.button>

                {/* Main product panel */}
                <div className="grid grid-cols-1 items-center gap-10 rounded-[2rem] border border-white/[0.08] bg-[#1a1b24]/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">

                    {/* Product image */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: shouldReduceMotion ? 0 : -25,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-violet-500/15 via-transparent to-indigo-500/15 blur-2xl" />

                        <motion.div
                            whileHover={shouldReduceMotion ? {} : { y: -5 }}
                            transition={{ duration: 0.35 }}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#22232d]"
                        >
                            <div className="flex aspect-[4/4.5] max-h-[650px] items-center justify-center overflow-hidden">
                                {imageUrl ? (
                                    <motion.img
                                        initial={{ scale: shouldReduceMotion ? 1 : 1.04 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.9, ease: "easeOut" }}
                                        src={imageUrl}
                                        alt={product.name || "Product"}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-3 text-gray-500">
                                        <span className="text-5xl">🛍️</span>
                                        <span className="text-sm">Image unavailable</span>
                                    </div>
                                )}
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/[0.03]" />

                            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-xl">
                                <span className="text-violet-300">✦</span>
                                Featured Product
                            </div>

                            {product.stock != null && (
                                <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-gray-200 backdrop-blur-xl">
                                    {outOfStock ? "Currently unavailable" : "Available to order"}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Product details */}
                    <div className="flex flex-col justify-center py-3 lg:py-5">

                        <motion.span
                            {...reveal(0.1)}
                            className="w-fit rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-4 py-2 text-sm font-medium text-violet-200"
                        >
                            ✨ A closer look
                        </motion.span>

                        <motion.h1
                            {...reveal(0.2)}
                            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                        >
                            {product.name}
                        </motion.h1>

                        <motion.div {...reveal(0.3)} className="mt-5 flex flex-wrap items-baseline gap-3">
                            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                ₹{product.price}
                            </p>

                            {product.brand && (
                                <span className="text-sm text-gray-400">
                                    by {product.brand}
                                </span>
                            )}
                        </motion.div>

                        <motion.div
                            {...reveal(0.3)}
                            className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400"
                        />

                        <motion.p
                            {...reveal(0.4)}
                            className="mt-6 text-base leading-8 text-gray-400 sm:text-lg"
                        >
                            {product.description}
                        </motion.p>

                        {/* Stock information */}
                        {product.stock != null && (
                            <motion.p
                                {...reveal(0.45)}
                                className={`mt-5 text-sm ${
                                    outOfStock ? "text-red-300" : "text-emerald-300"
                                }`}
                            >
                                {outOfStock
                                    ? "Currently out of stock"
                                    : `${product.stock} available`}
                            </motion.p>
                        )}

                        {/* Quantity selector */}
                        <motion.div {...reveal(0.5)} className="mt-8">
                            <label className="text-sm font-semibold text-gray-200">
                                Quantity
                            </label>

                            <div className="mt-3 flex w-fit items-center overflow-hidden rounded-xl border border-white/10 bg-black/20">
                                <motion.button
                                    type="button"
                                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                                    onClick={() => changeQuantity(-1)}
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                    className="flex h-12 w-12 items-center justify-center text-xl text-gray-300 transition-colors hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    −
                                </motion.button>

                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={quantity}
                                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -5 }}
                                        className="min-w-12 text-center font-semibold text-white"
                                    >
                                        {quantity}
                                    </motion.span>
                                </AnimatePresence>

                                <motion.button
                                    type="button"
                                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                                    onClick={() => changeQuantity(1)}
                                    disabled={
                                        outOfStock ||
                                        (product.stock != null && quantity >= Number(product.stock))
                                    }
                                    aria-label="Increase quantity"
                                    className="flex h-12 w-12 items-center justify-center text-xl text-gray-300 transition-colors hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    +
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div {...reveal(0.6)} className="mt-8 flex flex-col gap-4">
                            <motion.button
                                type="button"
                                onClick={addToCart}
                                disabled={addingToCart || outOfStock}
                                whileHover={
                                    shouldReduceMotion || addingToCart || outOfStock
                                        ? {}
                                        : { y: -2, scale: 1.01 }
                                }
                                whileTap={
                                    shouldReduceMotion || addingToCart || outOfStock
                                        ? {}
                                        : { scale: 0.98 }
                                }
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1b24] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {addingToCart ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Adding to Cart...
                                    </>
                                ) : outOfStock ? (
                                    "Out of Stock"
                                ) : (
                                    <>
                                        <span>🛒</span>
                                        Add to Cart
                                        <span aria-hidden="true">→</span>
                                    </>
                                )}
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={() => navigate("/cart")}
                                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-base font-semibold text-gray-200 backdrop-blur-xl transition-colors duration-300 hover:border-violet-400/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                            >
                                🛍️ View Cart
                            </motion.button>
                        </motion.div>

                        {/* Small reassurance details */}
                        <motion.div
                            {...reveal(0.7)}
                            className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/[0.08] pt-5 text-xs text-gray-500"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-violet-300">✓</span>
                                Simple shopping
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-violet-300">✓</span>
                                Secure account checkout
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;
