import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const shopStyles = `

    /* =========================================
       MAIN BACKGROUND
    ========================================= */

    .shop-shell {
        position: relative;
        isolation: isolate;
        min-height: 100vh;
        overflow: hidden;
        color: #f8fafc;

        background:
            radial-gradient(ellipse at 50% -15%, #30205a 0%, transparent 50%),
            linear-gradient(145deg, #080914, #0b1020 48%, #0a0b16);
    }

    .shop-atmosphere {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    .shop-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(85px);
        opacity: .22;
        animation: shopOrbFloat 12s ease-in-out infinite alternate;
    }

    .shop-orb-one {
        width: 330px;
        height: 330px;
        background: #7c3aed;
        top: 100px;
        left: -150px;
    }

    .shop-orb-two {
        width: 380px;
        height: 380px;
        background: #2563eb;
        top: 650px;
        right: -180px;
        animation-delay: -4s;
    }

    .shop-orb-three {
        width: 260px;
        height: 260px;
        background: #c026d3;
        bottom: 50px;
        left: 35%;
        opacity: .12;
        animation-delay: -7s;
    }

    .shop-grid {
        position: absolute;
        inset: 0;
        opacity: .07;
        background-image:
            linear-gradient(#a5b4fc 1px, transparent 1px),
            linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
        background-size: 54px 54px;
        mask-image: linear-gradient(to bottom, black, transparent 75%);
    }

    .shop-container {
        position: relative;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 52px 24px 80px;
    }

    /* HERO */

    .category-hero {
        animation: shopFadeUp .7s both;
    }

    .shop-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 13px;
        border: 1px solid rgba(167,139,250,.25);
        border-radius: 999px;
        background: rgba(139,92,246,.09);
        color: #c4b5fd;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .shop-title {
        margin-top: 22px;
        font-size: clamp(2.4rem, 5vw, 4.5rem);
        font-weight: 800;
        line-height: 1.08;
        letter-spacing: -2px;
    }

    .shop-gradient-text {
        color: #c4b5fd;
        background: linear-gradient(110deg, #c4b5fd, #60a5fa, #e879f9);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .shop-subtitle {
        max-width: 560px;
        margin-top: 18px;
        color: #94a3b8;
        line-height: 1.8;
        font-size: 15px;
    }

    /* SEARCH */

    .shop-search-wrap {
        max-width: 680px;
        margin-top: 35px;
    }

    .shop-search {
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 6px 8px 6px 19px;
        border: 1px solid rgba(196,181,253,.18);
        border-radius: 20px;
        background: rgba(15,18,38,.78);
        backdrop-filter: blur(20px);
        box-shadow: 0 15px 50px rgba(0,0,0,.22);
        transition: .3s;
    }

    .shop-search:focus-within {
        border-color: rgba(167,139,250,.65);
        box-shadow: 0 0 0 4px rgba(139,92,246,.1),
                    0 18px 55px rgba(0,0,0,.3);
        transform: translateY(-2px);
    }

    .shop-search-icon {
        flex-shrink: 0;
        color: #a78bfa;
        font-size: 23px;
    }

    .shop-search input {
        width: 100%;
        min-width: 0;
        padding: 15px 0;
        color: #f8fafc;
        background: transparent;
        border: none;
        outline: none;
        font-size: 14px;
    }

    .shop-search input::placeholder {
        color: #64748b;
    }

    .shop-clear {
        flex-shrink: 0;
        padding: 10px 13px;
        border: none;
        border-radius: 12px;
        color: #c4b5fd;
        background: rgba(139,92,246,.13);
        cursor: pointer;
        transition: background .25s;
    }

    .shop-clear:hover {
        background: rgba(139,92,246,.25);
    }

    /* RESULTS */

    .shop-results-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
        margin: 60px 0 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(196,181,253,.1);
    }

    .shop-results-title {
        color: #f8fafc;
        font-size: 24px;
        font-weight: 700;
    }

    .shop-results-count {
        margin-top: 7px;
        color: #94a3b8;
        font-size: 13px;
    }

    .shop-count-pill {
        padding: 9px 13px;
        border: 1px solid rgba(167,139,250,.18);
        border-radius: 12px;
        background: rgba(139,92,246,.08);
        color: #c4b5fd;
        font-size: 12px;
        font-weight: 700;
    }

    /* CATEGORY GRID */

    .category-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
    }

    /* CATEGORY CARD */

    .category-card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        min-height: 265px;
        padding: 25px;
        overflow: hidden;

        border: 1px solid rgba(196,181,253,.13);
        border-radius: 24px;

        background:
            radial-gradient(circle at 100% 0%, rgba(139,92,246,.13), transparent 48%),
            linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.018));

        color: #f8fafc;
        text-align: left;
        cursor: pointer;
        backdrop-filter: blur(18px);

        box-shadow: 0 15px 40px rgba(0,0,0,.13);

        transition:
            transform .35s,
            border-color .35s,
            box-shadow .35s,
            background .35s;

        animation: shopFadeUp .55s both;
    }

    .category-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 20%;
        width: 60%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(196,181,253,.65), transparent);
        opacity: 0;
        transition: opacity .35s;
    }

    .category-card:hover {
        transform: translateY(-8px);
        border-color: rgba(167,139,250,.5);

        background:
            radial-gradient(circle at 100% 0%, rgba(139,92,246,.22), transparent 48%),
            linear-gradient(145deg, rgba(139,92,246,.15), rgba(255,255,255,.025));

        box-shadow:
            0 24px 55px rgba(0,0,0,.27),
            0 0 30px rgba(139,92,246,.09);
    }

    .category-card:hover::before {
        opacity: 1;
    }

    .category-card:focus-visible {
        outline: 2px solid #a78bfa;
        outline-offset: 4px;
    }

    /* CARD TOP */

    .category-card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .category-symbol {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 53px;
        height: 53px;
        border: 1px solid rgba(167,139,250,.25);
        border-radius: 17px;
        background: rgba(139,92,246,.15);
        color: #c4b5fd;
        font-size: 25px;
        transition: transform .3s, background .3s;
    }

    .category-card:hover .category-symbol {
        transform: rotate(12deg) scale(1.08);
        background: rgba(139,92,246,.27);
    }

    .category-arrow {
        color: #94a3b8;
        font-size: 23px;
        transition: transform .3s, color .3s;
    }

    .category-card:hover .category-arrow {
        transform: translate(4px, -4px);
        color: #c4b5fd;
    }

    /* CARD CONTENT */

    .category-card-content {
        flex: 1;
        margin-top: 25px;
    }

    .category-label {
        color: #a78bfa;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.4px;
    }

    .category-card-content h3 {
        margin-top: 9px;
        color: #f8fafc;
        font-size: 22px;
        font-weight: 750;
        line-height: 1.4;
        overflow-wrap: anywhere;
    }

    .category-card-content p {
        display: -webkit-box;
        overflow: hidden;
        margin-top: 9px;
        color: #94a3b8;
        font-size: 13px;
        line-height: 1.7;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    /* CARD FOOTER */

    .category-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 22px;
        padding-top: 16px;
        border-top: 1px solid rgba(196,181,253,.12);
        color: #c4b5fd;
        font-size: 12px;
        font-weight: 700;
    }

    /* STATUS */

    .shop-status {
        padding: 65px 20px;
        border: 1px dashed rgba(196,181,253,.2);
        border-radius: 24px;
        background: rgba(255,255,255,.025);
        text-align: center;
    }

    .shop-status-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        margin-bottom: 19px;
        border: 1px solid rgba(167,139,250,.22);
        border-radius: 20px;
        background: rgba(139,92,246,.12);
        color: #c4b5fd;
        font-size: 28px;
    }

    .shop-status-title {
        color: #f8fafc;
        font-size: 21px;
        font-weight: 700;
    }

    .shop-status-text {
        margin-top: 9px;
        color: #94a3b8;
        font-size: 13px;
        line-height: 1.8;
    }

    .shop-status-error {
        color: #fca5a5;
    }

    .shop-loading-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 15px 3px 0;
        border-radius: 50%;
        background: #a78bfa;
        animation: shopDotPulse .8s infinite alternate;
    }

    .shop-loading-dot:nth-child(2) {
        animation-delay: .2s;
    }

    .shop-loading-dot:nth-child(3) {
        animation-delay: .4s;
    }

    /* BUTTONS */

    .category-retry {
        margin-top: 20px;
        padding: 12px 20px;
        border: 1px solid rgba(167,139,250,.3);
        border-radius: 12px;
        background: linear-gradient(110deg, #7c3aed, #6366f1);
        color: white;
        font-weight: 700;
        cursor: pointer;
        transition: transform .25s, filter .25s;
    }

    .category-retry:hover {
        transform: translateY(-2px);
        filter: brightness(1.15);
    }

    /* PAGINATION */

    .shop-pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        margin: 40px 0 10px;
    }

    .shop-pagination button {
        padding: 11px 19px;
        border: 1px solid rgba(167,139,250,.25);
        border-radius: 12px;
        background: rgba(139,92,246,.12);
        color: #e9d5ff;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: background .25s, transform .25s, border-color .25s;
    }

    .shop-pagination button:hover:not(:disabled) {
        transform: translateY(-2px);
        border-color: rgba(167,139,250,.55);
        background: rgba(139,92,246,.25);
    }

    .shop-pagination button:disabled {
        opacity: .35;
        cursor: not-allowed;
    }

    .category-page-info {
        color: #c4b5fd;
        font-size: 13px;
        font-weight: 600;
    }

    /* ANIMATIONS */

    @keyframes shopOrbFloat {
        from { transform: translate(0, 0) scale(1); }
        to { transform: translate(25px, -25px) scale(1.1); }
    }

    @keyframes shopFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shopDotPulse {
        from { opacity: .3; transform: translateY(0); }
        to { opacity: 1; transform: translateY(-4px); }
    }

    /* RESPONSIVE */

    @media (max-width: 900px) {
        .category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 760px) {
        .shop-container {
            padding: 40px 18px 60px;
        }

        .shop-results-bar {
            margin-top: 43px;
        }
    }

    @media (max-width: 550px) {
        .category-grid {
            grid-template-columns: 1fr;
            gap: 16px;
        }

        .category-card {
            min-height: 240px;
            padding: 21px;
        }

        .shop-title {
            letter-spacing: -1px;
        }

        .shop-search {
            gap: 9px;
            padding-left: 13px;
        }

        .shop-search input {
            font-size: 13px;
        }

        .shop-pagination {
            gap: 12px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .shop-orb,
        .category-card,
        .category-symbol,
        .category-arrow,
        .shop-loading-dot {
            animation: none !important;
            transition: none !important;
        }
    }

`;

