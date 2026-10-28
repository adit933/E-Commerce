
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const shopStyles = `
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
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 52px 24px 80px;
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
        transition: border-color .3s, box-shadow .3s, transform .3s;
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
        border-radius: 12px;
        color: #c4b5fd;
        background: rgba(139,92,246,.13);
        cursor: pointer;
        transition: background .25s;
    }

    .shop-clear:hover {
        background: rgba(139,92,246,.25);
    }

    .shop-results-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
        margin: 60px 0 24px;
    }

    .shop-results-title {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -.5px;
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
    }

    .shop-product-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 23px;
    }

    .shop-product-card {
        min-width: 0;
        overflow: hidden;
        border: 1px solid rgba(196,181,253,.12);
        border-radius: 23px;
        background: linear-gradient(
            145deg,
            rgba(255,255,255,.065),
            rgba(255,255,255,.018)
        );
        box-shadow: 0 15px 40px rgba(0,0,0,.13);
        backdrop-filter: blur(18px);
        transition: transform .35s, border-color .35s,
                    box-shadow .35s, background .35s;
        animation: shopFadeUp .55s both;
    }

    .shop-product-card:hover {
        transform: translateY(-7px);
        border-color: rgba(167,139,250,.4);
        background: linear-gradient(
            145deg,
            rgba(139,92,246,.11),
            rgba(255,255,255,.025)
        );
        box-shadow: 0 24px 55px rgba(0,0,0,.27),
                    0 0 30px rgba(139,92,246,.07);
    }

    .shop-image-wrap {
        position: relative;
        height: 245px;
        overflow: hidden;
        background: linear-gradient(135deg, #15172c, #101426);
    }

    .shop-product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .6s cubic-bezier(.2,.7,.3,1);
    }

    .shop-product-card:hover .shop-product-image {
        transform: scale(1.07);
    }

    .shop-image-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #94a3b8;
        font-size: 13px;
    }

    .shop-discount-badge {
        position: absolute;
        top: 14px;
        left: 14px;
        padding: 7px 10px;
        border: 1px solid rgba(74,222,128,.22);
        border-radius: 10px;
        background: rgba(20,83,45,.85);
        color: #bbf7d0;
        font-size: 11px;
        font-weight: 700;
        backdrop-filter: blur(12px);
    }

    .shop-card-body {
        padding: 20px;
    }

    .shop-brand {
        overflow: hidden;
        color: #a78bfa;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.2px;
        text-overflow: ellipsis;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .shop-product-name {
        display: -webkit-box;
        overflow: hidden;
        min-height: 52px;
        margin-top: 9px;
        color: #f8fafc;
        font-size: 17px;
        font-weight: 700;
        line-height: 1.55;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .shop-description {
        display: -webkit-box;
        overflow: hidden;
        min-height: 40px;
        margin-top: 7px;
        color: #94a3b8;
        font-size: 12px;
        line-height: 1.7;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .shop-price-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 19px;
    }

    .shop-price {
        color: #f8fafc;
        font-size: 22px;
        font-weight: 800;
    }

    .shop-old-price {
        color: #64748b;
        font-size: 12px;
        text-decoration: line-through;
    }

    .shop-view-button {
        display: block;
        margin-top: 19px;
        padding: 13px 12px;
        border: 1px solid rgba(167,139,250,.25);
        border-radius: 13px;
        background: linear-gradient(110deg, #7c3aed, #6366f1, #8b5cf6);
        background-size: 200% 100%;
        box-shadow: 0 8px 24px rgba(124,58,237,.2);
        color: white;
        font-size: 13px;
        font-weight: 700;
        text-align: center;
        text-decoration: none;
        transition: transform .25s, box-shadow .25s,
                    background-position .5s;
    }

    .shop-view-button:hover {
        transform: translateY(-2px);
        background-position: 100% 50%;
        box-shadow: 0 12px 30px rgba(124,58,237,.35);
    }

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
        margin: 0 3px;
        border-radius: 50%;
        background: #a78bfa;
        animation: shopDotPulse .8s infinite alternate;
    }

    .shop-loading-dot:nth-child(2) { animation-delay: .2s; }
    .shop-loading-dot:nth-child(3) { animation-delay: .4s; }

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

    @media (max-width: 1100px) {
        .shop-product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media (max-width: 760px) {
        .shop-product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 15px;
        }

        .shop-container {
            padding: 40px 18px 60px;
        }

        .shop-image-wrap {
            height: 205px;
        }

        .shop-card-body {
            padding: 15px;
        }

        .shop-results-bar {
            margin-top: 43px;
        }
    }

    @media (max-width: 440px) {
        .shop-product-grid {
            grid-template-columns: 1fr;
        }

        .shop-image-wrap {
            height: 260px;
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
    }

    @media (prefers-reduced-motion: reduce) {
        .shop-orb,
        .shop-product-card,
        .shop-loading-dot {
            animation: none !important;
        }

        .shop-product-card,
        .shop-product-image,
        .shop-search,
        .shop-view-button {
            transition: none !important;
        }
    }
        .shop-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 32px 0;
}

.shop-pagination button {
    padding: 10px 18px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.shop-pagination button:hover:not(:disabled) {
    background-color: #e5e7eb;
}

.shop-pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
`;



