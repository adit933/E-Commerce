
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user, loading } = useContext(AuthContext);

    console.log(user, " ", loading);
    const navigate = useNavigate();

    if (loading) {
        return (
            <main className="min-h-screen bg-[#080914] flex items-center justify-center p-6 text-white">
                <div className="text-center">
                    <div className="profile-spinner w-14 h-14 rounded-full mx-auto" />
                    <h2 className="text-xl font-bold mt-5">
                        Loading your profile
                    </h2>
                    <p className="text-slate-400 mt-2">
                        Getting your account ready...
                    </p>
                </div>
                <style>{`
                    .profile-spinner {
                        border: 3px solid #ffffff15;
                        border-top-color: #a78bfa;
                        border-right-color: #60a5fa;
                        animation: profileSpin 0.8s linear infinite;
                    }
                    @keyframes profileSpin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="profile-shell min-h-screen flex items-center justify-center p-5 text-white">
                <style>{profileStyles}</style>
                <div className="glass-panel profile-enter max-w-md w-full rounded-3xl p-8 sm:p-10 text-center">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-violet-400/10 border border-violet-300/20 text-violet-300 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-10 h-10">
                            <circle cx="12" cy="8" r="4" />
                            <path strokeLinecap="round" d="M4 21a8 8 0 0 1 16 0" />
                        </svg>
                    </div>

                    <p className="text-xs font-bold tracking-[0.25em] text-violet-300 mt-7">
                        MY ACCOUNT
                    </p>

                    <h1 className="text-3xl font-black mt-3">
                        Welcome back<span className="text-violet-400">.</span>
                    </h1>

                    <p className="text-slate-400 mt-4 leading-7">
                        Sign in to view your profile and manage your saved
                        delivery addresses.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="glow-button mt-8 w-full rounded-xl px-5 py-3.5 font-bold text-white transition-all duration-300"
                    >
                        Log in to your account →
                    </button>
                </div>
            </main>
        );
    }

    const avatarUrl =
        typeof user.avatar === "string"
            ? user.avatar
            : user.avatar?.url;

    const fullName = user.fullName || user.username || "User";

    const addresses = Array.isArray(user.address)
        ? user.address
        : user.address
            ? [user.address]
            : [];

    const address =
        addresses.find((item) => item.isDefault === true) ||
        addresses[0] ||
        null;

    const addressText = address
        ? [
            address.street,
            address.city,
            address.state,
            address.pincode || address.postalCode,
            address.country,
        ].filter(Boolean).join(", ")
        : "";

    const initials = fullName
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const labelClass =
        "text-xs font-bold uppercase tracking-[0.16em] text-slate-400";

    const valueClass =
        "mt-2 text-base sm:text-lg font-bold text-slate-100 break-words";

    return (
        <main className="profile-shell min-h-screen text-slate-100 overflow-hidden">
            <style>{profileStyles}</style>

            {/* Animated background */}
            <div className="profile-atmosphere" aria-hidden="true">
                <div className="ambient-orb orb-one" />
                <div className="ambient-orb orb-two" />
                <div className="ambient-orb orb-three" />
                <div className="ambient-grid" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

                {/* Header */}
                <header className="profile-enter mb-8 sm:mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.08] backdrop-blur-xl px-3.5 py-2 text-xs font-bold tracking-wider text-violet-200">
                                <span className="status-pulse w-2 h-2 rounded-full bg-violet-400" />
                                MY ACCOUNT
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mt-5">
                                My Profile<span className="text-gradient">.</span>
                            </h1>

                            <p className="text-slate-400 mt-3 max-w-xl text-sm sm:text-base leading-7">
                                Your personal space. Manage your information
                                and delivery details in one place.
                            </p>
                        </div>


                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-start sm:self-auto">

                            <button
                                type="button"
                                onClick={() => navigate("/edit-profile")}
                                className="glow-button group inline-flex items-center justify-center gap-2.5 rounded-2xl px-5 py-4 font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[-8deg]"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M12 20h9" />
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                                </svg>

                                Update Profile
                            </button>

                            {/* Your existing verification card */}
                            <div className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
                                <div className="w-11 h-11 rounded-xl bg-emerald-400/10 border border-emerald-300/20 text-emerald-300 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2"
                                        className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="m5 12 4 4L19 6" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-white">
                                        {user.isVerified ? "Verified account" : "Your account"}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {user.isVerified
                                            ? "Verification complete"
                                            : "Profile overview"}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">

                    {/* Left column */}
                    <aside className="lg:col-span-4 space-y-6">

                        {/* Identity card */}
                        <section className="identity-card profile-enter delay-1 relative overflow-hidden rounded-3xl p-6 sm:p-8">
                            <div className="identity-orb identity-orb-one" />
                            <div className="identity-orb identity-orb-two" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
                                        Profile overview
                                    </span>
                                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                                        {user.isVerified ? "✓ Verified" : "Member"}
                                    </span>
                                </div>

                                <div className="mt-8 flex flex-col items-center text-center">
                                    <div className="avatar-ring">
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={`${fullName}'s profile`}
                                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#17152d] text-violet-200 flex items-center justify-center text-3xl font-black">
                                                {initials}
                                            </div>
                                        )}
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-extrabold mt-5 break-words">
                                        {fullName}
                                    </h2>

                                    <p className="text-sm text-slate-300 mt-2 break-all">
                                        {user.email || "No email provided"}
                                    </p>

                                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-400/[0.08] border border-emerald-300/20 px-4 py-2 text-xs font-semibold text-emerald-200">
                                        <span className="status-pulse w-2 h-2 rounded-full bg-emerald-400" />
                                        Account overview
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-8">
                                    <div className="stat-tile rounded-2xl p-4">
                                        <p className="text-xs text-slate-300 font-medium">
                                            Saved addresses
                                        </p>
                                        <p className="text-3xl font-black mt-2 text-white">
                                            {addresses.length}
                                        </p>
                                    </div>

                                    <div className="stat-tile rounded-2xl p-4">
                                        <p className="text-xs text-slate-300 font-medium">
                                            Phone number
                                        </p>
                                        <p className="text-base sm:text-lg font-bold mt-2 text-white break-words">
                                            {user.phoneNumber || "Not added"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Account status */}
                        <section className="glass-panel glass-hover profile-enter delay-2 rounded-3xl p-5 sm:p-7">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="icon-tile violet-tile">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="font-extrabold text-lg text-white">
                                        Account status
                                    </h2>
                                    <p className="text-sm text-slate-400 mt-1">
                                        Your account at a glance
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3 py-3 border-b border-white/[0.08]">
                                    <span className="text-sm text-slate-400">
                                        Verification
                                    </span>
                                    <span className={`text-xs font-bold rounded-full px-3 py-1.5 border ${user.isVerified
                                        ? "bg-emerald-400/10 text-emerald-300 border-emerald-300/20"
                                        : "bg-amber-400/10 text-amber-300 border-amber-300/20"
                                        }`}>
                                        {user.isVerified ? "Verified" : "Unverified"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 py-1">
                                    <span className="text-sm text-slate-400">
                                        Address book
                                    </span>
                                    <span className="text-sm font-bold text-slate-100">
                                        {addresses.length} saved
                                    </span>
                                </div>
                            </div>
                        </section>
                    </aside>

                    {/* Right column */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Personal information */}
                        <section className="glass-panel glass-hover profile-enter delay-2 rounded-3xl p-5 sm:p-7 lg:p-8">
                            <div className="flex items-start gap-4 mb-7">
                                <div className="icon-tile violet-tile">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-7 h-7">
                                        <circle cx="12" cy="8" r="4" />
                                        <path strokeLinecap="round" d="M5 21a7 7 0 0 1 14 0" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                                        Personal information
                                    </h2>
                                    <p className="text-sm text-slate-400 mt-1.5 leading-6">
                                        Your registered details, all in one place.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="info-tile">
                                    <p className={labelClass}>Full name</p>
                                    <p className={valueClass}>{fullName}</p>
                                </div>

                                <div className="info-tile">
                                    <p className={labelClass}>Username</p>
                                    <p className={valueClass}>{user.username || "Not provided"}</p>
                                </div>

                                <div className="info-tile">
                                    <p className={labelClass}>Email address</p>
                                    <p className={valueClass}>{user.email || "Not provided"}</p>
                                </div>

                                <div className="info-tile">
                                    <p className={labelClass}>Phone number</p>
                                    <p className={valueClass}>{user.phoneNumber || "Not provided"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Default address */}

                        <section className="glass-panel glass-hover profile-enter delay-3 rounded-3xl p-5 sm:p-7 lg:p-8">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div className="flex items-start gap-4">
                                    <div className="icon-tile blue-tile">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                            <circle cx="12" cy="10" r="2.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                                            Delivery address
                                        </h2>
                                        <p className="text-sm text-slate-400 mt-1.5 leading-6">
                                            Your saved delivery locations.
                                        </p>
                                    </div>
                                </div>

                                <span className="text-xs font-bold text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                                    {addresses.length} saved
                                </span>
                            </div>

                            {addresses.length > 0 ? (
                                <div className="mt-7 space-y-4">
                                    {addresses.map((item, index) => (
                                        <div
                                            key={item._id || index}
                                            className="address-panel rounded-2xl p-5 sm:p-6"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="icon-tile orange-tile">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10V7l7-4 7 4v3M5 10v10m4-10v10m6-10v10m4-10v10M3 20h18" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">
                                                        {item.isDefault
                                                            ? "Default address"
                                                            : `Saved address ${index + 1}`}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {item.isDefault
                                                            ? "Your preferred address"
                                                            : `Address ${index + 1}`}
                                                    </p>
                                                </div>
                                            </div>

                                            {item.isDefault && (
                                                <span className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-emerald-400/10 border border-emerald-300/20 px-3 py-1.5 text-xs font-bold text-emerald-300">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    Default
                                                </span>
                                            )}

                                            <p className="text-slate-200 font-medium leading-7 break-words mt-5">
                                                {[
                                                    item.street,
                                                    item.city,
                                                    item.state,
                                                    item.pincode || item.postalCode,
                                                    item.country,
                                                ].filter(Boolean).join(", ") ||
                                                    "Address details are incomplete."}
                                            </p>

                                            <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-2 text-xs sm:text-sm text-slate-400 leading-6">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 shrink-0 mt-1">
                                                    <circle cx="12" cy="12" r="9" />
                                                    <path strokeLinecap="round" d="M12 11v5m0-8h.01" />
                                                </svg>
                                                <span>
                                                    You can manage your saved addresses from your address management page.
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-address mt-7 rounded-2xl p-7 sm:p-9 text-center">
                                    <div className="icon-tile blue-tile mx-auto">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                            <circle cx="12" cy="10" r="2.5" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-white mt-4">
                                        No saved address yet
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2 leading-6 max-w-sm mx-auto">
                                        Your saved delivery addresses will appear here once you add one.
                                    </p>
                                </div>
                            )}
                        </section>

                    </div>
                </div>

                <footer className="profile-enter delay-4 mt-10 sm:mt-12 text-center">
                    <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                        </svg>
                        Your account information, protected and organized.
                    </p>
                </footer>
            </div>
        </main>
    );
}

const profileStyles = `
    .profile-shell {
        position: relative;
        isolation: isolate;
        background:
            radial-gradient(ellipse at 50% -20%, #30205a 0%, transparent 55%),
            linear-gradient(145deg, #080914 0%, #0b1020 48%, #0a0b16 100%);
    }

    .profile-atmosphere {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    .ambient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(75px);
        opacity: 0.22;
        animation: orbFloat 12s ease-in-out infinite alternate;
    }

    .orb-one {
        width: 330px;
        height: 330px;
        background: #7c3aed;
        top: 5%;
        left: -120px;
    }

    .orb-two {
        width: 380px;
        height: 380px;
        background: #2563eb;
        top: 35%;
        right: -170px;
        animation-delay: -4s;
    }

    .orb-three {
        width: 260px;
        height: 260px;
        background: #c026d3;
        bottom: 0;
        left: 38%;
        opacity: 0.12;
        animation-delay: -7s;
    }

    .ambient-grid {
        position: absolute;
        inset: 0;
        opacity: 0.12;
        background-image:
            linear-gradient(#a5b4fc 1px, transparent 1px),
            linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
        background-size: 54px 54px;
        mask-image: linear-gradient(to bottom, black, transparent 75%);
    }

    .glass-panel {
        position: relative;
        background: linear-gradient(
            135deg,
            rgba(255,255,255,0.085),
            rgba(255,255,255,0.025)
        );
        border: 1px solid rgba(196,181,253,0.14);
        box-shadow:
            0 18px 55px rgba(0,0,0,0.18),
            inset 0 1px 0 rgba(255,255,255,0.07);
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
    }

    .glass-hover {
        transition:
            transform 350ms cubic-bezier(.2,.7,.3,1),
            border-color 350ms ease,
            background 350ms ease,
            box-shadow 350ms ease;
    }

    .glass-hover:hover {
        transform: translateY(-4px);
        border-color: rgba(167,139,250,0.35);
        background: linear-gradient(
            135deg,
            rgba(139,92,246,0.11),
            rgba(255,255,255,0.035)
        );
        box-shadow:
            0 22px 60px rgba(0,0,0,0.26),
            0 0 30px rgba(139,92,246,0.06),
            inset 0 1px 0 rgba(255,255,255,0.1);
    }

    .identity-card {
        background:
            radial-gradient(ellipse at 0% 0%, rgba(139,92,246,0.36), transparent 55%),
            radial-gradient(ellipse at 100% 100%, rgba(59,130,246,0.22), transparent 55%),
            linear-gradient(145deg, rgba(30,27,75,0.96), rgba(9,12,29,0.98));
        border: 1px solid rgba(167,139,250,0.35);
        box-shadow:
            0 25px 65px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.12);
    }

    .identity-orb {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
    }

    .identity-orb-one {
        width: 220px;
        height: 220px;
        top: -100px;
        right: -60px;
        border: 1px solid rgba(196,181,253,0.22);
        box-shadow: 0 0 60px rgba(139,92,246,0.1);
        animation: orbitPulse 7s ease-in-out infinite alternate;
    }

    .identity-orb-two {
        width: 150px;
        height: 150px;
        bottom: -85px;
        left: -45px;
        background: rgba(96,165,250,0.09);
        filter: blur(8px);
        animation: orbFloat 8s ease-in-out infinite alternate;
    }

    .avatar-ring {
        display: flex;
        padding: 5px;
        border-radius: 9999px;
        background: linear-gradient(135deg, #c4b5fd, #60a5fa, #e879f9);
        box-shadow:
            0 0 0 5px rgba(255,255,255,0.05),
            0 0 32px rgba(139,92,246,0.38);
        transition: transform 350ms ease, box-shadow 350ms ease;
    }

    .avatar-ring:hover {
        transform: scale(1.055) rotate(2deg);
        box-shadow: 0 0 42px rgba(139,92,246,0.55);
    }

    .stat-tile {
        background: rgba(255,255,255,0.055);
        border: 1px solid rgba(255,255,255,0.11);
        backdrop-filter: blur(12px);
        transition: background 250ms ease, transform 250ms ease;
    }

    .stat-tile:hover {
        background: rgba(167,139,250,0.12);
        transform: translateY(-2px);
    }

    .icon-tile {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        transition: transform 300ms ease, box-shadow 300ms ease;
    }

    .glass-hover:hover .icon-tile {
        transform: translateY(-2px) scale(1.04);
    }

    .violet-tile {
        color: #c4b5fd;
        background: rgba(139,92,246,0.13);
        border: 1px solid rgba(167,139,250,0.2);
    }

    .blue-tile {
        color: #93c5fd;
        background: rgba(59,130,246,0.12);
        border: 1px solid rgba(96,165,250,0.2);
    }

    .orange-tile {
        color: #fdba74;
        background: rgba(249,115,22,0.10);
        border: 1px solid rgba(251,146,60,0.2);
    }

    .info-tile {
        position: relative;
        overflow: hidden;
        border-radius: 18px;
        padding: 20px;
        background: rgba(255,255,255,0.035);
        border: 1px solid rgba(255,255,255,0.075);
        transition:
            background 300ms ease,
            border-color 300ms ease,
            transform 300ms ease,
            box-shadow 300ms ease;
    }

    .info-tile::before {
        content: "";
        position: absolute;
        left: 0;
        top: 15%;
        bottom: 15%;
        width: 2px;
        border-radius: 2px;
        background: linear-gradient(transparent, #a78bfa, #60a5fa, transparent);
        opacity: 0;
        transition: opacity 300ms ease;
    }

    .info-tile:hover {
        background: rgba(139,92,246,0.075);
        border-color: rgba(167,139,250,0.23);
        transform: translateY(-3px);
        box-shadow: 0 12px 28px rgba(0,0,0,0.12);
    }

    .info-tile:hover::before {
        opacity: 1;
    }

    .address-panel {
        background:
            radial-gradient(ellipse at 0% 0%, rgba(249,115,22,0.11), transparent 65%),
            linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015));
        border: 1px solid rgba(251,146,60,0.2);
        transition: border-color 300ms ease, box-shadow 300ms ease;
    }

    .address-panel:hover {
        border-color: rgba(251,146,60,0.38);
        box-shadow: 0 0 30px rgba(249,115,22,0.045);
    }

    .empty-address {
        background: rgba(255,255,255,0.025);
        border: 1px dashed rgba(196,181,253,0.24);
    }

    .glow-button {
        background: linear-gradient(110deg, #7c3aed, #6366f1, #8b5cf6);
        background-size: 200% 100%;
        box-shadow: 0 8px 25px rgba(124,58,237,0.25);
        animation: buttonGradient 6s ease infinite;
    }

    .glow-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(124,58,237,0.4);
    }

    .glow-button:active {
        transform: scale(0.98);
    }

    .text-gradient {
        color: #c4b5fd;
        background: linear-gradient(110deg, #c4b5fd, #60a5fa, #e879f9);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .profile-enter {
        animation: profileFadeUp 650ms cubic-bezier(.2,.7,.3,1) both;
    }

    .delay-1 { animation-delay: 100ms; }
    .delay-2 { animation-delay: 180ms; }
    .delay-3 { animation-delay: 260ms; }
    .delay-4 { animation-delay: 340ms; }

    .status-pulse {
        box-shadow: 0 0 10px currentColor;
        animation: statusPulse 2s ease-in-out infinite;
    }

    @keyframes profileFadeUp {
        from { opacity: 0; transform: translateY(22px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes orbFloat {
        from { transform: translate3d(0, 0, 0) scale(1); }
        to { transform: translate3d(28px, -24px, 0) scale(1.12); }
    }

    @keyframes orbitPulse {
        from { transform: scale(0.92); opacity: 0.6; }
        to { transform: scale(1.08); opacity: 1; }
    }

    @keyframes statusPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.55; }
    }

    @keyframes buttonGradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }

    @media (prefers-reduced-motion: reduce) {
        .profile-enter,
        .ambient-orb,
        .identity-orb,
        .status-pulse,
        .glow-button {
            animation: none !important;
        }

        .glass-hover,
        .info-tile,
        .avatar-ring,
        .stat-tile,
        .icon-tile,
        .glow-button {
            transition: none !important;
        }

        .glass-hover:hover,
        .info-tile:hover,
        .avatar-ring:hover,
        .stat-tile:hover,
        .glow-button:hover {
            transform: none !important;
        }
    }
`;

export default Profile;
