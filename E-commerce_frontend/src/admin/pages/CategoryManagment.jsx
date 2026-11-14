
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Plus,
    Pencil,
    Trash2,
    Folder,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Layers,
    ArrowUpRight,
    Sparkles,
    Boxes
} from "lucide-react";


const LIMIT = 6;


const categoryManagementStyles = `

/* ========================================
   MAIN PAGE
======================================== */

.cm-page {
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

.cm-page * {
    box-sizing: border-box;
    font-family: inherit;
}

/* BACKGROUND */

.cm-atmosphere {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.cm-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(85px);
    opacity: .17;
    animation: cmFloat 12s ease-in-out infinite alternate;
}

.cm-orb-one {
    width: 350px;
    height: 350px;
    background: #7c3aed;
    top: -170px;
    left: 8%;
}

.cm-orb-two {
    width: 300px;
    height: 300px;
    background: #2563eb;
    top: 45%;
    right: -180px;
    animation-delay: -5s;
}

.cm-orb-three {
    width: 260px;
    height: 260px;
    background: #9333ea;
    bottom: -150px;
    left: 35%;
    animation-delay: -8s;
}

.cm-grid-bg {
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

.cm-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 35px;
    animation: cmFadeUp .6s ease both;
}

.cm-heading-content {
    display: flex;
    align-items: center;
    gap: 17px;
}

.cm-heading-icon {
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

.cm-heading-icon:hover {
    transform: rotate(-6deg) scale(1.07);
    box-shadow: 0 10px 30px rgba(124,58,237,.3);
}

.cm-heading-label {
    color: #a78bfa;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 3px;
    margin: 0 0 6px;
}

.cm-heading {
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

.cm-subtitle {
    margin: 8px 0 0;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.6;
}

.cm-add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 46px;
    padding: 0 20px;
    border-radius: 11px;
    color: white;
    background: linear-gradient(
        110deg,
        #7c3aed,
        #6366f1,
        #9333ea
    );
    border: 1px solid rgba(167,139,250,.3);
    box-shadow: 0 7px 22px rgba(124,58,237,.24);
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
    white-space: nowrap;
}

.cm-add-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(124,58,237,.4);
    filter: brightness(1.12);
}

.cm-add-btn:active {
    transform: scale(.97);
}

.cm-add-btn svg {
    transition: transform .3s ease;
}

.cm-add-btn:hover svg {
    transform: rotate(90deg);
}


/* ========================================
   SECTION INFO
======================================== */

.cm-section-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    animation: cmFadeUp .65s ease both;
}

.cm-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #e2e8f0;
    font-size: 16px;
    font-weight: 750;
    margin: 0;
}

.cm-section-title svg {
    color: #a78bfa;
}

.cm-total-tag {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border: 1px solid rgba(167,139,250,.2);
    border-radius: 10px;
    background: rgba(30,41,70,.45);
    color: #c4b5fd;
    font-size: 11px;
    font-weight: 700;
}

.cm-total-tag span {
    color: #e9d5ff;
    font-size: 14px;
}


/* ========================================
   CATEGORY GRID
======================================== */

.cm-category-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
}


/* ========================================
   CATEGORY CARD
======================================== */

.cm-category-card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    min-width: 0;
    min-height: 235px;
    display: flex;
    flex-direction: column;
    padding: 22px;
    border: 1px solid rgba(148,163,184,.14);
    border-radius: 18px;
    background: linear-gradient(
        145deg,
        rgba(23,32,57,.85),
        rgba(15,23,42,.85)
    );
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 10px 30px rgba(0,0,0,.14);
    animation: cmFadeUp .55s ease both;
    transition:
        transform .35s ease,
        border-color .35s ease,
        box-shadow .35s ease;
}

.cm-category-card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
        135deg,
        rgba(124,58,237,.09),
        transparent 45%,
        rgba(37,99,235,.07)
    );
    opacity: 0;
    transition: opacity .35s ease;
}

.cm-category-card::after {
    content: "";
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(167,139,250,.55),
        transparent
    );
    opacity: 0;
    transition: opacity .35s ease;
}

.cm-category-card:hover {
    transform: translateY(-7px);
    border-color: rgba(167,139,250,.38);
    box-shadow:
        0 18px 38px rgba(0,0,0,.24),
        0 0 24px rgba(124,58,237,.09);
}

.cm-category-card:hover::before,
.cm-category-card:hover::after {
    opacity: 1;
}


/* CARD TOP */

.cm-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 23px;
}

.cm-card-icon {
    width: 49px;
    height: 49px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 14px;
    color: #c4b5fd;
    background: linear-gradient(
        135deg,
        rgba(124,58,237,.25),
        rgba(59,130,246,.16)
    );
    border: 1px solid rgba(167,139,250,.23);
    box-shadow: 0 5px 18px rgba(124,58,237,.12);
    transition: .35s ease;
}

.cm-category-card:hover .cm-card-icon {
    transform: rotate(-7deg) scale(1.08);
    color: #e9d5ff;
    box-shadow: 0 7px 22px rgba(124,58,237,.25);
}

.cm-category-status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 11px;
    border-radius: 30px;
    font-size: 10px;
    font-weight: 750;
    letter-spacing: .4px;
    white-space: nowrap;
}

.cm-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
}

.cm-status-active {
    color: #86efac;
    background: rgba(34,197,94,.1);
    border: 1px solid rgba(74,222,128,.2);
}

.cm-status-active .cm-status-dot {
    box-shadow: 0 0 8px #4ade80;
}

.cm-status-inactive {
    color: #fcd34d;
    background: rgba(245,158,11,.1);
    border: 1px solid rgba(251,191,36,.2);
}


/* CARD CONTENT */

.cm-card-name {
    color: #f1f5f9;
    font-size: 17px;
    font-weight: 800;
    margin: 0 0 8px;
    letter-spacing: -.2px;
    overflow-wrap: anywhere;
    transition: color .25s ease;
}

.cm-category-card:hover .cm-card-name {
    color: #ddd6fe;
}

.cm-card-slug {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #818cf8;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 13px;
    overflow-wrap: anywhere;
}

.cm-card-description {
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.75;
    margin: 0 0 23px;
    min-height: 42px;
    overflow-wrap: anywhere;
}


/* CARD FOOTER */

.cm-card-footer {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid rgba(148,163,184,.12);
}

.cm-update-btn,
.cm-delete-btn {
    flex: 1;
    min-height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    border-radius: 9px;
    font-size: 11px;
    font-weight: 750;
    cursor: pointer;
    transition: .28s ease;
}

.cm-update-btn {
    color: #c4b5fd;
    background: rgba(139,92,246,.13);
    border: 1px solid rgba(167,139,250,.22);
}

.cm-update-btn:hover:not(:disabled) {
    color: white;
    background: rgba(139,92,246,.28);
    border-color: rgba(167,139,250,.5);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(124,58,237,.16);
}

.cm-delete-btn {
    color: #fca5a5;
    background: rgba(239,68,68,.08);
    border: 1px solid rgba(248,113,113,.19);
}

.cm-delete-btn:hover:not(:disabled) {
    color: white;
    background: rgba(220,38,38,.24);
    border-color: rgba(248,113,113,.45);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(220,38,38,.13);
}

.cm-update-btn:disabled,
.cm-delete-btn:disabled {
    opacity: .45;
    cursor: not-allowed;
}

.cm-delete-btn:disabled svg {
    animation: cmSpin .8s linear infinite;
}

.cm-message {
    min-height: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 35px 20px;
    border: 1px solid rgba(148,163,184,.14);
    border-radius: 18px;
    background: rgba(15,23,42,.65);
    animation: cmFadeUp .5s ease both;
}

.cm-message-icon {
    width: 65px;
    height: 65px;
    display: grid;
    place-items: center;
    margin-bottom: 18px;
    border-radius: 19px;
    color: #c4b5fd;
    background: rgba(139,92,246,.15);
    border: 1px solid rgba(167,139,250,.2);
}

.cm-message-icon svg {
    animation: cmFloat 3s ease-in-out infinite alternate;
}

.cm-message h3 {
    color: #e2e8f0;
    font-size: 17px;
    font-weight: 750;
    margin: 0 0 8px;
}

.cm-message p {
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.7;
    margin: 0;
}

.cm-loader {
    width: 32px;
    height: 32px;
    border: 3px solid rgba(167,139,250,.17);
    border-top-color: #a78bfa;
    border-radius: 50%;
    animation: cmSpin .8s linear infinite;
    margin-bottom: 18px;
}

.cm-error {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 16px;
    margin-bottom: 22px;
    border: 1px solid rgba(248,113,113,.24);
    border-radius: 11px;
    color: #fca5a5;
    background: rgba(127,29,29,.17);
    font-size: 12px;
    line-height: 1.6;
    animation: cmFadeUp .35s ease both;
}

.cm-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 30px;
    padding: 17px 19px;
    border: 1px solid rgba(148,163,184,.14);
    border-radius: 13px;
    background: rgba(15,23,42,.6);
    animation: cmFadeUp .5s ease both;
}

.cm-page-info {
    color: #94a3b8;
    font-size: 11px;
    font-weight: 600;
}

.cm-page-info strong {
    color: #c4b5fd;
}

.cm-page-controls {
    display: flex;
    align-items: center;
    gap: 7px;
}

.cm-page-btn {
    min-width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(148,163,184,.17);
    border-radius: 8px;
    background: rgba(30,41,70,.55);
    color: #cbd5e1;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: .25s ease;
}

.cm-page-btn:hover:not(:disabled) {
    color: #ddd6fe;
    border-color: rgba(167,139,250,.45);
    background: rgba(139,92,246,.17);
    transform: translateY(-2px);
}

.cm-page-btn.active {
    color: white;
    border-color: rgba(167,139,250,.5);
    background: linear-gradient(135deg,#7c3aed,#6366f1);
    box-shadow: 0 4px 13px rgba(124,58,237,.25);
}

.cm-page-btn:disabled {
    opacity: .35;
    cursor: not-allowed;
}


/* DELETE CONFIRMATION MODAL */

.cm-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(2, 6, 23, .78);
    backdrop-filter: blur(8px);
    animation: cmFadeUp .25s ease both;
}

.cm-delete-modal {
    width: 100%;
    max-width: 430px;
    padding: 28px;
    border: 1px solid rgba(248,113,113,.25);
    border-radius: 19px;
    background: linear-gradient(
        145deg,
        #1e293b,
        #0f172a
    );
    box-shadow: 0 25px 80px rgba(0,0,0,.5);
    animation: cmFadeUp .3s ease both;
}

.cm-modal-icon {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    margin-bottom: 18px;
    border-radius: 14px;
    color: #fca5a5;
    background: rgba(239,68,68,.13);
    border: 1px solid rgba(248,113,113,.25);
}

.cm-delete-modal h2 {
    color: #f1f5f9;
    font-size: 21px;
    margin: 0 0 12px;
}

.cm-delete-modal p {
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.7;
    margin: 0 0 15px;
}

.cm-product-warning {
    padding: 14px;
    margin: 18px 0;
    border-radius: 11px;
    border: 1px solid rgba(248,113,113,.2);
    background: rgba(239,68,68,.08);
    color: #fca5a5;
    font-size: 12px;
    line-height: 1.7;
}

.cm-modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;
}

.cm-modal-btn {
    min-height: 40px;
    padding: 0 17px;
    border-radius: 9px;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: .25s ease;
}

.cm-cancel-btn {
    color: #cbd5e1;
    background: rgba(148,163,184,.1);
    border: 1px solid rgba(148,163,184,.2);
}

.cm-confirm-btn {
    color: white;
    background: linear-gradient(110deg,#dc2626,#b91c1c);
    border: 1px solid rgba(248,113,113,.3);
}

.cm-modal-btn:hover:not(:disabled) {
    transform: translateY(-2px);
}

.cm-modal-btn:disabled {
    opacity: .5;
    cursor: not-allowed;
}

@media(max-width: 480px) {
    .cm-modal-actions {
        flex-direction: column-reverse;
    }

    .cm-modal-btn {
        width: 100%;
    }
}



/* ========================================
   ANIMATIONS
======================================== */

@keyframes cmFadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes cmFloat {
    from {
        transform: translate3d(0,0,0) scale(1);
    }

    to {
        transform: translate3d(20px,-20px,0) scale(1.12);
    }
}

@keyframes cmSpin {
    to {
        transform: rotate(360deg);
    }
}


/* ========================================
   RESPONSIVE
======================================== */

@media(max-width: 1100px) {

    .cm-page {
        padding: 27px 24px 35px;
    }

    .cm-category-grid {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }
}

@media(max-width: 700px) {

    .cm-page {
        padding: 21px 15px 30px;
    }

    .cm-header {
        align-items: flex-start;
    }

    .cm-heading-content {
        gap: 12px;
    }

    .cm-heading-icon {
        width: 48px;
        height: 48px;
    }

    .cm-heading {
        font-size: 25px;
    }

    .cm-add-btn {
        width: 100%;
    }

    .cm-category-grid {
        grid-template-columns: 1fr;
    }

    .cm-category-card {
        min-height: 220px;
    }

    .cm-pagination {
        flex-direction: column;
        align-items: flex-start;
    }

    .cm-page-controls {
        width: 100%;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
}

@media(prefers-reduced-motion: reduce) {

    .cm-page *,
    .cm-page *::before,
    .cm-page *::after {
        animation: none !important;
        transition: none !important;
    }
}

`;