function Category() {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCategories, setTotalCategories] = useState(0);
    const [retryCount, setRetryCount] = useState(0);

    const navigate = useNavigate();

    const limit = 6;

    // Fetch Categories
    useEffect(() => {

        const controller = new AbortController();

        const timer = setTimeout(async () => {

            try {

                setLoading(true);
                setErrorMessage("");

                const keyword = searchTerm.trim();

                const url = keyword
                    ? `http://localhost:8000/api/v1/category/category/search?keyword=${encodeURIComponent(keyword)}`
                    : `http://localhost:8000/api/v1/category/category?page=${currentPage}&limit=${limit}`;

                const response = await fetch(url, {
                    signal: controller.signal
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch Categories !!!"
                    );
                }

                // Search Results
                if (keyword) {

                    const matches = Array.isArray(result.data)
                        ? result.data
                        : [];

                    setCategory(matches);
                    setTotalCategories(matches.length);
                    setTotalPages(1);

                }

                // Paginated Categories
                else {

                    const data = result.data || {};

                    setCategory(
                        Array.isArray(data.categories)
                            ? data.categories
                            : []
                    );

                    setCurrentPage(data.currentPage || currentPage);
                    setTotalPages(data.totalPages || 1);
                    setTotalCategories(data.totalCategories || 0);

                }

            } catch (error) {

                if (error.name !== "AbortError") {

                    console.error(
                        "Error in fetching Categories:",
                        error
                    );

                    setErrorMessage(
                        error.message || "Unable to fetch Categories !!!"
                    );

                    setCategory([]);
                    setTotalCategories(0);
                    setTotalPages(1);

                }

            } finally {

                if (!controller.signal.aborted) {
                    setLoading(false);
                }

            }

        }, 300);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };

    }, [searchTerm, currentPage, retryCount]);


    // Search Handler
    const handleSearch = (value) => {

        setSearchTerm(value);
        setCurrentPage(1);

    };


    // Category Click Handler
    const handleCategoryClick = (item) => {

        navigate(
            `/shop?category=${item._id}`
        );

    };


   return (

    <>
        <style>{shopStyles}</style>

        <main className="shop-shell">

            {/* Animated Background */}

            <div className="shop-atmosphere">

                <div className="shop-orb shop-orb-one"></div>

                <div className="shop-orb shop-orb-two"></div>

                <div className="shop-orb shop-orb-three"></div>

                <div className="shop-grid"></div>

            </div>


            <div className="shop-container">

                {/* Hero Section */}

                <section className="category-hero">

                    <div className="shop-eyebrow">
                        <span>✦</span>
                        EXPLORE OUR COLLECTION
                    </div>

                    <h1 className="shop-title">

                        Find Your{" "}

                        <span className="shop-gradient-text">
                            Category
                        </span>

                    </h1>

                    <p className="shop-subtitle">

                        Explore our carefully organized collections.
                        Discover products that match your interests
                        and find exactly what you are looking for.

                    </p>

                </section>


                {/* Search Section */}

                <section className="shop-search-wrap">

                    <div className="shop-search">

                        <span className="shop-search-icon">
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />

                        {searchTerm && (

                            <button
                                className="shop-clear"
                                type="button"
                                onClick={() => handleSearch("")}
                            >
                                Clear
                            </button>

                        )}

                    </div>

                </section>


                {/* Results Heading */}

                <section className="shop-results-bar">

                    <div>

                        <h2 className="shop-results-title">

                            {searchTerm
                                ? "Search Results"
                                : "Explore Categories"}

                        </h2>

                        <p className="shop-results-count">

                            {loading
                                ? "Discovering categories..."
                                : `${totalCategories} categories available`}

                        </p>

                    </div>

                    <div className="shop-count-pill">

                        {searchTerm
                            ? "SEARCH"
                            : "ALL COLLECTIONS"}

                    </div>

                </section>


                {/* Loading State */}

                {loading && (

                    <div className="shop-status">

                        <div className="shop-status-icon">
                            ✦
                        </div>

                        <h3 className="shop-status-title">
                            Finding Categories
                        </h3>

                        <p className="shop-status-text">
                            Please wait while we load your collections.
                        </p>

                        <div>

                            <span className="shop-loading-dot"></span>
                            <span className="shop-loading-dot"></span>
                            <span className="shop-loading-dot"></span>

                        </div>

                    </div>

                )}


                {/* Error State */}

                {!loading && errorMessage && (

                    <div className="shop-status">

                        <div className="shop-status-icon">
                            !
                        </div>

                        <h3 className="shop-status-title">
                            Something Went Wrong
                        </h3>

                        <p className="shop-status-text shop-status-error">
                            {errorMessage}
                        </p>

                        <button
                            className="category-retry"
                            type="button"
                            onClick={() => setRetryCount(prev => prev + 1)}
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* Empty State */}

                {!loading && !errorMessage && category.length === 0 && (

                    <div className="shop-status">

                        <div className="shop-status-icon">
                            ⌕
                        </div>

                        <h3 className="shop-status-title">
                            No Categories Found
                        </h3>

                        <p className="shop-status-text">

                            {searchTerm
                                ? "We couldn't find any category matching your search."
                                : "There are no categories available right now."}

                        </p>

                        {searchTerm && (

                            <button
                                className="category-retry"
                                type="button"
                                onClick={() => handleSearch("")}
                            >
                                Explore All Categories
                            </button>

                        )}

                    </div>

                )}


                {/* Category Cards */}

                {!loading && !errorMessage && category.length > 0 && (

                    <>

                        <div className="category-grid">

                            {category.map((item, index) => (

                                <button
                                    type="button"
                                    key={item._id}
                                    className="category-card"
                                    style={{
                                        animationDelay: `${index * 0.08}s`
                                    }}
                                    onClick={() => handleCategoryClick(item)}
                                >

                                    {/* Card Top */}

                                    <div className="category-card-top">

                                        <div className="category-symbol">
                                            ✦
                                        </div>

                                        <span className="category-arrow">
                                            ↗
                                        </span>

                                    </div>


                                    {/* Card Content */}

                                    <div className="category-card-content">

                                        <span className="category-label">
                                            CURATED COLLECTION
                                        </span>

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <p>
                                            {item.description ||
                                                "Explore products from this collection."}
                                        </p>

                                    </div>


                                    {/* Card Footer */}

                                    <div className="category-card-footer">

                                        <span>
                                            Explore Collection
                                        </span>

                                        <span>
                                            →
                                        </span>

                                    </div>

                                </button>

                            ))}

                        </div>


                        {/* Pagination */}

                        {!searchTerm && totalPages > 1 && (

                            <div className="shop-pagination">

                                <button
                                    type="button"
                                    disabled={currentPage <= 1 || loading}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                >
                                    ← Previous
                                </button>

                                <span className="category-page-info">

                                    Page {currentPage} of {totalPages}

                                </span>

                                <button
                                    type="button"
                                    disabled={currentPage >= totalPages || loading}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                >
                                    Next →

                                </button>

                            </div>

                        )}

                    </>

                )}

            </div>

        </main>

    </>

);

}

export default Category;