
import React from "react";
import { Link } from "react-router-dom";

const aboutStyles = `
    .about-shell {
        position: relative;
        isolation: isolate;
        background:
            radial-gradient(ellipse at 50% -20%, #30205a 0%, transparent 55%),
            linear-gradient(145deg, #080914 0%, #0b1020 48%, #0a0b16 100%);
    }

    .about-atmosphere {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    .about-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(75px);
        opacity: .22;
        animation: aboutFloat 12s ease-in-out infinite alternate;
    }

    .about-orb-one {
        width: 330px;
        height: 330px;
        background: #7c3aed;
        top: 5%;
        left: -140px;
    }

    .about-orb-two {
        width: 380px;
        height: 380px;
        background: #2563eb;
        top: 38%;
        right: -180px;
        animation-delay: -4s;
    }

    .about-orb-three {
        width: 280px;
        height: 280px;
        background: #c026d3;
        bottom: 5%;
        left: 30%;
        opacity: .12;
        animation-delay: -7s;
    }

    .about-grid {
        position: absolute;
        inset: 0;
        opacity: .10;
        background-image:
            linear-gradient(#a5b4fc 1px, transparent 1px),
            linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
        background-size: 54px 54px;
        mask-image: linear-gradient(to bottom, black, transparent 78%);
    }

    .about-glass {
        background: linear-gradient(
            135deg,
            rgba(255,255,255,.085),
            rgba(255,255,255,.025)
        );
        border: 1px solid rgba(196,181,253,.14);
        box-shadow:
            0 18px 55px rgba(0,0,0,.18),
            inset 0 1px 0 rgba(255,255,255,.07);
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
    }

    .about-hover {
        transition:
            transform 350ms cubic-bezier(.2,.7,.3,1),
            border-color 350ms ease,
            background 350ms ease,
            box-shadow 350ms ease;
    }

    .about-hover:hover {
        transform: translateY(-6px);
        border-color: rgba(167,139,250,.35);
        background: linear-gradient(
            135deg,
            rgba(139,92,246,.12),
            rgba(255,255,255,.035)
        );
        box-shadow: 0 22px 60px rgba(0,0,0,.26);
    }

    .about-gradient {
        color: #c4b5fd;
        background: linear-gradient(110deg, #c4b5fd, #60a5fa, #e879f9);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .about-enter {
        animation: aboutFadeUp 700ms cubic-bezier(.2,.7,.3,1) both;
    }

    .about-delay-1 { animation-delay: 100ms; }
    .about-delay-2 { animation-delay: 200ms; }
    .about-delay-3 { animation-delay: 300ms; }
    .about-delay-4 { animation-delay: 400ms; }

    .about-visual {
        position: relative;
        overflow: hidden;
        background:
            radial-gradient(ellipse at 25% 25%, rgba(139,92,246,.42), transparent 48%),
            radial-gradient(ellipse at 85% 75%, rgba(59,130,246,.30), transparent 48%),
            linear-gradient(145deg, #17132f, #0b1020 65%, #17102b);
        border: 1px solid rgba(167,139,250,.22);
    }

    .about-ring {
        position: absolute;
        border: 1px solid rgba(196,181,253,.22);
        border-radius: 50%;
        animation: aboutOrbit 12s linear infinite;
    }

    .about-ring-one {
        width: 250px;
        height: 250px;
    }

    .about-ring-two {
        width: 350px;
        height: 350px;
        animation-direction: reverse;
        animation-duration: 18s;
    }

    .about-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        flex-shrink: 0;
        border-radius: 17px;
        color: #c4b5fd;
        background: rgba(139,92,246,.13);
        border: 1px solid rgba(167,139,250,.22);
        transition: transform 300ms ease, background 300ms ease;
    }

    .about-hover:hover .about-icon {
        transform: scale(1.07) rotate(-4deg);
        background: rgba(139,92,246,.2);
    }

    .about-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 13px 23px;
        border-radius: 14px;
        color: white;
        font-weight: 600;
        background: linear-gradient(110deg, #7c3aed, #6366f1, #8b5cf6);
        background-size: 200% 100%;
        box-shadow: 0 8px 25px rgba(124,58,237,.25);
        transition: transform 250ms ease, box-shadow 250ms ease;
    }

    .about-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px rgba(124,58,237,.4);
    }

    .about-button:active {
        transform: scale(.98);
    }

    @keyframes aboutFadeUp {
        from { opacity: 0; transform: translateY(22px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes aboutFloat {
        from { transform: translate3d(0,0,0) scale(1); }
        to { transform: translate3d(28px,-24px,0) scale(1.12); }
    }

    @keyframes aboutOrbit {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
        .about-enter, .about-orb, .about-ring {
            animation: none !important;
        }

        .about-hover, .about-icon, .about-button {
            transition: none !important;
        }

        .about-hover:hover, .about-button:hover {
            transform: none !important;
        }
    }
`;

const values = [
    {
        number: "01",
        icon: "✧",
        title: "Quality First",
        description:
            "We believe the little details matter. Our goal is to help you discover products that feel thoughtful, useful, and worth choosing.",
    },
    {
        number: "02",
        icon: "◇",
        title: "A Better Experience",
        description:
            "From browsing to checkout, we aim to make every step clear, convenient, and enjoyable.",
    },
    {
        number: "03",
        icon: "♡",
        title: "Customers Matter",
        description:
            "Your trust matters to us. We want every interaction with our store to feel simple, transparent, and dependable.",
    },
];

