
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 18 },
  },
  exit: {
    opacity: 0,
    x: 70,
    scale: 0.92,
    transition: { duration: 0.25 },
  },
};

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removeItemId, setRemoveItemId] = useState(null);
  const [actionError, setActionError] = useState("");

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/cart/carts/fetch",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch your cart.");
        }

        setCart(data.data);
      } catch (err) {
        setError(err.message || "Unable to load your cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdatingItemId(itemId);
    setActionError("");

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/cart/carts/${itemId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity.");
      }

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item._id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      }));
    } catch (err) {
      setActionError(err.message || "Failed to update quantity.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const removingItem = async (itemId) => {
    setRemoveItemId(itemId);
    setActionError("");

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/cart/carts/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove the item.");
      }

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item._id !== itemId),
      }));
    } catch (err) {
      setActionError(err.message || "Failed to remove the item.");
    } finally {
      setRemoveItemId(null);
    }
  };

  const items = cart?.items ?? [];
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const money = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const enter = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 100, damping: 18 };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101116] px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-9"
          >
            <div className="mb-3 h-4 w-28 animate-pulse rounded-full bg-indigo-900/50" />
            <div className="h-10 w-64 max-w-full animate-pulse rounded-xl bg-indigo-950/50" />
            <div className="mt-3 h-4 w-52 animate-pulse rounded-full bg-violet-950/50" />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: item * 0.1 }}
                  className="flex gap-5 rounded-3xl border border-white/10 bg-[#191a23] p-5 shadow-sm"
                >
                  <div className="h-28 w-28 shrink-0 animate-pulse rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700" />
                  <div className="flex-1 space-y-3 py-2">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-slate-700/50" />
                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-700/50" />
                    <div className="h-7 w-24 animate-pulse rounded bg-indigo-950/40" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="h-64 animate-pulse rounded-3xl bg-[#191a23] shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-950/60 p-6"
      >
        <div className="max-w-md rounded-3xl border border-red-400/20 bg-[#191a23] p-9 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-950/30 text-3xl">
            !
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Couldn’t load your cart
          </h2>
          <p className="mt-3 text-slate-400">{error}</p>
          <motion.button
            whileHover={reduceMotion ? {} : { scale: 1.04 }}
            whileTap={reduceMotion ? {} : { scale: 0.96 }}
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-black/20"
          >
            Try again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#101116] px-4 py-8 text-slate-100 sm:px-6 sm:py-12 lg:px-8">
      {/* Ambient background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, 30, 0], y: [0, -25, 0], scale: [1, 1.08, 1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-indigo-950/400/10 blur-3xl"
        />
        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, -25, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 top-80 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#a5b4fc12_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <motion.main
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter}
        className="relative z-10 mx-auto max-w-6xl"
      >
        {/* Header */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enter, delay: 0.05 }}
          className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-[#191a23]/80 px-4 py-2 text-sm font-semibold text-indigo-300 shadow-sm backdrop-blur"
            >
              <motion.span
                animate={reduceMotion ? {} : { rotate: [0, -12, 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              >
                ✦
              </motion.span>
              YOUR PERSONAL COLLECTION
            </motion.div>

            <h1 className="text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">
              Your cart
              <span className="ml-3 bg-gradient-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                awaits.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-slate-400">
              Your favorites, all in one place. Take another look at what you love.
            </p>
          </div>

          <motion.div
            whileHover={reduceMotion ? {} : { y: -4, rotate: 1 }}
            className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-[#191a23]/80 px-5 py-4 shadow-lg shadow-black/20 backdrop-blur"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 text-2xl text-white shadow-md shadow-black/20">
              ♡
            </div>
            <div>
              <p className="text-sm text-slate-400">Items in your cart</p>
              <motion.p
                key={totalItems}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-extrabold text-slate-100"
              >
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </motion.p>
            </div>
          </motion.div>
        </motion.header>

        {/* Action error */}
        <AnimatePresence>
          {actionError && (
            <motion.div
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              role="alert"
              className="mb-5 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-950/30 px-5 py-4 text-sm font-medium text-red-300">
                <span>⚠ {actionError}</span>
                <button
                  onClick={() => setActionError("")}
                  aria-label="Dismiss error"
                  className="rounded-lg px-2 py-1 text-lg hover:bg-red-900/40"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {items.length === 0 ? (
          /* Empty cart */
          <motion.section
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={enter}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#191a23]/80 px-6 py-16 text-center shadow-xl shadow-black/20 backdrop-blur-xl sm:py-24"
          >
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : { y: [0, -10, 0], rotate: [0, -5, 5, 0] }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-indigo-950/60 via-violet-950/50 to-pink-100 text-5xl shadow-inner"
            >
              🛍️
            </motion.div>

            <h2 className="text-3xl font-black tracking-tight text-slate-100">
              It's a little empty here
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-400">
              Your next favorite thing is out there. Explore the collection and
              add something you love.
            </p>

            <motion.div
              animate={reduceMotion ? {} : { opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mx-auto mt-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
          </motion.section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
            {/* Cart items */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <h2 className="text-lg font-bold text-slate-200">
                  Shopping bag
                </h2>
                <span className="text-sm text-slate-500">
                  {items.length} {items.length === 1 ? "product" : "products"}
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.article
                    key={item._id}
                    layout={!reduceMotion}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={reduceMotion ? { opacity: 0 } : "exit"}
                    whileHover={reduceMotion ? {} : { y: -4, scale: 1.005 }}
                    transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#191a23]/90 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:p-5"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-y-100" />

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <motion.div
                        whileHover={reduceMotion ? {} : { scale: 1.035 }}
                        className="relative h-48 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 sm:h-32 sm:w-32"
                      >
                        {item.product?.images?.[0]?.url ? (
                          <motion.img
                            src={item.product.images[0].url}
                            alt={item.product.name || "Product"}
                            whileHover={reduceMotion ? {} : { scale: 1.12 }}
                            transition={{ duration: 0.5 }}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-4xl">
                            📦
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </motion.div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
                          {item.product?.brand || "Selected for you"}
                        </p>

                        <h3 className="line-clamp-2 text-lg font-extrabold text-slate-100 transition-colors duration-200 group-hover:text-indigo-200 sm:text-xl">
                          {item.product?.name || "Product"}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          Unit price{" "}
                          <span className="font-semibold text-slate-300">
                            {money(item.price)}
                          </span>
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          {/* Quantity controls */}
                          <div className="inline-flex items-center gap-1 rounded-xl border border-white/10/10 bg-slate-800/70 p-1">
                            <motion.button
                              whileHover={reduceMotion ? {} : { scale: 1.08 }}
                              whileTap={reduceMotion ? {} : { scale: 0.88 }}
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                              disabled={
                                item.quantity <= 1 ||
                                updatingItemId === item._id ||
                                removeItemId === item._id
                              }
                              aria-label={`Decrease quantity of ${item.product?.name || "product"}`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-xl font-medium text-slate-300 transition-colors hover:bg-[#272833] hover:text-indigo-200 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              −
                            </motion.button>

                            <motion.span
                              key={item.quantity}
                              initial={reduceMotion ? false : { scale: 0.75, opacity: 0.5 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="min-w-9 text-center text-sm font-extrabold tabular-nums text-slate-100"
                            >
                              {updatingItemId === item._id ? "…" : item.quantity}
                            </motion.span>

                            <motion.button
                              whileHover={reduceMotion ? {} : { scale: 1.08 }}
                              whileTap={reduceMotion ? {} : { scale: 0.88 }}
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                              disabled={
                                updatingItemId === item._id ||
                                removeItemId === item._id
                              }
                              aria-label={`Increase quantity of ${item.product?.name || "product"}`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-xl font-medium text-slate-300 transition-colors hover:bg-[#272833] hover:text-indigo-200 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              +
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={reduceMotion ? {} : { scale: 1.04 }}
                            whileTap={reduceMotion ? {} : { scale: 0.95 }}
                            onClick={() => removingItem(item._id)}
                            disabled={
                              removeItemId === item._id ||
                              updatingItemId === item._id
                            }
                            className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-red-950/30 hover:text-red-300 disabled:opacity-40"
                          >
                            {removeItemId === item._id
                              ? "Removing…"
                              : "✕ Remove"}
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-end justify-between border-t border-white/10/10 pt-4 sm:block sm:border-0 sm:pt-0 sm:text-right">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                          Subtotal
                        </p>
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.p
                            key={item.price * item.quantity}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                            className="mt-1 text-2xl font-black tracking-tight text-slate-100"
                          >
                            {money(item.price * item.quantity)}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.section>

            {/* Order summary */}
            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...enter, delay: 0.2 }}
              className="lg:sticky lg:top-8"
            >
              <motion.div
                whileHover={reduceMotion ? {} : { y: -3 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#191a23]/90 p-6 shadow-[0_15px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7"
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-500/10 blur-2xl" />

                <div className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 text-xl text-white shadow-lg shadow-black/20">
                      ✦
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-100">
                        Order summary
                      </h2>
                      <p className="text-sm text-slate-400">
                        A little happiness, totaled up.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-dashed border-white/10/10 pb-5">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-400">Items ({totalItems})</span>
                      <span className="font-semibold text-slate-200">
                        {money(totalAmount)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-400">Shipping</span>
                      <span className="font-semibold text-emerald-300">
                        Calculated at checkout
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-400">Discount</span>
                      <span className="font-semibold text-slate-200">
                        — 
                      </span>
                    </div>
                  </div>

                  <div className="py-5">
                    <p className="text-sm font-medium text-slate-400">
                      Estimated total
                    </p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={totalAmount}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        className="mt-1 text-4xl font-black tracking-tight text-slate-50"
                      >
                        {money(totalAmount)}
                      </motion.p>
                    </AnimatePresence>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Final shipping charges and applicable taxes will be
                      confirmed before you place your order.
                    </p>
                  </div>

                  <motion.div
                    animate={reduceMotion ? {} : { opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-5 flex items-center gap-2 rounded-xl bg-emerald-950/35 px-3 py-3 text-xs font-semibold text-emerald-300"
                  >
                    <span>✓</span>
                    Your selected items are in your cart
                  </motion.div>

                  {/* Checkout isn't connected to an order endpoint yet. */}
                  <div className="rounded-xl border border-indigo-400/20 bg-indigo-950/40 p-4">
                    <p className="text-sm font-bold text-indigo-200">
                      Ready for the next step?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-indigo-300">
                      Your cart is ready. Connect your checkout page here when
                      your order flow is implemented.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <span>🔒</span>
                    Review your order before payment
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-center text-xs font-medium text-slate-400"
              >
                <span className="text-indigo-300">✧</span>
                Good choices. Great finds. Happy shopping.
              </motion.div>
            </motion.aside>
          </div>
        )}
      </motion.main>
    </div>
  );
}

export default Cart;
