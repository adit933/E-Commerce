import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile()
{
    const {user , loading} = useContext(AuthContext)

    console.log(user)

    const navigate = useNavigate()

    if(loading)
    {
        return (
            <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-14 h-14 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto" />
                    <h2 className="text-xl font-bold text-gray-800 mt-5">
                        Loading your profile
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Getting your account ready...
                    </p>
                </div>
            </main>
        );
    }

    if(!user)
    {
         return (
            <main className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 flex items-center justify-center p-5">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-violet-100">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center text-4xl">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 21a8 8 0 0 0-16 0" />
                            <circle cx="12" cy="8" r="4" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-extrabold text-gray-900 mt-6">
                        Welcome back!
                    </h1>
                    <p className="text-gray-500 mt-3 leading-6">
                        Please log in to view your profile and manage your account.
                    </p>
                </div>
            </main>
        );
    }

    const avatarUrl = typeof user.avatar === "string" ? user.avatar : user.avatar?.url

    const fullName = user.fullName || user.username || "user"

    const address = Array.isArray(user.address) ? user.address[0] : user.address

     const addressText = address
        ? [
              address.street,
              address.city,
              address.state,
              address.postalCode || address.pincode,
          ]
              .filter(Boolean)
              .join(", ")
        : "No address added yet";

        const initials = fullName
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const addressCount = Array.isArray(user.address)
        ? user.address.length
        : user.address
          ? 1
          : 0;

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-200 via-fuchsia-100 to-blue-200 px-4 py-8 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">

                {/* Page heading */}
                <div className="mb-8 sm:mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 mb-3">
                        My Account / Profile
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-950">
                        My Profile<span className="text-violet-600">.</span>
                    </h1>

                    <p className="text-gray-600 text-base sm:text-lg mt-3 max-w-2xl leading-7">
                        Everything about your account, organized in one place.
                        Manage your personal details and saved address.
                    </p>
                </div>

                {/* Main dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Left profile card */}
                    <aside className="lg:col-span-4 space-y-6">

                        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700 p-6 sm:p-8 text-white shadow-xl shadow-violet-200/60">

                            {/* Decorative gradient circles */}
                            <div className="absolute -top-16 -right-12 w-48 h-48 rounded-full bg-white/10" />
                            <div className="absolute -bottom-20 -left-10 w-44 h-44 rounded-full bg-indigo-300/20" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold uppercase tracking-widest text-violet-100">
                                        Your Account
                                    </span>

                                    <span className="rounded-full bg-white/15 border border-white/20 px-3 py-1 text-xs font-bold">
                                        {user.isVerified
                                            ? "✓ Verified"
                                            : "Member"}
                                    </span>
                                </div>

                                <div className="mt-8 flex flex-col items-center text-center">
                                    <div className="rounded-full p-1 bg-white/25 shadow-lg">
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={`${fullName}'s profile`}
                                                className="w-28 h-28 rounded-full object-cover border-4 border-white"
                                            />
                                        ) : (
                                            <div className="w-28 h-28 rounded-full bg-white text-violet-700 flex items-center justify-center text-3xl font-extrabold border-4 border-white">
                                                {initials}
                                            </div>
                                        )}
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-extrabold mt-5 break-words">
                                        {fullName}
                                    </h2>

                                    <p className="text-violet-100 mt-2 break-all text-sm sm:text-base">
                                        {user.email || "No email provided"}
                                    </p>

                                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold border border-white/15">
                                        <span className="w-2 h-2 rounded-full bg-emerald-300" />
                                        Account overview
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-8">
                                    <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                                        <p className="text-sm text-violet-100 font-medium">
                                            Saved Addresses
                                        </p>
                                        <p className="text-3xl font-extrabold mt-1">
                                            {addressCount}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                                        <p className="text-sm text-violet-100 font-medium">
                                            Phone Number
                                        </p>
                                        <p className="text-lg font-bold mt-2 break-words">
                                            {user.phoneNumber || "Not added"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Account highlights */}
                        <section className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm">
                            <h3 className="text-xl font-extrabold text-gray-900 mb-5">
                                Account Highlights
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            {user.isVerified ? "Verified account" : "Account created"}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {user.isVerified
                                                ? "Your account is verified."
                                                : "Your account information is available."}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10V7l7-4 7 4v3M5 10v10m4-10v10m6-10v10m4-10v10M3 20h18" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            Address book
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {addressCount > 0
                                                ? `${addressCount} saved address${addressCount > 1 ? "es" : ""}`
                                                : "Add an address for delivery."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </aside>

                    {/* Right content */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Personal information card */}
                        <section className="bg-white rounded-3xl border border-violet-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
                                        <circle cx="12" cy="8" r="4" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21a7 7 0 0 1 14 0" />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                                        Personal Information
                                    </h2>
                                    <p className="text-gray-500 mt-2 leading-6">
                                        Your registered details at a glance.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 p-5">
                                    <p className="text-xs font-extrabold uppercase tracking-widest text-violet-600">
                                        Full Name
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 mt-3 break-words">
                                        {fullName}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-5">
                                    <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                                        Email Address
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 mt-3 break-all">
                                        {user.email || "Not provided"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-5">
                                    <p className="text-xs font-extrabold uppercase tracking-widest text-orange-600">
                                        Phone Number
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 mt-3 break-words">
                                        {user.phoneNumber || "Not provided"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-5">
                                    <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                                        Account Status
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 mt-3">
                                        {user.isVerified ? "Verified" : "Not verified"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Saved address card */}
                        <section className="bg-white rounded-3xl border border-violet-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 text-orange-600 flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                                        Saved Address
                                    </h2>
                                    <p className="text-gray-500 mt-2 leading-6">
                                        Your delivery location information.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-rose-50 p-5 sm:p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-orange-600 font-bold">
                                        Default Address
                                    </span>
                                    {address && (
                                        <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full">
                                            Primary
                                        </span>
                                    )}
                                </div>

                                {addressText ? (
                                    <p className="text-gray-800 font-medium leading-7 break-words">
                                        {addressText}
                                    </p>
                                ) : (
                                    <p className="text-gray-500 leading-7">
                                        No saved address yet. Your address can be added here when address management is implemented.
                                    </p>
                                )}
                            </div>
                        </section>

                    </div>
                </div>

                <p className="text-center text-sm text-gray-400 mt-10">
                    Your account information, all in one place.
                </p>
            </div>
        </main>
    );
}

export default Profile;