
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const [avatar, setAvatar] = useState(null);

    const handleData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("fullName", formData.fullName);
        data.append("phoneNumber", formData.phoneNumber);

        data.append(
            "address",
            JSON.stringify([{
                street: formData.street,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                pincode: formData.pincode,
                isDefault: true
            }])
        );

        data.append("avatar", avatar);

        try {

            const response = await fetch(
                "http://localhost:8000/api/v1/users/register",
                {
                    method: "POST",
                    body: data
                }
            );

            const result = await response.json();

            console.log(result);

            if (!response.ok) {
                alert(result.message || "Registration Failed!!!");
                return;
            }

            alert("Registration Successfull !!!");

            navigate("/login");

        } catch (error) {
            console.error("Some Error appeared : ", error);
            alert("Something went wrong !!!");
        }

    };


    return (

        <div className="register-shell">

            <div className="register-atmosphere">

                <div className="register-grid-bg"></div>

                <div className="register-orb register-orb-one"></div>

                <div className="register-orb register-orb-two"></div>

            </div>


            <div className="register-container">

                <div className="register-card">

                    <div className="register-header">

                        <span className="register-eyebrow">
                            ✦ JOIN OUR COMMUNITY
                        </span>

                        <h1 className="register-title">
                            Create Your <span className="register-gradient">Account</span>
                        </h1>

                        <p className="register-subtitle">
                            Register today and experience a better way to shop.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit} className="register-form">


                        <div className="register-section">

                            <h2>Personal Information</h2>

                            <p>Tell us a little about yourself.</p>

                        </div>


                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleData}
                            className="register-input"
                            required
                        />


                        <div className="register-grid">

                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleData}
                                className="register-input"
                                required
                            />

                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleData}
                                className="register-input"
                                required
                            />

                        </div>


                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleData}
                            className="register-input"
                            required
                        />


                        <input
                            type="password"
                            name="password"
                            placeholder="Create Password"
                            value={formData.password}
                            onChange={handleData}
                            className="register-input"
                            required
                        />


                        <div className="register-avatar">

                            <label>Profile Picture</label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                required
                            />

                        </div>


                        <div className="register-section register-address-heading">

                            <h2>Delivery Address</h2>

                            <p>Where should we deliver your orders?</p>

                        </div>


                        <input
                            type="text"
                            name="street"
                            placeholder="Street Address"
                            value={formData.street}
                            onChange={handleData}
                            className="register-input"
                            required
                        />


                        <div className="register-grid">

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleData}
                                className="register-input"
                                required
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleData}
                                className="register-input"
                                required
                            />

                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleData}
                                className="register-input"
                                required
                            />

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleData}
                                className="register-input"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="register-submit"
                        >
                            Create Account
                            <span>→</span>
                        </button>


                    </form>


                    <p className="register-login">

                        Already have an account?

                        <button onClick={() => navigate("/login")}>
                            Login
                        </button>

                    </p>


                </div>

            </div>

            <style>{`

                .register-shell {
                    position: relative;
                    isolation: isolate;
                    min-height: 100vh;
                    overflow: hidden;
                    color: #f8fafc;
                    background:
                        radial-gradient(ellipse at 50% -15%, #30205a 0%, transparent 50%),
                        linear-gradient(145deg, #080914, #0b1020 48%, #0a0b16);
                }

                .register-atmosphere {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: -1;
                }

                .register-grid-bg {
                    position: absolute;
                    inset: 0;
                    opacity: .055;
                    background-image:
                        linear-gradient(#a5b4fc 1px, transparent 1px),
                        linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
                    background-size: 54px 54px;
                    mask-image: linear-gradient(to bottom, black, transparent 80%);
                }

                .register-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(85px);
                    opacity: .2;
                    animation: registerFloat 12s ease-in-out infinite alternate;
                }

                .register-orb-one {
                    width: 330px;
                    height: 330px;
                    background: #7c3aed;
                    top: 100px;
                    left: -150px;
                }

                .register-orb-two {
                    width: 380px;
                    height: 380px;
                    background: #2563eb;
                    bottom: 50px;
                    right: -180px;
                    animation-delay: -4s;
                }

                .register-container {
                    position: relative;
                    width: 100%;
                    max-width: 850px;
                    margin: 0 auto;
                    padding: 65px 25px;
                }

                .register-card {
                    padding: 42px;
                    border: 1px solid rgba(196,181,253,.15);
                    border-radius: 25px;
                    background:
                        radial-gradient(circle at 100% 0%, rgba(139,92,246,.09), transparent 45%),
                        linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.02));
                    backdrop-filter: blur(18px);
                    box-shadow: 0 25px 65px rgba(0,0,0,.3);
                    animation: registerFadeUp .7s both;
                }

                .register-header {
                    text-align: center;
                    margin-bottom: 35px;
                }

                .register-eyebrow {
                    display: inline-flex;
                    padding: 8px 15px;
                    border: 1px solid rgba(167,139,250,.25);
                    border-radius: 999px;
                    background: rgba(139,92,246,.09);
                    color: #c4b5fd;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                }

                .register-title {
                    margin-top: 20px;
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 800;
                    letter-spacing: -1.5px;
                }

                .register-gradient {
                    background: linear-gradient(110deg, #c4b5fd, #60a5fa, #e879f9);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .register-subtitle {
                    margin-top: 12px;
                    color: #94a3b8;
                    font-size: 13px;
                    line-height: 1.8;
                }

                .register-form {
                    display: flex;
                    flex-direction: column;
                    gap: 17px;
                }

                .register-section {
                    margin-bottom: 3px;
                }

                .register-section h2 {
                    color: #f8fafc;
                    font-size: 17px;
                    font-weight: 750;
                }

                .register-section p {
                    margin-top: 5px;
                    color: #64748b;
                    font-size: 12px;
                }

                .register-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 14px;
                }

                .register-input {
                    width: 100%;
                    min-width: 0;
                    padding: 15px 17px;
                    border: 1px solid rgba(196,181,253,.15);
                    border-radius: 12px;
                    outline: none;
                    background: rgba(255,255,255,.035);
                    color: #f8fafc;
                    font-size: 13px;
                    transition: .25s ease;
                }

                .register-input::placeholder {
                    color: #64748b;
                }

                .register-input:focus {
                    border-color: #8b5cf6;
                    background: rgba(139,92,246,.07);
                    box-shadow: 0 0 0 3px rgba(139,92,246,.1);
                }

                .register-avatar {
                    padding: 18px;
                    border: 1px solid rgba(196,181,253,.13);
                    border-radius: 14px;
                    background: rgba(255,255,255,.025);
                }

                .register-avatar label {
                    display: block;
                    margin-bottom: 12px;
                    color: #e2e8f0;
                    font-size: 13px;
                    font-weight: 650;
                }

                .register-avatar input {
                    width: 100%;
                    color: #94a3b8;
                    font-size: 12px;
                }

                .register-avatar input::file-selector-button {
                    margin-right: 12px;
                    padding: 9px 13px;
                    border: 1px solid rgba(167,139,250,.25);
                    border-radius: 9px;
                    background: rgba(139,92,246,.15);
                    color: #c4b5fd;
                    cursor: pointer;
                }

                .register-address-heading {
                    margin-top: 15px;
                    padding-top: 24px;
                    border-top: 1px solid rgba(196,181,253,.12);
                }

                .register-submit {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    margin-top: 12px;
                    padding: 16px;
                    border: 1px solid rgba(167,139,250,.25);
                    border-radius: 13px;
                    background: linear-gradient(110deg, #7c3aed, #4f46e5);
                    color: white;
                    font-size: 14px;
                    font-weight: 750;
                    cursor: pointer;
                    transition: .25s ease;
                }

                .register-submit span {
                    font-size: 19px;
                    transition: transform .25s ease;
                }

                .register-submit:hover {
                    transform: translateY(-2px);
                    filter: brightness(1.13);
                    box-shadow: 0 10px 25px rgba(124,58,237,.2);
                }

                .register-submit:hover span {
                    transform: translateX(5px);
                }

                .register-login {
                    margin-top: 27px;
                    padding-top: 23px;
                    border-top: 1px solid rgba(196,181,253,.1);
                    color: #94a3b8;
                    text-align: center;
                    font-size: 13px;
                }

                .register-login button {
                    margin-left: 7px;
                    color: #c4b5fd;
                    font-weight: 700;
                    cursor: pointer;
                    transition: color .2s;
                }

                .register-login button:hover {
                    color: #e9d5ff;
                }

                @keyframes registerFloat {
                    from {
                        transform: translate(0, 0) scale(1);
                    }
                    to {
                        transform: translate(25px, -25px) scale(1.1);
                    }
                }

                @keyframes registerFadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(18px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 600px) {
                    .register-container {
                        padding: 35px 15px;
                    }

                    .register-card {
                        padding: 25px 19px;
                    }

                    .register-grid {
                        grid-template-columns: 1fr;
                    }

                    .register-title {
                        letter-spacing: -1px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .register-orb,
                    .register-card,
                    .register-submit,
                    .register-submit span {
                        animation: none !important;
                        transition: none !important;
                    }
                }

            `}</style>

        </div>

    );

}

export default Register;
