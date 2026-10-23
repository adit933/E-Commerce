
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Categories", to: "/categories" },
      { label: "New Arrivals", to: "/shop" },
      { label: "Featured", to: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "X / Twitter", href: "https://x.com/" },
];

function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" },
  };

  return (
    <footer className="relative isolate overflow-hidden bg-[#101116] px-4 py-12 text-white sm:px-7 sm:py-16">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 -z-10 h-72 w-72 rounded-full bg-violet-600/15 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-indigo-500/15 blur-[110px]"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          {...reveal}
          className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-10 lg:p-12"
        >
          {/* Subtle glass highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand */}
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.25 }}
              className="lg:pr-5"
            >
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-indigo-500/20 text-lg font-bold text-violet-200 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  Y
                </span>
                <span className="text-2xl font-bold tracking-tight">
                  Your<span className="text-violet-300">Store</span>
                </span>
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
                Discover products carefully selected for your everyday life.
                Quality finds, a smooth shopping experience, and more.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                <span className="text-xs tracking-wide text-gray-500">
                  Made for your everyday
                </span>
              </div>
            </motion.div>

            {/* Navigation sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 15 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                }}
              >
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                  {section.title}
                </h3>

                <ul className="space-y-2">
                  {section.links.map((item) => (
                    <li key={item.label}>
                      <motion.div
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { x: 5, scale: 1.035 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 20,
                        }}
                      >
                        <Link
                          to={item.to}
                          className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 text-sm text-gray-400 transition-all duration-300 hover:border-violet-400/15 hover:bg-white/[0.055] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                        >
                          <span>{item.label}</span>
                          <span className="translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              className="h-4 w-4 text-violet-300"
                              aria-hidden="true"
                            >
                              <path
                                d="M4 10h12m-5-5 5 5-5 5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : 0.25,
              }}
            >
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                Follow Us
              </h3>

              <p className="mb-4 text-sm leading-6 text-gray-400">
                Stay connected for updates, new arrivals, and more.
              </p>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.label}`}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -4, scale: 1.06 }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.96 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 18,
                    }}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-300 transition-colors duration-300 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="my-9 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-10" />

          {/* Footer bottom */}
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} YourStore. All rights reserved.
            </p>

            <Link
              to="/"
              className="text-xs text-gray-500 transition-colors duration-300 hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              Back to top ↑
            </Link>
          </div>
        </motion.div>

        <p className="mt-5 text-center text-[11px] tracking-wide text-gray-600">
          A little something for your everyday.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
