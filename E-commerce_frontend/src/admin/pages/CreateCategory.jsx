
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const createCategoryStyles = `

/* ========================================
   MAIN PAGE
======================================== */

.cc-page {
    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 0;
    min-height: 100%;
    padding: 32px 38px 45px;
    overflow-x: hidden;
    overflow-y: auto;
    color: #f1f5f9;
    background: #080d1b;
    box-sizing: border-box;
}

.cc-page * {
    box-sizing: border-box;
    font-family: inherit;
}


/* ========================================
   BACKGROUND
======================================== */

.cc-atmosphere {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.cc-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(85px);
    opacity: .17;
    animation: ccFloat 12s ease-in-out infinite alternate;
}

.cc-orb-one {
    width: 350px;
    height: 350px;
    background: #7c3aed;
    top: -170px;
    left: 8%;
}

.cc-orb-two {
    width: 300px;
    height: 300px;
    background: #2563eb;
    top: 45%;
    right: -180px;
    animation-delay: -5s;
}

.cc-orb-three {
    width: 260px;
    height: 260px;
    background: #9333ea;
    bottom: -150px;
    left: 35%;
    animation-delay: -8s;
}

.cc-grid-bg {
    position: absolute;
    inset: 0;
    opacity: .045;
    background-image:
        linear-gradient(#a5b4fc 1px, transparent 1px),
        linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to bottom, black, transparent 90%);
}


/* ========================================
   CONTAINER
======================================== */

.cc-container {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
}


/* ========================================
   HEADER
======================================== */

.cc-header {
    margin-bottom: 32px;
    animation: ccFadeUp .6s ease both;
}

.cc-back-btn {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0;
    margin-bottom: 25px;
    color: #94a3b8;
    background: transparent;
    border: none;
    font-size: 12px;
    font-weight: 650;
    cursor: pointer;
    transition: .25s ease;
}

.cc-back-btn:hover {
    color: #c4b5fd;
    transform: translateX(-4px);
}

.cc-back-btn span {
    font-size: 19px;
}

.cc-heading-content {
    display: flex;
    align-items: center;
    gap: 17px;
}

.cc-heading-icon {
    width: 59px;
    height: 59px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 17px;
    color: #ddd6fe;
    background: linear-gradient(
        135deg,
        rgba(124,58,237,.32),
        rgba(59,130,246,.2)
    );
    border: 1px solid rgba(167,139,250,.28);
    box-shadow: 0 8px 25px rgba(124,58,237,.15);
    transition: .3s ease;
}

.cc-heading-icon:hover {
    transform: rotate(-6deg) scale(1.07);
    box-shadow: 0 10px 30px rgba(124,58,237,.3);
}

.cc-heading-label {
    color: #a78bfa;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 3px;
    margin: 0 0 6px;
}

.cc-heading {
    font-size: clamp(27px, 3vw, 36px);
    font-weight: 850;
    letter-spacing: -1px;
    margin: 0;
    background: linear-gradient(
        110deg,
        #c4b5fd,
        #60a5fa,
        #e879f9
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.cc-subtitle {
    margin: 12px 0 0;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.7;
}


/* ========================================
   FORM CARD
======================================== */

.cc-form-wrapper {
    position: relative;
    overflow: hidden;
    padding: 30px 32px;
    border: 1px solid rgba(148,163,184,.16);
    border-radius: 19px;
    background: linear-gradient(
        145deg,
        rgba(23,32,57,.88),
        rgba(15,23,42,.9)
    );
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
        0 15px 40px rgba(0,0,0,.2),
        0 0 25px rgba(124,58,237,.05);
    animation: ccFadeUp .65s ease both;
}

.cc-form-wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    left: 30px;
    right: 30px;
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(167,139,250,.65),
        rgba(96,165,250,.45),
        transparent
    );
}


/* ========================================
   FORM HEADER
======================================== */

.cc-form-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
    padding-bottom: 23px;
    margin-bottom: 27px;
    border-bottom: 1px solid rgba(148,163,184,.13);
}

.cc-form-title {
    color: #e2e8f0;
    font-size: 17px;
    font-weight: 800;
    margin: 0 0 7px;
}

.cc-form-description {
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.6;
    margin: 0;
}

.cc-required-tag {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    border: 1px solid rgba(167,139,250,.2);
    border-radius: 9px;
    background: rgba(139,92,246,.09);
    color: #c4b5fd;
    font-size: 10px;
    font-weight: 700;
}

.cc-required-tag span {
    color: #f87171;
    font-size: 14px;
}


/* ========================================
   FORM FIELDS
======================================== */

.cc-form-group {
    margin-bottom: 27px;
    animation: ccFadeUp .7s ease both;
}

.cc-form-group label {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 12px;
    color: #e2e8f0;
    font-size: 12px;
    font-weight: 750;
}

.cc-label-icon {
    display: grid;
    place-items: center;
    color: #a78bfa;
}

.cc-required {
    color: #f87171;
    margin-left: -6px;
}

.cc-form-group input,
.cc-form-group textarea {
    display: block;
    width: 100%;
    padding: 15px 17px;
    border: 1px solid rgba(148,163,184,.2);
    border-radius: 11px;
    outline: none;
    color: #f1f5f9;
    background: rgba(8,13,27,.75);
    font-size: 13px;
    line-height: 1.6;
    transition: .3s ease;
}

.cc-form-group input {
    min-height: 51px;
}

.cc-form-group textarea {
    min-height: 145px;
    resize: vertical;
}

.cc-form-group input::placeholder,
.cc-form-group textarea::placeholder {
    color: #64748b;
}

.cc-form-group input:focus,
.cc-form-group textarea:focus {
    border-color: rgba(167,139,250,.7);
    background: rgba(15,23,42,.95);
    box-shadow:
        0 0 0 3px rgba(139,92,246,.12),
        0 5px 20px rgba(124,58,237,.07);
}

.cc-field-hint {
    color: #64748b;
    font-size: 11px;
    line-height: 1.6;
    margin: 9px 0 0;
}


/* ========================================
   ERROR AND SUCCESS
======================================== */

.cc-error,
.cc-success {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 13px 16px;
    margin: 20px 0;
    border-radius: 11px;
    font-size: 12px;
    line-height: 1.6;
    animation: ccFadeUp .35s ease both;
}

.cc-error {
    color: #fca5a5;
    background: rgba(127,29,29,.17);
    border: 1px solid rgba(248,113,113,.24);
}

.cc-success {
    color: #86efac;
    background: rgba(22,101,52,.16);
    border: 1px solid rgba(74,222,128,.23);
}


/* ========================================
   FORM FOOTER
======================================== */

.cc-form-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 23px;
    margin-top: 8px;
    border-top: 1px solid rgba(148,163,184,.13);
}

.cc-cancel-btn,
.cc-submit-btn {
    min-height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 23px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
}

.cc-cancel-btn {
    color: #cbd5e1;
    background: rgba(30,41,70,.55);
    border: 1px solid rgba(148,163,184,.2);
}

.cc-cancel-btn:hover {
    color: white;
    background: rgba(51,65,85,.7);
    border-color: rgba(148,163,184,.4);
    transform: translateY(-2px);
}

.cc-submit-btn {
    color: white;
    background: linear-gradient(
        110deg,
        #7c3aed,
        #6366f1,
        #9333ea
    );
    border: 1px solid rgba(167,139,250,.3);
    box-shadow: 0 7px 22px rgba(124,58,237,.24);
}

.cc-submit-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(124,58,237,.38);
    filter: brightness(1.12);
}

.cc-submit-btn:disabled {
    opacity: .55;
    cursor: not-allowed;
}

.cc-btn-loader {
    width: 15px;
    height: 15px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: white;
    border-radius: 50%;
    animation: ccSpin .8s linear infinite;
}


/* ========================================
   BOTTOM NOTE
======================================== */

.cc-bottom-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin-top: 27px;
    color: #64748b;
    font-size: 11px;
    text-align: center;
}

.cc-bottom-note span {
    color: #a78bfa;
    font-size: 15px;
}


/* ========================================
   ANIMATIONS
======================================== */

@keyframes ccFadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes ccFloat {
    from {
        transform: translate3d(0,0,0) scale(1);
    }
    to {
        transform: translate3d(20px,-20px,0) scale(1.12);
    }
}

@keyframes ccSpin {
    to {
        transform: rotate(360deg);
    }
}


/* ========================================
   RESPONSIVE
======================================== */

@media(max-width: 1100px) {
    .cc-page {
        padding: 27px 24px 35px;
    }
}

@media(max-width: 700px) {
    .cc-page {
        padding: 21px 15px 30px;
    }

    .cc-heading-content {
        gap: 12px;
    }

    .cc-heading-icon {
        width: 48px;
        height: 48px;
    }

    .cc-heading {
        font-size: 25px;
    }

    .cc-form-wrapper {
        padding: 23px 19px;
    }

    .cc-form-top {
        align-items: flex-start;
        flex-direction: column;
    }

    .cc-form-footer {
        flex-direction: column-reverse;
    }

    .cc-cancel-btn,
    .cc-submit-btn {
        width: 100%;
    }
}

@media(max-width: 400px) {
    .cc-heading-label {
        font-size: 9px;
        letter-spacing: 2px;
    }

    .cc-heading {
        font-size: 22px;
    }

    .cc-form-wrapper {
        padding: 20px 15px;
    }
}

@media(prefers-reduced-motion: reduce) {
    .cc-page *,
    .cc-page *::before,
    .cc-page *::after {
        animation: none !important;
        transition: none !important;
    }
}

`;

