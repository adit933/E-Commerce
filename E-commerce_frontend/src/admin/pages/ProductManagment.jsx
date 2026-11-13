
import React, { useEffect, useState } from "react";
import {
    Package,
    ChevronLeft,
    ChevronRight,
    Star,
    Plus,
    Pencil
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const productManagementStyles = `

    /* MAIN PAGE */

    .product-management {
        position: relative;
        isolation: isolate;
        flex: 1;
        min-height: 0;
        height: 100%;
        max-height: 100%;
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        color: white;

        scrollbar-width: thin;
        scrollbar-color: rgba(139,92,246,.5) transparent;
    }

    .product-management::-webkit-scrollbar {
        width: 7px;
    }

    .product-management::-webkit-scrollbar-track {
        background: transparent;
    }

    .product-management::-webkit-scrollbar-thumb {
        background: rgba(139,92,246,.4);
        border-radius: 20px;
    }

    .product-management::-webkit-scrollbar-thumb:hover {
        background: rgba(139,92,246,.7);
    }

    /* BACKGROUND ATMOSPHERE */

    .pm-atmosphere {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    .pm-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(75px);
        opacity: .16;
        animation: dashboardFloat 12s ease-in-out infinite alternate;
    }

    .pm-orb-one {
        width: 320px;
        height: 320px;
        background: #7c3aed;
        top: -180px;
        left: 10%;
    }

    .pm-orb-two {
        width: 280px;
        height: 280px;
        background: #2563eb;
        top: 35%;
        right: -180px;
        animation-delay: -5s;
    }

    .pm-grid-bg {
        position: absolute;
        inset: 0;
        opacity: .07;
        background-image:
            linear-gradient(#a5b4fc 1px, transparent 1px),
            linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: linear-gradient(to bottom, black, transparent 85%);
    }

    /* PAGE HEADING */

    .pm-intro {
        animation: dashboardFadeUp .6s ease both;
    }

    .pm-label {
        color: #a78bfa;
        letter-spacing: 3px;
    }

    .pm-heading {
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

    .pm-content {
        animation: dashboardFadeUp .8s ease both;
    }

    /* SUMMARY */

    .pm-summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 18px;
        margin-bottom: 28px;
    }

    .pm-total-box {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px 22px;
        border: 1px solid rgba(167,139,250,.22);
        border-radius: 16px;
        background: rgba(30,41,70,.35);
        backdrop-filter: blur(14px);
        box-shadow: 0 8px 30px rgba(0,0,0,.12);
        transition: .3s ease;
    }

    .pm-total-box:hover {
        border-color: rgba(167,139,250,.5);
        transform: translateY(-3px);
        box-shadow: 0 12px 30px rgba(124,58,237,.12);
    }

    .pm-total-icon {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        border-radius: 13px;
        color: #c4b5fd;
        background: rgba(139,92,246,.18);
    }

    .pm-total-label {
        color: #a78bfa;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .pm-total-value {
        font-size: 23px;
        font-weight: 800;
        margin-top: 2px;
    }

    /* PRODUCT GRID */

    .pm-product-grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(235px, 1fr)
        );
        gap: 23px;
    }

    /* PRODUCT CARD */

    .pm-product-card {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(148,163,184,.13);
        border-radius: 20px;
        background: rgba(15,23,42,.52);
        backdrop-filter: blur(16px);
        box-shadow: 0 8px 30px rgba(0,0,0,.13);
        opacity: 0;

        animation: pmCardEnter .65s ease forwards;

        transition:
            transform .35s cubic-bezier(.2,.8,.2,1),
            border-color .35s ease,
            box-shadow .35s ease,
            background .35s ease;
    }

    .pm-product-card::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;

        background: linear-gradient(
            135deg,
            rgba(167,139,250,0),
            rgba(96,165,250,0),
            rgba(232,121,249,0)
        );

        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);

        -webkit-mask-composite: xor;
        mask-composite: exclude;

        pointer-events: none;
        transition: .35s ease;
        z-index: 2;
    }

    .pm-product-card:hover {
        transform: translateY(-8px) scale(1.015);
        border-color: rgba(167,139,250,.4);
        background: rgba(30,41,70,.65);

        box-shadow:
            0 18px 40px rgba(0,0,0,.28),
            0 0 25px rgba(124,58,237,.10);
    }

    .pm-product-card:hover::before {
        background: linear-gradient(
            135deg,
            rgba(167,139,250,.7),
            rgba(96,165,250,.45),
            rgba(232,121,249,.65)
        );
    }

    /* STAGGERED CARD ANIMATION */

    .pm-product-card:nth-child(1) {
        animation-delay: .05s;
    }

    .pm-product-card:nth-child(2) {
        animation-delay: .10s;
    }

    .pm-product-card:nth-child(3) {
        animation-delay: .15s;
    }

    .pm-product-card:nth-child(4) {
        animation-delay: .20s;
    }

    .pm-product-card:nth-child(5) {
        animation-delay: .25s;
    }

    .pm-product-card:nth-child(6) {
        animation-delay: .30s;
    }

    .pm-product-card:nth-child(7) {
        animation-delay: .35s;
    }

    .pm-product-card:nth-child(8) {
        animation-delay: .40s;
    }

    .pm-product-card:nth-child(9) {
        animation-delay: .45s;
    }

    .pm-product-card:nth-child(10) {
        animation-delay: .50s;
    }

    .pm-product-card:nth-child(11) {
        animation-delay: .55s;
    }

    .pm-product-card:nth-child(12) {
        animation-delay: .60s;
    }

    /* PRODUCT IMAGE */

    .pm-product-image {
        position: relative;
        height: 190px;
        overflow: hidden;

        background: linear-gradient(
            135deg,
            rgba(49,46,129,.65),
            rgba(88,28,135,.55),
            rgba(30,27,75,.75)
        );

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .pm-product-image::after {
        content: "";
        position: absolute;
        inset: 0;

        background: linear-gradient(
            to top,
            rgba(15,23,42,.35),
            transparent 55%
        );

        pointer-events: none;
    }

    .pm-product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .6s cubic-bezier(.2,.8,.2,1);
    }

    .pm-product-card:hover .pm-product-image img {
        transform: scale(1.09);
    }

    .pm-image-placeholder {
        color: #c4b5fd;
        opacity: .65;
    }

    /* PRODUCT INFORMATION */

    .pm-product-info {
        padding: 19px;
    }

    .pm-brand {
        color: #a78bfa;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 8px;
    }

    .pm-product-name {
        font-size: 16px;
        font-weight: 700;
        color: #f1f5f9;
        margin-bottom: 17px;
        min-height: 44px;
        line-height: 1.45;
        transition: color .3s ease;
    }

    .pm-product-card:hover .pm-product-name {
        color: #c4b5fd;
    }

    .pm-product-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 17px;
    }

    .pm-product-description {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 17px;
    }

    .pm-price {
        font-size: 20px;
        font-weight: 800;
        color: white;
    }

    .pm-stock {
        font-size: 12px;
        color: #94a3b8;
    }

    /* STATUS BADGES */

    .pm-badges {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        padding-top: 14px;
        border-top: 1px solid rgba(148,163,184,.12);
    }

    .pm-badge {
        font-size: 11px;
        font-weight: 700;
        padding: 6px 11px;
        border-radius: 20px;
        transition: transform .25s ease;
    }

    .pm-product-card:hover .pm-badge {
        transform: translateY(-2px);
    }

    .pm-active {
        color: #86efac;
        background: rgba(34,197,94,.13);
        border: 1px solid rgba(34,197,94,.13);
    }

    .pm-inactive {
        color: #fca5a5;
        background: rgba(239,68,68,.13);
        border: 1px solid rgba(239,68,68,.13);
    }

    .pm-featured {
        color: #fcd34d;
        background: rgba(245,158,11,.13);
        border: 1px solid rgba(245,158,11,.13);
    }

    /* PAGINATION */

    .pm-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        margin-top: 38px;
        margin-bottom: 15px;
        flex-wrap: wrap;
    }

    .pm-page-btn {
        min-width: 40px;
        height: 40px;
        padding: 0 12px;

        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid rgba(148,163,184,.18);
        border-radius: 11px;

        background: rgba(30,41,70,.4);
        backdrop-filter: blur(10px);

        color: #cbd5e1;
        cursor: pointer;

        transition: all .25s ease;
    }

    .pm-page-btn:hover:not(:disabled) {
        border-color: rgba(167,139,250,.65);
        color: white;
        background: rgba(124,58,237,.2);
        transform: translateY(-2px);
    }

    .pm-page-btn.selected {
        background: linear-gradient(
            110deg,
            #7c3aed,
            #6366f1,
            #9333ea
        );

        border-color: transparent;
        color: white;

        box-shadow: 0 5px 18px rgba(124,58,237,.3);
    }

    .pm-page-btn:disabled {
        opacity: .35;
        cursor: not-allowed;
    }

    /* LOADING AND ERROR */

    .pm-state {
        padding: 70px 15px;
        text-align: center;
        color: #94a3b8;
    }

    .pm-error {
        color: #fca5a5;
    }

    /* PRODUCT TOGGLE CONTROLS */

.pm-toggle-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
    margin-top: 12px;
    padding: 12px 0;
    border-top: 1px solid rgba(148,163,184,.12);
}

.pm-toggle-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #cbd5e1;
    font-size: 12px;
    font-weight: 600;
}

.pm-toggle {
    width: 40px;
    height: 22px;
    border-radius: 20px;
    border: 1px solid rgba(148,163,184,.3);
    background: #475569;
    position: relative;
    cursor: pointer;
    transition: .25s ease;
    flex-shrink: 0;
}

.pm-toggle.on {
    background: #16a34a;
    border-color: #22c55e;
}

.pm-toggle-circle {
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: .25s ease;
}

.pm-toggle.on .pm-toggle-circle {
    transform: translateX(18px);
}

.pm-discount-badge {
    position: absolute;
    top: 13px;
    right: 13px;
    z-index: 3;

    padding: 7px 12px;
    border-radius: 9px;

    background: linear-gradient(135deg, #ec4899, #9333ea);
    color: white;

    font-size: 12px;
    font-weight: 800;
    letter-spacing: .4px;

    border: 1px solid rgba(255,255,255,.2);
    box-shadow: 0 5px 15px rgba(147,51,234,.35);

    transition: transform .25s ease;
}

.pm-product-card:hover .pm-discount-badge {
    transform: scale(1.08);
}

    /* ANIMATIONS */

    @keyframes pmCardEnter {
        from {
            opacity: 0;
            transform: translateY(22px) scale(.98);
        }

        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes dashboardFloat {
        from {
            transform: translate3d(0,0,0) scale(1);
        }

        to {
            transform: translate3d(20px,-20px,0) scale(1.12);
        }
    }

    @keyframes dashboardFadeUp {
        from {
            opacity: 0;
            transform: translateY(14px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* RESPONSIVE */

    @media(max-width: 1000px) {

        .product-management {
            padding: 24px;
        }

        .pm-product-grid {
            grid-template-columns: repeat(
                auto-fill,
                minmax(210px, 1fr)
            );
        }
    }

    @media(max-width: 600px) {

        .product-management {
            padding: 16px;
        }

        .pm-product-grid {
            grid-template-columns: repeat(
                auto-fill,
                minmax(190px, 1fr)
            );

            gap: 15px;
        }

        .pm-product-image {
            height: 155px;
        }

        .pm-product-info {
            padding: 14px;
        }

        .pm-heading {
            font-size: 26px;
        }
    }

    @media (prefers-reduced-motion: reduce) {

        .pm-orb,
        .pm-intro,
        .pm-content,
        .pm-product-card {
            animation: none !important;
            opacity: 1;
        }

        .pm-product-card,
        .pm-product-image img,
        .pm-page-btn,
        .pm-total-box {
            transition: none !important;
        }
    }

    /* HEADER ACTION BUTTON */

.pm-create-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    padding: 13px 21px;

    border: 1px solid rgba(167,139,250,.3);
    border-radius: 13px;

    background: linear-gradient(
        110deg,
        #7c3aed,
        #6366f1,
        #9333ea
    );

    color: white;
    font-size: 13px;
    font-weight: 700;

    cursor: pointer;

    box-shadow: 0 7px 22px rgba(124,58,237,.25);

    transition: all .3s ease;
}

.pm-create-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(124,58,237,.4);
}

/* PRODUCT ACTIONS */

.pm-card-actions {
    display: flex;
    gap: 9px;
    margin-top: 16px;
}

.pm-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;

    flex: 1;
    padding: 10px;

    border-radius: 10px;
    border: 1px solid rgba(167,139,250,.22);

    background: rgba(139,92,246,.12);

    color: #c4b5fd;
    font-size: 12px;
    font-weight: 700;

    cursor: pointer;
    transition: all .25s ease;
}

.pm-action-btn:hover {
    background: rgba(139,92,246,.25);
    border-color: rgba(167,139,250,.55);
    transform: translateY(-2px);
}

.pm-create-btn:focus-visible,
.pm-action-btn:focus-visible {
    outline: 2px solid #c4b5fd;
    outline-offset: 3px;
}
`;

function ProductManagement() {

    const navigate = useNavigate()

    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const limit = 12;

    // FETCH PRODUCTS

    useEffect(() => {

        const controller = new AbortController();

        const fetchProducts = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:8000/api/v1/product/products/admin?page=${currentPage}&limit=${limit}`,
                    {
                        method: "GET",
                        credentials: "include",
                        signal: controller.signal
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch products"
                    );
                }

                setProducts(result.data.products || []);

                setTotalPages(
                    result.data.totalPages || 1
                );

                setTotalProducts(
                    result.data.totalProducts || 0
                );

            } catch (error) {

                if (error.name !== "AbortError") {
                    setError(error.message);
                }

            } finally {

                if (!controller.signal.aborted) {
                    setLoading(false);
                }

            }
        };

        fetchProducts();

        return () => controller.abort();

    }, [currentPage]);

    // GENERATE PAGE NUMBERS

    const handleToggleFeatured = async (productId) => {
        try {

            const response = await fetch(`http://localhost:8000/api/v1/product/products/${productId}/featured`,
                {
                    method: "PATCH",
                    credentials: "include"
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new ApiError(data.message || "Failed to Update the Status !!!")
            }

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === productId
                        ? {
                            ...product,
                            isFeatured: !product.isFeatured
                        }
                        : product
                )
            );

        } catch (error) {
            console.error("Featured Toggle Error:", error.message);
            alert(error.message);
        }
    }

    // TOGGLE ACTIVE STATUS
    const handleToggleActive = async (productId) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/product/products/${productId}/isActive`,
                {
                    method: "PATCH",
                    credentials: "include"
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to update active status"
                );
            }

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === productId
                        ? {
                            ...product,
                            isActive: !product.isActive
                        }
                        : product
                )
            );

        } catch (error) {
            console.error("Active Toggle Error:", error.message);
            alert(error.message);
        }
    };

    const getPageNumbers = () => {

        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);

        return Array.from(
            { length: end - start + 1 },
            (_, index) => start + index
        );
    };


    return (

        <>
            <style>{productManagementStyles}</style>

            <div className="product-management p-8">

                {/* BACKGROUND ATMOSPHERE */}

                <div className="pm-atmosphere">

                    <div className="pm-orb pm-orb-one" />

                    <div className="pm-orb pm-orb-two" />

                    <div className="pm-grid-bg" />

                </div>

                {/* PAGE HEADING */}

                <div className="pm-intro mb-10">

                    <p className="pm-label text-xs uppercase font-semibold mb-3">
                        Store Management
                    </p>

                    <h1 className="pm-heading text-3xl font-bold">
                        Product Management
                    </h1>

                    <p className="text-slate-400 text-sm mt-3">
                        Manage, monitor and organize all your store products.
                    </p>

                </div>

                <div className="pm-content">

                    {/* PRODUCT SUMMARY */}

                    <div className="pm-summary">

                        {/* TOTAL PRODUCTS */}

                        <div className="pm-total-box">

                            <div className="pm-total-icon">
                                <Package size={22} />
                            </div>

                            <div>

                                <p className="pm-total-label">
                                    TOTAL PRODUCTS
                                </p>

                                <p className="pm-total-value">
                                    {loading ? "..." : totalProducts}
                                </p>

                            </div>

                        </div>

                        {/* CREATE PRODUCT BUTTON */}

                        <button
                            className="pm-create-btn"
                            onClick={() => navigate("/admin/create-product")}
                        >

                            <Plus size={19} />

                            Add New Product

                        </button>

                    </div>

                    {/* LOADING STATE */}

                    {loading && (

                        <div className="pm-state">

                            <Package
                                size={38}
                                className="mx-auto mb-4"
                            />

                            <h3>Loading products...</h3>

                        </div>

                    )}

                    {/* ERROR STATE */}

                    {!loading && error && (

                        <div className="pm-state pm-error">

                            <Package
                                size={38}
                                className="mx-auto mb-4"
                            />

                            <h3>{error}</h3>

                            <button
                                onClick={() => window.location.reload()}
                                className="pm-page-btn mx-auto mt-5"
                            >
                                Retry
                            </button>

                        </div>

                    )}

                    {/* PRODUCT CARDS */}

                    {!loading && !error && (

                        <>

                            {products.length === 0 ? (

                                <div className="pm-state">

                                    <Package
                                        size={38}
                                        className="mx-auto mb-4"
                                    />

                                    <h3>No products found.</h3>

                                </div>

                            ) : (

                                <div className="pm-product-grid">

                                    {products.map((product) => (

                                        <div
                                            className="pm-product-card"
                                            key={product._id}
                                        >

                                            {/* PRODUCT IMAGE */}

                                            <div className="pm-product-image">

                                                {product.images?.[0]?.url ? (

                                                    <img
                                                        src={product.images[0].url}
                                                        alt={product.name}
                                                        loading="lazy"
                                                    />

                                                ) : (

                                                    <Package
                                                        size={45}
                                                        className="pm-image-placeholder"
                                                    />

                                                )}

                                                {Number(product.discountPercentage) > 0 && (

                                                    <div className="pm-discount-badge">
                                                        {Number(product.discountPercentage)}% OFF
                                                    </div>

                                                )}

                                            </div>

                                            {/* PRODUCT INFORMATION */}

                                            <div className="pm-product-info">

                                                <p className="pm-brand">
                                                    {product.brand}
                                                </p>

                                                <h3 className="pm-product-name">
                                                    {product.name}
                                                </h3>

                                                <h4 className=".pm-product-description">
                                                    {product.description}
                                                </h4>

                                                <div className="pm-product-details">

                                                    <span className="pm-price">

                                                        ₹{product.price !== "" &&
                                                            Number.isFinite(Number(product.price))
                                                            ? (
                                                                Number(product.price) *
                                                                (1 - Number(product.discountPercentage || 0) / 100)
                                                            ).toFixed(2).toLocaleString("en-IN") : "0.00"}

                                                    </span>

                                                    <span className="pm-stock">
                                                        Stock: {product.stock}
                                                    </span>

                                                </div>

                                                {/* STATUS BADGES */}

                                                <div className="pm-badges">

                                                    <span
                                                        className={`pm-badge ${product.isActive
                                                            ? "pm-active"
                                                            : "pm-inactive"
                                                            }`}
                                                    >

                                                        {product.isActive
                                                            ? "Active"
                                                            : "Inactive"}

                                                    </span>

                                                    {product.isFeatured && (

                                                        <span className="pm-badge pm-featured">

                                                            <Star
                                                                size={11}
                                                                className="inline mr-1"
                                                            />

                                                            Featured

                                                        </span>

                                                    )}

                                                    {/* PRODUCT TOGGLE BUTTONS */}

                                                    <div className="pm-toggle-controls">

                                                        {/* ACTIVE TOGGLE */}

                                                        <div className="pm-toggle-item">

                                                            <span>Active</span>

                                                            <button
                                                                type="button"
                                                                className={`pm-toggle ${product.isActive ? "on" : ""}`}
                                                                onClick={() => handleToggleActive(product._id)}
                                                                aria-label="Toggle active status"
                                                            >
                                                                <span className="pm-toggle-circle"></span>
                                                            </button>

                                                        </div>


                                                        {/* FEATURED TOGGLE */}

                                                        <div className="pm-toggle-item">

                                                            <span>Featured</span>

                                                            <button
                                                                type="button"
                                                                className={`pm-toggle ${product.isFeatured ? "on" : ""}`}
                                                                onClick={() => handleToggleFeatured(product._id)}
                                                                aria-label="Toggle featured status"
                                                            >
                                                                <span className="pm-toggle-circle"></span>
                                                            </button>

                                                        </div>

                                                    </div>

                                                    {/* PRODUCT ACTIONS */}

                                                    <div className="pm-card-actions">

                                                        <button
                                                            className="pm-action-btn"
                                                            onClick={() =>
                                                                navigate(`/admin/update-product/${product._id}`)
                                                            }
                                                        >

                                                            <Pencil size={15} />

                                                            Update Product

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                            {/* PAGINATION */}

                            {totalPages > 1 && (

                                <div className="pm-pagination">

                                    {/* PREVIOUS */}

                                    <button
                                        className="pm-page-btn"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage(
                                                prev => prev - 1
                                            )
                                        }
                                    >

                                        <ChevronLeft size={18} />

                                    </button>

                                    {/* PAGE NUMBERS */}

                                    {getPageNumbers().map((page) => (

                                        <button
                                            key={page}
                                            className={`pm-page-btn ${currentPage === page
                                                ? "selected"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                setCurrentPage(page)
                                            }
                                        >

                                            {page}

                                        </button>

                                    ))}

                                    {/* NEXT */}

                                    <button
                                        className="pm-page-btn"
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage(
                                                prev => prev + 1
                                            )
                                        }
                                    >

                                        <ChevronRight size={18} />

                                    </button>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </div>

        </>

    );
}

export default ProductManagement;
