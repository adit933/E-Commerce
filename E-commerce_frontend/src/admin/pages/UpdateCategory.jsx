import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Tag,
    FileText,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle,
    RefreshCw
} from "lucide-react";


const updateCategoryStyles = `

/* ========================================
   MAIN PAGE
======================================== */

.uc-page {
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
    scrollbar-width: thin;
    scrollbar-color: rgba(139,92,246,.5) transparent;
}

.uc-page * {
    box-sizing: border-box;
    font-family: inherit;
}

/* BACKGROUND */

.uc-atmosphere {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.uc-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(85px);
    opacity: .17;
    animation: ucFloat 12s ease-in-out infinite alternate;
}

.uc-orb-one {
    width: 350px;
    height: 350px;
    background: #7c3aed;
    top: -170px;
    left: 8%;
}

.uc-orb-two {
    width: 300px;
    height: 300px;
    background: #2563eb;
    top: 45%;
    right: -180px;
    animation-delay: -5s;
}

.uc-orb-three {
    width: 260px;
    height: 260px;
    background: #9333ea;
    bottom: -150px;
    left: 35%;
    animation-delay: -8s;
}

.uc-grid-bg {
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
   HEADER
======================================== */

.uc-header {
    display: flex;
    align-items: center;
    gap: 17px;
    margin-bottom: 35px;
    animation: ucFadeUp .6s ease both;
}

.uc-back-btn {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 13px;
    color: #c4b5fd;
    background: rgba(139,92,246,.12);
    border: 1px solid rgba(167,139,250,.25);
    cursor: pointer;
    transition: .3s ease;
}

.uc-back-btn:hover {
    color: white;
    background: rgba(139,92,246,.27);
    border-color: rgba(167,139,250,.5);
    transform: translateX(-4px);
    box-shadow: 0 6px 20px rgba(124,58,237,.2);
}

.uc-heading-label {
    color: #a78bfa;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 3px;
    margin: 0 0 6px;
}

.uc-heading {
    font-size: clamp(27px, 3vw, 35px);
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

.uc-subtitle {
    margin: 7px 0 0;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.6;
}

/* ========================================
   MAIN CONTAINER
======================================== */

.uc-container {
    width: 100%;
    max-width: 850px;
    margin: 0 auto;
    animation: ucFadeUp .65s ease both;
}

.uc-card {
    position: relative;
    overflow: hidden;
    padding: 32px;
    border: 1px solid rgba(148,163,184,.15);
    border-radius: 20px;
    background: linear-gradient(
        145deg,
        rgba(23,32,57,.91),
        rgba(15,23,42,.91)
    );
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 15px 40px rgba(0,0,0,.2);
    transition: border-color .3s ease, box-shadow .3s ease;
}

.uc-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 25px;
    right: 25px;
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(167,139,250,.6),
        rgba(96,165,250,.5),
        transparent
    );
}

.uc-card:hover {
    border-color: rgba(167,139,250,.28);
    box-shadow: 0 20px 48px rgba(0,0,0,.25);
}

/* ========================================
   CARD INTRO
======================================== */

.uc-intro {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(148,163,184,.13);
    margin-bottom: 29px;
}

.uc-intro-icon {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 16px;
    color: #c4b5fd;
    background: linear-gradient(
        135deg,
        rgba(124,58,237,.28),
        rgba(59,130,246,.18)
    );
    border: 1px solid rgba(167,139,250,.25);
    box-shadow: 0 6px 20px rgba(124,58,237,.13);
    transition: .3s ease;
}

.uc-card:hover .uc-intro-icon {
    transform: rotate(-6deg) scale(1.06);
}

.uc-intro h2 {
    color: #e2e8f0;
    font-size: 18px;
    font-weight: 750;
    margin: 0;
}

.uc-intro p {
    margin: 6px 0 0;
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.6;
}

/* ========================================
   FORM
======================================== */

.uc-form {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.uc-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.uc-field label {
    color: #cbd5e1;
    font-size: 12px;
    font-weight: 750;
    letter-spacing: .3px;
}

.uc-field label span {
    color: #f87171;
    margin-left: 3px;
}

.uc-input-wrapper {
    position: relative;
}

.uc-input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #818cf8;
    pointer-events: none;
    transition: .25s ease;
}

.uc-input,
.uc-textarea {
    width: 100%;
    border: 1px solid rgba(148,163,184,.18);
    border-radius: 11px;
    background: rgba(15,23,42,.72);
    color: #f1f5f9;
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: .3s ease;
}

.uc-input {
    height: 49px;
    padding: 0 15px 0 47px;
}

.uc-textarea {
    min-height: 145px;
    padding: 15px;
    resize: vertical;
    line-height: 1.7;
}

.uc-input::placeholder,
.uc-textarea::placeholder {
    color: #64748b;
}

.uc-input:focus,
.uc-textarea:focus {
    border-color: rgba(167,139,250,.65);
    background: rgba(30,41,70,.7);
    box-shadow:
        0 0 0 3px rgba(139,92,246,.12),
        0 5px 20px rgba(124,58,237,.08);
}

.uc-input-wrapper:focus-within .uc-input-icon {
    color: #c4b5fd;
}

.uc-hint {
    color: #64748b;
    font-size: 11px;
    line-height: 1.6;
}

/* ========================================
   ALERTS
======================================== */

.uc-alert {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    padding: 13px 15px;
    border-radius: 11px;
    font-size: 12px;
    line-height: 1.6;
    animation: ucFadeUp .35s ease both;
}

.uc-error {
    color: #fca5a5;
    background: rgba(127,29,29,.18);
    border: 1px solid rgba(248,113,113,.25);
}

.uc-success {
    color: #86efac;
    background: rgba(20,83,45,.18);
    border: 1px solid rgba(74,222,128,.22);
}

.uc-alert svg {
    flex-shrink: 0;
    margin-top: 1px;
}

/* ========================================
   ACTION BUTTONS
======================================== */

.uc-actions {
    display: flex;
    justify-content: flex-end;
    gap: 11px;
    padding-top: 23px;
    margin-top: 3px;
    border-top: 1px solid rgba(148,163,184,.13);
}

.uc-btn {
    min-height: 44px;
    padding: 0 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
}

.uc-cancel {
    color: #cbd5e1;
    background: rgba(148,163,184,.08);
    border: 1px solid rgba(148,163,184,.2);
}

.uc-cancel:hover:not(:disabled) {
    color: white;
    background: rgba(148,163,184,.16);
    border-color: rgba(148,163,184,.4);
    transform: translateY(-2px);
}

.uc-submit {
    color: white;
    background: linear-gradient(
        110deg,
        #7c3aed,
        #6366f1,
        #9333ea
    );
    border: 1px solid rgba(167,139,250,.3);
    box-shadow: 0 6px 20px rgba(124,58,237,.23);
}

.uc-submit:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 27px rgba(124,58,237,.38);
    filter: brightness(1.12);
}

.uc-submit:active:not(:disabled) {
    transform: scale(.97);
}

.uc-btn:disabled {
    opacity: .5;
    cursor: not-allowed;
}

.uc-submit:disabled svg {
    animation: ucSpin .8s linear infinite;
}

/* ========================================
   LOADING
======================================== */

.uc-loading {
    min-height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    color: #94a3b8;
    font-size: 13px;
    animation: ucFadeUp .4s ease both;
}

.uc-loader {
    width: 38px;
    height: 38px;
    border: 3px solid rgba(167,139,250,.17);
    border-top-color: #a78bfa;
    border-radius: 50%;
    animation: ucSpin .8s linear infinite;
}

/* ========================================
   ANIMATIONS
======================================== */

@keyframes ucFadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes ucFloat {
    from {
        transform: translate3d(0,0,0) scale(1);
    }
    to {
        transform: translate3d(20px,-20px,0) scale(1.12);
    }
}

@keyframes ucSpin {
    to {
        transform: rotate(360deg);
    }
}

/* ========================================
   RESPONSIVE
======================================== */

@media(max-width: 1100px) {
    .uc-page {
        padding: 27px 24px 35px;
    }
}

@media(max-width: 700px) {
    .uc-page {
        padding: 21px 15px 30px;
    }

    .uc-header {
        gap: 12px;
    }

    .uc-back-btn {
        width: 43px;
        height: 43px;
    }

    .uc-heading {
        font-size: 25px;
    }

    .uc-card {
        padding: 23px 18px;
    }

    .uc-intro {
        gap: 12px;
    }

    .uc-intro-icon {
        width: 47px;
        height: 47px;
    }

    .uc-actions {
        flex-direction: column-reverse;
    }

    .uc-btn {
        width: 100%;
    }
}

@media(prefers-reduced-motion: reduce) {
    .uc-page *,
    .uc-page *::before,
    .uc-page *::after {
        animation: none !important;
        transition: none !important;
    }
}

`;