function CategoryManagment() {

    const navigate = useNavigate();

    // STATES

    const [categories, setCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCategories, setTotalCategories] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [deleteId, setDeleteId] = useState(null);

    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [productCount, setProductCount] = useState(0)


    // FETCH CATEGORIES

    const fetchCategories = async (page) => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:8000/api/v1/category/admin/categories?page=${page}&limit=${LIMIT}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch Categories !!!"
                );
            }

            setCategories(result.data.categories);
            setCurrentPage(result.data.currentPage);
            setTotalPages(result.data.totalPages);
            setTotalCategories(result.data.totalCategories);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    // FETCH WHEN PAGE CHANGES

    useEffect(() => {

        fetchCategories(currentPage);

    }, [currentPage]);


    // ADD CATEGORY

    const handleAddCategory = () => {

        navigate("/admin/create-category");

    };


    // UPDATE CATEGORY

    const handleUpdateCategory = (categoryId) => {

        navigate(`/admin/update-category/${categoryId}`);

    };


    // DELETE CATEGORY

    const handleDeleteCategory = async (categoryId) => {

        // const confirmDelete = window.confirm(
        //     "Are you sure you want to delete this category?"
        // );

        // if (!confirmDelete) return;

        try {

            setDeleteId(categoryId);
            setError("");

            const response = await fetch(
                `http://localhost:8000/api/v1/category/category/delete/${categoryId}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            const result = await response.json();

            if (response.status === 409) {
                setProductCount(result.data.productCount)
                setShowDeleteModel(true)

                return
            }

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to delete category"
                );
            }

            await fetchCategories(currentPage);

        } catch (error) {

            setError(error.message);

        }
    };

    const confirmDeleteCategory = async () => {
        try {

            const response = await fetch(`http://localhost:8000/api/v1/category/category/delete/${deleteId}?force=true`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            )

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to delete category"
                );
            }

            setShowDeleteModel(false)
            setProductCount(0)

            if (categories.length === 1 && currentPage > 1) {

                setCurrentPage(prev => prev - 1);

            } else {

                await fetchCategories(currentPage);

            }

        } catch (error) {
            setError(error.message)
        } finally {
            setDeleteId(null)
        }
    }


    // GENERATE PAGE NUMBERS

    const getPageNumbers = () => {

        return Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );

    };


    return (

        <>
            <style>{categoryManagementStyles}</style>

            <div className="cm-page">

                {/* BACKGROUND EFFECTS */}

                <div className="cm-atmosphere">

                    <div className="cm-orb cm-orb-one"></div>

                    <div className="cm-orb cm-orb-two"></div>

                    <div className="cm-orb cm-orb-three"></div>

                    <div className="cm-grid-bg"></div>

                </div>


                {/* HEADER */}

                <div className="cm-header">

                    <div className="cm-heading-content">

                        <div className="cm-heading-icon">
                            <Layers size={29} />
                        </div>

                        <div>

                            <p className="cm-heading-label">
                                ADMINISTRATION
                            </p>

                            <h1 className="cm-heading">
                                Category Management
                            </h1>

                            <p className="cm-subtitle">
                                Organize and manage your product categories
                                in one place.
                            </p>

                        </div>

                    </div>


                    <button
                        className="cm-add-btn"
                        onClick={handleAddCategory}
                    >

                        <Plus size={17} />

                        Add New Category

                        <ArrowUpRight size={15} />

                    </button>

                </div>


                {/* ERROR MESSAGE */}

                {error && (

                    <div className="cm-error">

                        <Sparkles size={17} />

                        {error}

                    </div>

                )}


                {/* SECTION HEADER */}

                <div className="cm-section-top">

                    <h2 className="cm-section-title">

                        <Boxes size={19} />

                        All Categories

                    </h2>

                    <div className="cm-total-tag">

                        <Folder size={14} />

                        Total Categories

                        <span>{totalCategories}</span>

                    </div>

                </div>


                {/* LOADING */}

                {loading ? (

                    <div className="cm-message">

                        <div className="cm-loader"></div>

                        <h3>Loading Categories</h3>

                        <p>
                            Fetching your categories. Please wait...
                        </p>

                    </div>

                ) : categories.length === 0 ? (

                    /* EMPTY STATE */

                    <div className="cm-message">

                        <div className="cm-message-icon">

                            <Folder size={29} />

                        </div>

                        <h3>No Categories Found</h3>

                        <p>
                            Your category collection is currently empty.
                            <br />
                            Start by creating your first category.
                        </p>

                        <button
                            className="cm-add-btn"
                            style={{ marginTop: 22 }}
                            onClick={handleAddCategory}
                        >

                            <Plus size={16} />

                            Create Your First Category

                        </button>

                    </div>

                ) : (

                    /* CATEGORY CARDS */

                    <div className="cm-category-grid">

                        {categories.map((category, index) => (

                            <div
                                className="cm-category-card"
                                key={category._id}
                                style={{
                                    animationDelay: `${index * 0.08}s`
                                }}
                            >

                                {/* CARD TOP */}

                                <div className="cm-card-top">

                                    <div className="cm-card-icon">

                                        <Folder size={24} />

                                    </div>


                                    <span
                                        className={`cm-category-status ${category.isActive
                                            ? "cm-status-active"
                                            : "cm-status-inactive"
                                            }`}
                                    >

                                        <span className="cm-status-dot"></span>

                                        {category.isActive
                                            ? "Active"
                                            : "Inactive"}

                                    </span>

                                </div>


                                {/* CATEGORY DETAILS */}

                                <h3 className="cm-card-name">

                                    {category.name}

                                </h3>


                                <div className="cm-card-slug">

                                    <Layers size={12} />

                                    {category.slug}

                                </div>


                                <p className="cm-card-description">

                                    {category.description ||
                                        "No description available for this category."}

                                </p>


                                {/* CARD ACTIONS */}

                                <div className="cm-card-footer">

                                    <button
                                        className="cm-update-btn"
                                        onClick={() =>
                                            handleUpdateCategory(category._id)
                                        }
                                    >

                                        <Pencil size={14} />

                                        Update

                                    </button>


                                    <button
                                        className="cm-delete-btn"
                                        disabled={deleteId === category._id}
                                        onClick={() =>
                                            handleDeleteCategory(category._id)
                                        }
                                    >

                                        <Trash2 size={14} />

                                        {deleteId === category._id
                                            ? "Deleting..."
                                            : "Delete"}

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* PAGINATION */}

                {!loading && totalPages > 1 && (

                    <div className="cm-pagination">

                        <div className="cm-page-info">

                            Showing{" "}

                            <strong>{categories.length}</strong>

                            {" "}categories on page{" "}

                            <strong>{currentPage}</strong>

                            {" "}of{" "}

                            <strong>{totalPages}</strong>

                            {" "}({totalCategories} total)

                        </div>


                        <div className="cm-page-controls">

                            <button
                                className="cm-page-btn"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(prev => prev - 1)
                                }
                            >

                                <ChevronLeft size={17} />

                            </button>


                            {getPageNumbers().map((page) => (

                                <button
                                    key={page}
                                    className={`cm-page-btn ${currentPage === page ? "active" : ""
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >

                                    {page}

                                </button>

                            ))}


                            <button
                                className="cm-page-btn"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage(prev => prev + 1)
                                }
                            >

                                <ChevronRight size={17} />

                            </button>

                        </div>

                    </div>

                )}


                {showDeleteModel && (

                    <div className="cm-modal-overlay">

                        <div className="cm-delete-modal">

                            <div className="cm-modal-icon">
                                <Trash2 size={25} />
                            </div>

                            <h2>Delete Category?</h2>

                            <p>
                                This category contains{" "}
                                <strong>{productCount} products</strong>.
                            </p>

                            <div className="cm-product-warning">

                                <strong>Warning!</strong>

                                <br />

                                Deleting this category will permanently
                                delete all {productCount} associated products.

                                This action cannot be undone.

                            </div>

                            <p>
                                Are you sure you want to proceed?
                            </p>

                            <div className="cm-modal-actions">

                                <button
                                    className="cm-modal-btn cm-cancel-btn"
                                    onClick={() => {
                                        setShowDeleteModel(false);
                                        setProductCount(0);
                                        setDeleteId(null)
                                    }}
                                    disabled={deleteId === null}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="cm-modal-btn cm-confirm-btn"
                                    onClick={confirmDeleteCategory}
                                    disabled={deleteId === null}
                                >
                                    {deleteId === null
                                        ? "Deleting..."
                                        : "Delete Everything"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}


            </div>

        </>

    );

}


export default CategoryManagment;
