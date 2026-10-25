import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"
import { useRef } from "react";

function EditProfile() {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const profileInitialized = useRef(false);

    const emptyAddress = {
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    }

    const [profile, setProfile] = useState({
        fullName: "",
        username: "",
        phoneNumber: "",
    })

    const [avatar, setAvatar] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [editingAddressId, setEditingAddressId] = useState(null)
    const [addressForm, setAddressForm] = useState(emptyAddress)
    const [showAddressForm, setShowAddressForm] = useState(false)

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!user || profileInitialized.current) return;

        setProfile({
            fullName: user.fullName || "",
            username: user.username || "",
            phoneNumber: user.phoneNumber || ""
        });

        const savedAddress = Array.isArray(user.address)
            ? user.address
            : user.address && typeof user.address === "object"
                ? [user.address]
                : [];

        setAddresses(savedAddress);

        profileInitialized.current = true;
    }, [user]);

    const handleProfileChange = (e) => {
        setProfile((prev) => ({
            ...prev,

            [e.target.name]: e.target.value
        }))
    }

    const handleAddressChange = (e) => {
        setAddressForm((prev) => ({
            ...prev,

            [e.target.name]: e.target.value
        }))
    }

    const handleAvatarChange = (e) => {
        const handleAvatarChange = (e) => {
            setAvatar(e.target.files[0] || null);
        };
    }




    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "http://localhost:8000/api/v1/users/profile",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        fullName: profile.fullName,
                        username: profile.username,
                        phoneNumber: profile.phoneNumber,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Error updating your profile."
                );
            }

            setMessage(
                data.message || "Profile updated successfully!"
            );

        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.message || "Unable to update your profile.");
        }
    };

    const openAddAddressForm = () => {
        setEditingAddressId(null)
        setAddressForm({ ...emptyAddress })
        setShowAddressForm(true)
        setMessage("")
        setError("")
    }


    const openEditAddressForm = (address) => {
        setEditingAddressId(address._id)

        setAddressForm({
            street: address.street || "",
            city: address.city || "",
            state: address.state || "",
            country: address.country || "",
            pincode: address.pincode || address.postalCode || "",
        })

        setShowAddressForm(true);
        setMessage("");
        setError("");
    }
    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const requiredFields = [
            "street",
            "city",
            "state",
            "country",
            "pincode",
        ];

        const missingField = requiredFields.some(
            (addr) => !addressForm[addr].trim()
        )

        if (missingField) {
            setError("Please fill in all address fields.");
            return;
        }

        try {
            if (!editingAddressId) {
                //call add address
                const response = await fetch(`http://localhost:8000/api/v1/users/address`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify(addressForm),
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error("Unable to Add Address !!!")
                }

                if (data.data?.address !== undefined) {
                    const savedAddress = Array.isArray(data.data.address)
                        ? data.data.address
                        : data.data.address
                            ? [data.data.address]
                            : [];

                    setAddresses(savedAddress);
                }

                setMessage("Address added succesfully !!!")
            }
            else {
                //call update address


                const response = await fetch(`http://localhost:8000/api/v1/users/address/${editingAddressId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify(addressForm),
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error("Cannot add address !!!")
                }

                if (data.data?.address !== undefined) {
                    const savedAddress = Array.isArray(data.data.address)
                        ? data.data.address
                        : data.data.address
                            ? [data.data.address]
                            : [];

                    setAddresses(savedAddress);
                }

                setMessage("Message added successfully !!!")
            }
        } catch (error) {
            console.error("Error saving address:", error);
            setError(error.message || "Unable to save address.");
        }
    }


    const cancelAddressForm = () => {
        setShowAddressForm(false);
        setEditingAddressId(null);
        setAddressForm({ ...emptyAddress });
        setError("");
    };


    const inputClass =
        "w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20";

    const labelClass =
        "mb-2 block text-sm font-medium text-slate-300";

    if (!user) {
        return (
            <main className="min-h-screen bg-slate-950 px-5 py-16 text-center text-white">
                <h1 className="text-2xl font-bold">
                    Please log in to edit your profile
                </h1>
                <button
                    onClick={() => navigate("/login")}
                    className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-500"
                >
                    Go to Login
                </button>
            </main>
        );
    }



    return (
        <main className="profile-shell min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Page heading */}
                <header className="profile-enter mb-8">
                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="mb-5 text-sm text-violet-300 transition hover:text-violet-200"
                    >
                        ← Back to Profile
                    </button>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
                        Account Settings
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Edit Profile<span className="text-violet-400">.</span>
                    </h1>

                    <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                        Manage your personal information and saved delivery
                        addresses in one place.
                    </p>
                </header>

                {/* Status messages */}
                {message && (
                    <div
                        role="status"
                        className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-300"
                    >
                        {message}
                    </div>
                )}

                {error && (
                    <div
                        role="alert"
                        className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-300"
                    >
                        {error}
                    </div>
                )}

                {/* Personal information */}
                <section className="glass-panel profile-enter mb-8 rounded-3xl border border-white/10 p-5 sm:p-8">
                    <div className="mb-7">
                        <h2 className="text-xl font-bold">
                            Personal Information
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Update the details associated with your account.
                        </p>
                    </div>

                    <form onSubmit={handleProfileSubmit}>
                        <div className="grid gap-5 sm:grid-cols-2">

                            <div>
                                <label className={labelClass} htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    value={profile.fullName}
                                    onChange={handleProfileChange}
                                    className={inputClass}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="username">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    value={profile.username}
                                    onChange={handleProfileChange}
                                    className={inputClass}
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={profile.phoneNumber}
                                    onChange={handleProfileChange}
                                    className={inputClass}
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={user.email || ""}
                                    disabled
                                    className={`${inputClass} cursor-not-allowed opacity-60`}
                                />
                                <p className="mt-2 text-xs text-slate-500">
                                    Email editing is not connected to this form.
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <button
                                type="submit"
                                className="glow-button rounded-xl px-6 py-3 font-semibold text-white transition hover:opacity-90"
                            >
                                Save Profile
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/5"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>

                {/* Saved addresses */}
                <section className="glass-panel profile-enter rounded-3xl border border-white/10 p-5 sm:p-8">
                    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold">
                                Saved Addresses
                            </h2>
                            <p className="mt-2 text-sm text-slate-400">
                                Manage your delivery addresses.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={openAddAddressForm}
                            className="rounded-xl border border-violet-400/30 bg-violet-500/10 px-5 py-3 font-semibold text-violet-200 transition hover:bg-violet-500/20"
                        >
                            + Add Address
                        </button>
                    </div>

                    {addresses.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center">
                            <p className="font-medium text-slate-300">
                                No saved addresses yet
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                Add an address for a faster checkout experience.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {addresses.map((address) => (
                                <article
                                    key={address._id}
                                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-violet-400/30"
                                >
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <h3 className="font-semibold text-white">
                                            Delivery Address
                                        </h3>

                                        {address.isDefault && (
                                            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                                Default
                                            </span>
                                        )}
                                    </div>

                                    <p className="break-words text-sm leading-7 text-slate-400">
                                        {[
                                            address.street,
                                            address.city,
                                            address.state,
                                            address.pincode || address.postalCode,
                                            address.country,
                                        ].filter(Boolean).join(", ")}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => openEditAddressForm(address)}
                                        className="mt-5 text-sm font-semibold text-violet-300 transition hover:text-violet-200"
                                    >
                                        Edit Address →
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Add/edit address form */}
                    {showAddressForm && (
                        <form
                            onSubmit={handleAddressSubmit}
                            className="mt-8 rounded-2xl border border-violet-400/20 bg-slate-900/60 p-5 sm:p-6"
                        >
                            <h3 className="mb-6 text-lg font-bold">
                                {editingAddressId
                                    ? "Edit Address"
                                    : "Add New Address"}
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2">
                                {[
                                    ["street", "Street Address"],
                                    ["city", "City"],
                                    ["state", "State"],
                                    ["country", "Country"],
                                    ["pincode", "Pincode"],
                                ].map(([name, label]) => (
                                    <div key={name}>
                                        <label
                                            className={labelClass}
                                            htmlFor={name}
                                        >
                                            {label}
                                        </label>
                                        <input
                                            id={name}
                                            name={name}
                                            value={addressForm[name]}
                                            onChange={handleAddressChange}
                                            className={inputClass}
                                            placeholder={`Enter ${label.toLowerCase()}`}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <button
                                    type="submit"
                                    className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500"
                                >
                                    {editingAddressId
                                        ? "Save Address Changes"
                                        : "Add Address"}
                                </button>

                                <button
                                    type="button"
                                    onClick={cancelAddressForm}
                                    className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 transition hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </section>
            </div>
        </main>
    );
}

export default EditProfile;