function UpdateCategory() {

    const { categoryId } = useParams()

    const navigate = useNavigate()

    const [category, setCategory] = useState({
        name: "",
        description: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [updating, setUpdating] = useState(false)
    const [success, setSuccess] = useState("")

    useEffect(() => {

        const fetchCategory = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:8000/api/v1/category/admin/category/${categoryId}`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch category"
                    );
                }

                setCategory({
                    name: result.data.name || "",
                    description: result.data.description || ""
                });

            }
            catch (error) {

                setError(
                    error.message || "Something went wrong"
                );

            }
            finally {

                setLoading(false);

            }

        };

        fetchCategory();

    }, [categoryId]);


    const handleChange = (e) => {

        const { name, value } = e.target

        setCategory((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault()

        if (!category.name.trim()) {
            setError("Category name is required");
            return;
        }

        if (!category.description.trim()) {
            setError("Category description is required");
            return;
        }

        try {

            setUpdating(true)
            setError("")
            setSuccess("")

            const response = await fetch(`http://localhost:8000/api/v1/category/category/${categoryId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: category.name.trim(),
                        description: category.description.trim()
                    })
                }
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to update category"
                );
            }

            setCategory({
                name: result.data.name,
                description: result.data.description
            })

            setSuccess(
                result.message || "Category updated successfully!"
            );

            navigate("/admin/category-managment")


        } catch (error) {
            setError(
                error.message || "Something went wrong"
            );

        }

        finally {
            setUpdating(false);
        }
    }


    if (loading) {
        return (
            <>
                <style>{updateCategoryStyles}</style>

                <div className="uc-page">
                    <div className="uc-atmosphere">
                        <div className="uc-orb uc-orb-one"></div>
                        <div className="uc-orb uc-orb-two"></div>
                        <div className="uc-orb uc-orb-three"></div>
                        <div className="uc-grid-bg"></div>
                    </div>

                    <div className="uc-loading">
                        <div className="uc-loader"></div>
                        <span>Fetching category details...</span>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{updateCategoryStyles}</style>

            <div className="uc-page">

                {/* BACKGROUND */}

                <div className="uc-atmosphere">
                    <div className="uc-orb uc-orb-one"></div>
                    <div className="uc-orb uc-orb-two"></div>
                    <div className="uc-orb uc-orb-three"></div>
                    <div className="uc-grid-bg"></div>
                </div>

                {/* HEADER */}

                <div className="uc-header">

                    <button
                        className="uc-back-btn"
                        onClick={() => navigate(-1)}
                        type="button"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <div>
                        <p className="uc-heading-label">
                            CATEGORY MANAGEMENT
                        </p>

                        <h1 className="uc-heading">
                            Update Category
                        </h1>

                        <p className="uc-subtitle">
                            Modify your category information and save changes.
                        </p>
                    </div>

                </div>

                {/* MAIN CONTENT */}

                <div className="uc-container">

                    <div className="uc-card">

                        {/* INTRO */}

                        <div className="uc-intro">

                            <div className="uc-intro-icon">
                                <Tag size={25} />
                            </div>

                            <div>
                                <h2>Category Information</h2>

                                <p>
                                    Update the basic details of your category.
                                </p>
                            </div>

                        </div>

                        {/* FORM */}

                        <form
                            className="uc-form"
                            onSubmit={handleUpdateCategory}
                        >

                            {/* NAME */}

                            <div className="uc-field">

                                <label htmlFor="categoryName">
                                    Category Name <span>*</span>
                                </label>

                                <div className="uc-input-wrapper">

                                    <Tag
                                        size={17}
                                        className="uc-input-icon"
                                    />

                                    <input
                                        type="text"
                                        id="categoryName"
                                        name="name"
                                        className="uc-input"
                                        placeholder="Enter category name"
                                        value={category.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <span className="uc-hint">
                                    Enter a clear and recognizable category name.
                                </span>

                            </div>

                            {/* DESCRIPTION */}

                            <div className="uc-field">

                                <label htmlFor="categoryDescription">
                                    Description <span>*</span>
                                </label>

                                <textarea
                                    id="categoryDescription"
                                    name="description"
                                    className="uc-textarea"
                                    placeholder="Enter category description..."
                                    value={category.description}
                                    onChange={handleChange}
                                    required
                                />

                                <span className="uc-hint">
                                    Provide a short description explaining this category.
                                </span>

                            </div>

                            {/* ERROR */}

                            {error && (
                                <div className="uc-alert uc-error">
                                    <AlertCircle size={18} />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* SUCCESS */}

                            {success && (
                                <div className="uc-alert uc-success">
                                    <CheckCircle2 size={18} />
                                    <span>{success}</span>
                                </div>
                            )}

                            {/* BUTTONS */}

                            <div className="uc-actions">

                                <button
                                    type="button"
                                    className="uc-btn uc-cancel"
                                    onClick={() => navigate(-1)}
                                    disabled={updating}
                                >
                                    <ArrowLeft size={16} />
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="uc-btn uc-submit"
                                    disabled={updating}
                                >

                                    {updating ? (
                                        <>
                                            <Loader2 size={17} />
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={17} />
                                            Save Changes
                                        </>
                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );

}


export default UpdateCategory