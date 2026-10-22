import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
];

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.97 },
      };

  const linkClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-violet-200"
        : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
    }`;

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 110, damping: 18 }
      }
      className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#101116]/90 text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      {/* Soft animated ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, 24, 0], opacity: [0.12, 0.24, 0.12] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 left-[18%] h-28 w-64 rounded-full bg-violet-500/20 blur-3xl"
        />
        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, -20, 0], opacity: [0.08, 0.18, 0.08] }
          }
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 right-[12%] h-28 w-56 rounded-full bg-indigo-500/15 blur-3xl"
        />
      </div>

      <div className="mx-auto flex min-h-[68px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Brand / logo */}
        <motion.button
          type="button"
          onClick={() => navigate("/")}
          {...motionProps}
          aria-label="Go to home"
          className="group flex shrink-0 items-center gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <motion.span
            whileHover={reduceMotion ? {} : { rotate: -4, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="relative block h-11 w-11 overflow-hidden rounded-2xl border border-white/10 bg-[#191a23] shadow-lg shadow-violet-950/20"
          >
            <img
              src="/src/assets/dmitry-mashkin-adCT4qOQeY4-unsplash.jpg"
              alt="Store logo"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.span>
          <span className="hidden text-sm font-bold tracking-wide text-slate-100 sm:block">
            <span className="block">YOUR STORE</span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Curated for you
            </span>
          </span>
        </motion.button>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.06 * index }}
            >
              <NavLink to={item.to} end={item.end} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        className="absolute inset-0 rounded-lg border border-violet-400/20 bg-violet-400/[0.10]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Quick links and account actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <motion.div {...motionProps}>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-violet-200"
                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                }`
              }
            >
              Wishlist
            </NavLink>
          </motion.div>
          <motion.div {...motionProps}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-violet-200"
                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                }`
              }
            >
              Cart
            </NavLink>
          </motion.div>
          <motion.div {...motionProps}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-violet-200"
                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                }`
              }
            >
              Profile
            </NavLink>
          </motion.div>

          <span className="mx-1 h-7 w-px bg-white/10" />

          {user ? (
            <>
              <motion.button
                type="button"
                onClick={() => navigate("/login")}
                {...motionProps}
                className="rounded-xl border border-violet-400/30 px-4 py-2 text-sm font-semibold text-violet-200 transition-colors hover:border-violet-300/60 hover:bg-violet-400/10"
              >
                Log out
              </motion.button>
              <motion.button
                type="button"
                onClick={() => navigate("/profile")}
                {...motionProps}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all hover:from-violet-500 hover:to-indigo-500"
              >
                My profile
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                type="button"
                onClick={() => navigate("/login")}
                {...motionProps}
                className="rounded-xl border border-violet-400/30 px-4 py-2 text-sm font-semibold text-violet-200 transition-colors hover:border-violet-300/60 hover:bg-violet-400/10"
              >
                Login
              </motion.button>
              <motion.button
                type="button"
                onClick={() => navigate("/register")}
                {...motionProps}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all hover:from-violet-500 hover:to-indigo-500"
              >
                Register
              </motion.button>
            </>
          )}
        </div>

        {/* Compact mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            type="button"
            whileTap={reduceMotion ? {} : { scale: 0.92 }}
            onClick={() => navigate("/cart")}
            aria-label="Open cart"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-slate-200"
          >
            Cart
          </motion.button>
          <motion.button
            type="button"
            whileTap={reduceMotion ? {} : { scale: 0.92 }}
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200"
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <span className="flex w-5 flex-col gap-1.5">
              <motion.span
                animate={
                  mobileOpen && !reduceMotion
                    ? { rotate: 45, y: 4.5 }
                    : { rotate: 0, y: 0 }
                }
                className="h-0.5 w-full rounded-full bg-current"
              />
              <motion.span
                animate={
                  mobileOpen && !reduceMotion
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                className="h-0.5 w-full rounded-full bg-current"
              />
              <motion.span
                animate={
                  mobileOpen && !reduceMotion
                    ? { rotate: -45, y: -4.5 }
                    : { rotate: 0, y: 0 }
                }
                className="h-0.5 w-full rounded-full bg-current"
              />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#14151c]/95 px-4 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 py-3">
              {[...navItems, { to: "/wishlist", label: "Wishlist" }, { to: "/cart", label: "Cart" }, { to: "/profile", label: "Profile" }].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "border border-violet-400/20 bg-violet-400/10 text-violet-200"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-3">
                {user ? (
                  <>
                    <motion.button
                      type="button"
                      whileTap={reduceMotion ? {} : { scale: 0.97 }}
                      onClick={() => {
                        closeMobile();
                        navigate("/login");
                      }}
                      className="rounded-xl border border-violet-400/30 px-4 py-3 text-sm font-semibold text-violet-200"
                    >
                      Log out
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={reduceMotion ? {} : { scale: 0.97 }}
                      onClick={() => {
                        closeMobile();
                        navigate("/profile");
                      }}
                      className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                    >
                      My profile
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      type="button"
                      whileTap={reduceMotion ? {} : { scale: 0.97 }}
                      onClick={() => {
                        closeMobile();
                        navigate("/login");
                      }}
                      className="rounded-xl border border-violet-400/30 px-4 py-3 text-sm font-semibold text-violet-200"
                    >
                      Login
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={reduceMotion ? {} : { scale: 0.97 }}
                      onClick={() => {
                        closeMobile();
                        navigate("/register");
                      }}
                      className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                    >
                      Register
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