const CreateCategory = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name.trim() || !description.trim()) {
            setError("Please fill in all the fields.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8000/api/v1/category/category",
                {
                    method: "POST",
                    credentials: "include",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        name : name.trim(),
                        description : description.trim()
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to create category."
                );
            }

            setSuccess("Category created successfully!");

            setName("");
            setDescription("");

            setTimeout(() => {
                navigate("/admin/category-managment");
            }, 1000);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (

        <>
            <style>{createCategoryStyles}</style>

            <div className="cc-page">

                {/* Background */}

                <div className="cc-atmosphere">
                    <div className="cc-orb cc-orb-one"></div>
                    <div className="cc-orb cc-orb-two"></div>
                    <div className="cc-orb cc-orb-three"></div>
                    <div className="cc-grid-bg"></div>
                </div>


                <div className="cc-container">

                    {/* Header */}

                    <div className="cc-header">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/category-managment")}
                            className="cc-back-btn"
                        >
                            <span>←</span>
                            Back to Categories
                        </button>

                        <div className="cc-heading-content">

                            <div className="cc-heading-icon">
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <path d="M12 11v6"/>
                                    <path d="M9 14h6"/>
                                </svg>
                            </div>

                            <div>
                                <p className="cc-heading-label">
                                    CATEGORY MANAGEMENT
                                </p>

                                <h1 className="cc-heading">
                                    Create Category
                                </h1>
                            </div>

                        </div>

                        <p className="cc-subtitle">
                            Create a new category and organize your products efficiently.
                        </p>

                    </div>


                    {/* Form */}

                    <div className="cc-form-wrapper">

                        <div className="cc-form-top">

                            <div>
                                <h2 className="cc-form-title">
                                    Category Details
                                </h2>

                                <p className="cc-form-description">
                                    Enter the information required to create your category.
                                </p>
                            </div>

                            <div className="cc-required-tag">
                                <span>*</span> Required Fields
                            </div>

                        </div>


                        <form onSubmit={handleSubmit}>

                            {/* Category Name */}

                            <div className="cc-form-group">

                                <label htmlFor="categoryName">
                                    <span className="cc-label-icon">
                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                        </svg>
                                    </span>

                                    Category Name
                                    <span className="cc-required">*</span>
                                </label>

                                <input
                                    id="categoryName"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter category name..."
                                />

                                <p className="cc-field-hint">
                                    Choose a short and recognizable name for your category.
                                </p>

                            </div>


                            {/* Description */}

                            <div className="cc-form-group">

                                <label htmlFor="categoryDescription">
                                    <span className="cc-label-icon">
                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                            <path d="M14 2v6h6"/>
                                            <path d="M8 13h8"/>
                                            <path d="M8 17h8"/>
                                        </svg>
                                    </span>

                                    Category Description
                                    <span className="cc-required">*</span>
                                </label>

                                <textarea
                                    id="categoryDescription"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe the products that belong to this category..."
                                    rows={6}
                                />

                                <p className="cc-field-hint">
                                    Provide a meaningful description of this category.
                                </p>

                            </div>


                            {/* Error */}

                            {error && (
                                <div className="cc-error">
                                    <span>⚠</span>
                                    {error}
                                </div>
                            )}


                            {/* Success */}

                            {success && (
                                <div className="cc-success">
                                    <span>✓</span>
                                    {success}
                                </div>
                            )}


                            {/* Buttons */}

                            <div className="cc-form-footer">

                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/category-managment")}
                                    className="cc-cancel-btn"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="cc-submit-btn"
                                >

                                    {loading ? (
                                        <>
                                            <span className="cc-btn-loader"></span>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <span>+</span>
                                            Create Category
                                        </>
                                    )}

                                </button>

                            </div>

                        </form>

                    </div>


                    {/* Footer */}

                    <div className="cc-bottom-note">
                        <span>✦</span>
                        Keep your store organized with well-defined categories.
                    </div>

                </div>

            </div>
        </>

    );

};

export default CreateCategory;