const limit = 20

function Shop() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)
    const [retryCount, setRetyrCount] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                setError("");

                const keyword = searchTerm.trim();

                const url = keyword
                    ? `http://localhost:8000/api/v1/product/products/search?keyword=${encodeURIComponent(keyword)}`
                    : `http://localhost:8000/api/v1/product/products?page=${currentPage}&limit=${limit}`;

                const response = await fetch(url, {
                    signal: controller.signal
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch products"
                    );
                }

                console.log(result);

                if (keyword) {
                    // Search API returns an array.
                    const matches = Array.isArray(result.data)
                        ? result.data
                        : [];

                    setProducts(matches);
                    setTotalProducts(matches.length);
                    setTotalPages(1);
                } else {
                    // Paginated products API returns an object.
                    const data = result.data;

                    setProducts(
                        Array.isArray(data.products)
                            ? data.products
                            : []
                    );

                    setCurrentPage(data.currentPage);
                    setTotalPages(data.totalPages);
                    setTotalProducts(data.totalProducts);
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Something went wrong");
                    setProducts([]);
                    setTotalProducts(0);
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
0
    return (
        <>
            <style>{shopStyles}</style>

            <main className="shop-shell">
                <div className="shop-atmosphere" aria-hidden="true">
                    <div className="shop-grid" />
                    <div className="shop-orb shop-orb-one" />
                    <div className="shop-orb shop-orb-two" />
                    <div className="shop-orb shop-orb-three" />
                </div>

                <section className="shop-container">
                    <header>
                        <span className="shop-eyebrow">
                            <span>✦</span>
                            YOUR NEXT FAVOURITE
                        </span>

                        <h1 className="shop-title">
                            Find what you
                            <br />
                            <span className="shop-gradient-text">
                                love.
                            </span>
                        </h1>

                        <p className="shop-subtitle">
                            Explore our collection of products.
                            Search by name or brand to discover
                            something that suits you.
                        </p>

                        <div className="shop-search-wrap">
                            <div className="shop-search">
                                <span
                                    className="shop-search-icon"
                                    aria-hidden="true"
                                >
                                    ⌕
                                </span>

                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                    placeholder="Search products or brands..."
                                    aria-label="Search products by name or brand"
                                />

                                {searchTerm && (
                                    <button
                                        type="button"
                                        className="shop-clear"
                                        onClick={() => setSearchTerm("")}
                                        aria-label="Clear search"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </header>

                    <div className="shop-results-bar">
                        <div>
                            <h2 className="shop-results-title">
                                {searchTerm.trim()
                                    ? "Search results"
                                    : "Explore collection"}
                            </h2>

                            <p className="shop-results-count">
                                {searchTerm.trim()
                                    ? `Results for "${searchTerm.trim()}"`
                                    : "Discover products picked for you"}
                            </p>
                        </div>

                        {!loading && !error && (
                            <span className="shop-count-pill">
                                {searchTerm.trim() ? products.length : totalProducts}{" "}
                                {(searchTerm.trim() ? products.length : totalProducts) === 1
                                    ? "product"
                                    : "products"}
                            </span>
                        )}
                    </div>

                    {loading && (
                        <div className="shop-status" role="status">
                            <div className="shop-status-icon">
                                ◌
                            </div>
                            <h3 className="shop-status-title">
                                Finding your products
                            </h3>
                            <p className="shop-status-text">
                                Just a moment
                            </p>
                            <div aria-hidden="true">
                                <span className="shop-loading-dot" />
                                <span className="shop-loading-dot" />
                                <span className="shop-loading-dot" />
                            </div>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="shop-status" role="alert">
                            <div className="shop-status-icon">!</div>
                            <h3 className="shop-status-title">
                                Unable to load products
                            </h3>
                            <p className="shop-status-text shop-status-error">
                                {error}
                            </p>
                            <button
                                type="button"
                                className="shop-view-button"
                                onClick={(count) => count + 1}
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {!loading && !error && products.length === 0 && (
                        <div className="shop-status">
                            <div className="shop-status-icon">⌕</div>
                            <h3 className="shop-status-title">
                                No products found
                            </h3>
                            <p className="shop-status-text">
                                Try a different product name or brand.
                            </p>
                            {searchTerm && (
                                <button
                                    type="button"
                                    className="shop-view-button"
                                    onClick={() => setSearchTerm("")}
                                >
                                    View all products
                                </button>
                            )}
                        </div>
                    )}

                    {!loading && !error && products.length > 0 && (
                        <div className="shop-product-grid">
                            {products.map((product, index) => {
                                const imageUrl =
                                    product.image ||
                                    (Array.isArray(product.images)
                                        ? product.images[0]?.url
                                        : null);

                                const price = Number(product.price) || 0;

                                const discount = Math.min(
                                    100,
                                    Math.max(
                                        0,
                                        Number(product.discountPercentage) || 0
                                    )
                                );

                                const discountedPrice =
                                    price * (1 - discount / 100);

                                return (
                                    <article
                                        key={product._id}
                                        className="shop-product-card"
                                        style={{
                                            animationDelay: `${Math.min(
                                                index * 60,
                                                360
                                            )}ms`
                                        }}
                                    >
                                        <div className="shop-image-wrap">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className="shop-product-image"
                                                />
                                            ) : (
                                                <div className="shop-image-placeholder">
                                                    Image unavailable
                                                </div>
                                            )}

                                            {discount > 0 && (
                                                <span className="shop-discount-badge">
                                                    {discount}% OFF
                                                </span>
                                            )}
                                        </div>

                                        <div className="shop-card-body">
                                            <p className="shop-brand">
                                                {product.brand || "Our collection"}
                                            </p>

                                            <h3 className="shop-product-name">
                                                {product.name}
                                            </h3>

                                            <p className="shop-description">
                                                {product.description}
                                            </p>

                                            <div className="shop-price-row">
                                                <span className="shop-price">
                                                    ₹
                                                    {discountedPrice.toLocaleString(
                                                        "en-IN",
                                                        {
                                                            maximumFractionDigits: 2
                                                        }
                                                    )}
                                                </span>

                                                {discount > 0 && (
                                                    <span className="shop-old-price">
                                                        ₹
                                                        {price.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => navigate(`/products/${product._id}`)}
                                                className="shop-view-button"
                                            >
                                                View Product →
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading &&
                        !error &&
                        !searchTerm.trim() &&
                        totalPages > 1 && (
                            <div className="shop-pagination">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => page - 1)}
                                    disabled={currentPage <= 1}
                                >
                                    ← Previous
                                </button>

                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => page + 1)}
                                    disabled={currentPage >= totalPages}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                </section>
            </main>
        </>
    );
}

export default Shop;