function About() {
    return (
        <>
            <style>{aboutStyles}</style>

            <main className="about-shell min-h-screen overflow-hidden text-white">
                {/* Ambient background */}
                <div className="about-atmosphere" aria-hidden="true">
                    <div className="about-grid" />
                    <div className="about-orb about-orb-one" />
                    <div className="about-orb about-orb-two" />
                    <div className="about-orb about-orb-three" />
                </div>

                {/* Hero */}
                <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="about-enter inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-200 mb-7">
                            <span className="h-2 w-2 rounded-full bg-violet-300" />
                            A little about us
                        </div>

                        <h1 className="about-enter about-delay-1 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                            Shopping should feel
                            <span className="block about-gradient mt-2">
                                a little more special.
                            </span>
                        </h1>

                        <p className="about-enter about-delay-2 max-w-2xl mx-auto mt-7 text-base sm:text-lg leading-8 text-slate-300">
                            We believe finding the right product should be
                            simple, inspiring, and enjoyable. That belief
                            shapes the experience we are building for you.
                        </p>

                        <div className="about-enter about-delay-3 mt-9 flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/shop" className="about-button">
                                Explore our shop <span aria-hidden="true">↗</span>
                            </Link>

                            <a
                                href="#our-story"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-medium text-slate-200 transition hover:bg-white/[0.08]"
                            >
                                Discover our story <span aria-hidden="true">↓</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Story and visual */}
                <section
                    id="our-story"
                    className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                        <div className="about-enter about-delay-1 about-visual rounded-3xl min-h-[340px] sm:min-h-[440px] flex items-center justify-center">
                            <div className="about-ring about-ring-one" />
                            <div className="about-ring about-ring-two" />

                            <div className="relative z-10 text-center px-6 py-12">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-200/20 bg-white/[0.07] text-4xl shadow-2xl shadow-violet-500/20">
                                    ✦
                                </div>
                                <p className="text-sm uppercase tracking-[0.28em] text-violet-200">
                                    Our philosophy
                                </p>
                                <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
                                    Thoughtful choices.
                                    <span className="block about-gradient">
                                        Better experiences.
                                    </span>
                                </h2>
                            </div>
                        </div>

                        <div className="about-enter about-delay-2">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-300">
                                Our story
                            </p>

                            <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
                                More than a store.
                                <span className="block text-slate-400">
                                    An experience built around you.
                                </span>
                            </h2>

                            <div className="mt-6 space-y-5 text-slate-300 leading-8">
                                <p>
                                    Shopping online should be more than
                                    scrolling through products. It should
                                    help you find things that fit your needs
                                    and make choosing easier.
                                </p>
                                <p>
                                    That is the idea behind our store:
                                    bringing products together in one
                                    convenient place, with a focus on
                                    simplicity, thoughtful presentation,
                                    and a smooth shopping journey.
                                </p>
                                <p>
                                    We are continually working to make
                                    the experience better, one detail
                                    at a time. And we are glad you are
                                    part of that journey.
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-3">
                                <div className="h-12 w-1 rounded-full bg-gradient-to-b from-violet-400 to-blue-400" />
                                <p className="text-lg font-medium text-white">
                                    Your next great find starts here.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28">
                    <div className="about-enter text-center max-w-2xl mx-auto mb-12">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-300">
                            What guides us
                        </p>
                        <h2 className="mt-4 text-3xl sm:text-5xl font-bold">
                            The values behind
                            <span className="about-gradient"> every detail.</span>
                        </h2>
                        <p className="mt-5 leading-7 text-slate-400">
                            The experience we create is shaped by the
                            principles we want our store to stand for.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {values.map((value, index) => (
                            <article
                                key={value.number}
                                className={`about-glass about-hover about-enter about-delay-${index + 1} rounded-3xl p-6 sm:p-7`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="about-icon text-2xl">
                                        {value.icon}
                                    </div>
                                    <span className="text-sm font-semibold tracking-widest text-slate-500">
                                        {value.number}
                                    </span>
                                </div>

                                <h3 className="mt-7 text-xl font-semibold text-white">
                                    {value.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-400">
                                    {value.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Shopping experience */}
                <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28">
                    <div className="about-glass about-enter rounded-3xl p-7 sm:p-10 lg:p-14">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-300">
                                    Ready when you are
                                </p>
                                <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
                                    Find something
                                    <span className="about-gradient"> you'll love.</span>
                                </h2>
                                <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                                    Take a look around, explore our collection,
                                    and discover what works for you.
                                </p>
                            </div>

                            <Link to="/shop" className="about-button w-full sm:w-auto">
                                Start exploring <span aria-hidden="true">↗</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Closing statement */}
                <footer className="border-t border-white/[0.07] px-5 py-8 text-center">
                    <p className="text-sm text-slate-500">
                        Thoughtfully chosen. Made for your everyday.
                    </p>
                </footer>
            </main>
        </>
    );
}

export default About;
