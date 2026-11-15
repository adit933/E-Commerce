
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
    Layers,
    Package,
    Truck,
    ShoppingBag,
    IndianRupee,
    Search,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    ArrowRight,
    ArrowLeft,
    User,
    CalendarDays,
    Boxes,
    Sparkles,
    PackageCheck,
    RotateCcw
} from "lucide-react";


const LIMIT = 6;


const shippedStyles = `

.op-page {
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
}

.op-page * {
    box-sizing: border-box;
    font-family: inherit;
}

/* BACKGROUND */

.op-atmosphere {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.op-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(85px);
    opacity: .17;
    animation: opFloat 12s ease-in-out infinite alternate;
}

.op-orb-one {
    width: 350px;
    height: 350px;
    background: #7c3aed;
    top: -170px;
    left: 8%;
}

.op-orb-two {
    width: 300px;
    height: 300px;
    background: #2563eb;
    top: 45%;
    right: -180px;
}

.op-orb-three {
    width: 260px;
    height: 260px;
    background: #9333ea;
    bottom: -150px;
    left: 35%;
}

.op-grid-bg {
    position: absolute;
    inset: 0;
    opacity: .045;
    background-image:
        linear-gradient(#a5b4fc 1px, transparent 1px),
        linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
    background-size: 42px 42px;
}


/* HEADER */

.op-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 35px;
    animation: opFadeUp .6s ease both;
}

.op-heading-content {
    display: flex;
    align-items: center;
    gap: 17px;
}

.op-heading-icon {
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

.op-heading-icon:hover {
    transform: rotate(-6deg) scale(1.07);
}

.op-heading-label {
    color: #a78bfa;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 3px;
    margin: 0 0 6px;
}

.op-heading {
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

.op-subtitle {
    margin: 8px 0 0;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.6;
}

.op-refresh-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 43px;
    padding: 0 17px;
    border-radius: 10px;
    color: #c4b5fd;
    background: rgba(139,92,246,.13);
    border: 1px solid rgba(167,139,250,.25);
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
}

.op-refresh-btn:hover {
    color: white;
    background: rgba(139,92,246,.25);
    transform: translateY(-3px);
}

.op-refresh-btn:disabled {
    opacity: .5;
    cursor: not-allowed;
}


/* STATISTICS */

.op-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 19px;
    margin-bottom: 35px;
}

.op-stat-card {
    position: relative;
    overflow: hidden;
    padding: 23px;
    border: 1px solid rgba(148,163,184,.15);
    border-radius: 17px;
    background: linear-gradient(
        145deg,
        rgba(23,32,57,.88),
        rgba(15,23,42,.88)
    );
    transition: .3s ease;
    animation: opFadeUp .55s ease both;
}

.op-stat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(167,139,250,.35);
    box-shadow: 0 12px 30px rgba(0,0,0,.2);
}

.op-stat-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 22px;
}

.op-stat-icon {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    color: #c4b5fd;
    background: rgba(139,92,246,.17);
    border: 1px solid rgba(167,139,250,.23);
}

.op-stat-label {
    color: #94a3b8;
    font-size: 12px;
    font-weight: 650;
}

.op-stat-value {
    color: #f1f5f9;
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 850;
    letter-spacing: -1px;
    margin: 0;
    overflow-wrap: anywhere;
}

.op-stat-description {
    color: #64748b;
    font-size: 11px;
    margin: 9px 0 0;
}


/* SECTION HEADER */

.op-section-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.op-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #e2e8f0;
    font-size: 16px;
    font-weight: 750;
    margin: 0;
}

.op-section-title svg {
    color: #a78bfa;
}

.op-total-tag {
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


/* SEARCH */

.op-search-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
    padding: 0 15px;
    min-height: 48px;
    border: 1px solid rgba(148,163,184,.17);
    border-radius: 11px;
    background: rgba(15,23,42,.7);
    transition: .3s ease;
}

.op-search-container:focus-within {
    border-color: rgba(167,139,250,.55);
    box-shadow: 0 0 0 3px rgba(139,92,246,.08);
}

.op-search-container svg {
    color: #818cf8;
    flex-shrink: 0;
}

.op-search {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: #f1f5f9;
    font-size: 12px;
}

.op-search::placeholder {
    color: #64748b;
}


/* ORDER GRID */

.op-orders-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}


/* ORDER CARD */

.op-order-card {
    position: relative;
    overflow: hidden;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 22px;
    border: 1px solid rgba(148,163,184,.14);
    border-radius: 18px;
    background: linear-gradient(
        145deg,
        rgba(23,32,57,.88),
        rgba(15,23,42,.9)
    );
    box-shadow: 0 10px 30px rgba(0,0,0,.14);
    animation: opFadeUp .55s ease both;
    transition: .35s ease;
}

.op-order-card:hover {
    transform: translateY(-6px);
    border-color: rgba(167,139,250,.38);
    box-shadow: 0 18px 38px rgba(0,0,0,.25);
}

.op-order-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 21px;
}

.op-order-id {
    color: #c4b5fd;
    font-size: 13px;
    font-weight: 800;
    overflow-wrap: anywhere;
}

.op-order-date {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #64748b;
    font-size: 10px;
    margin-top: 7px;
}

.op-status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 11px;
    border-radius: 30px;
    color: #60a5fa;
    background: rgba(59,130,246,.1);
    border: 1px solid rgba(96,165,250,.2);
    font-size: 10px;
    font-weight: 750;
    white-space: nowrap;
}

.op-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
}

.op-order-info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 15px;
    margin-bottom: 21px;
}

.op-info-item {
    min-width: 0;
}

.op-info-label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #64748b;
    font-size: 10px;
    font-weight: 650;
    margin-bottom: 7px;
}

.op-info-label svg {
    color: #818cf8;
}

.op-info-value {
    color: #e2e8f0;
    font-size: 12px;
    font-weight: 700;
    overflow-wrap: anywhere;
}

.op-order-amount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 15px 0;
    border-top: 1px solid rgba(148,163,184,.12);
    border-bottom: 1px solid rgba(148,163,184,.12);
    margin-bottom: 17px;
}

.op-amount-label {
    color: #94a3b8;
    font-size: 11px;
    font-weight: 650;
}

.op-amount-value {
    color: #e9d5ff;
    font-size: 20px;
    font-weight: 850;
    letter-spacing: -.5px;
}

.op-payment {
    color: #86efac;
    font-size: 10px;
    font-weight: 750;
    padding: 6px 9px;
    border-radius: 7px;
    background: rgba(34,197,94,.1);
}

.op-payment-pending {
    color: #fcd34d;
    background: rgba(245,158,11,.1);
}


/* ACTION BUTTONS */

.op-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: auto;
}

.op-deliver-btn,
.op-back-btn {
    min-width: 0;
    min-height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 0 10px;
    border-radius: 10px;
    color: white;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
    transition: .3s ease;
}

.op-deliver-btn {
    background: linear-gradient(
        110deg,
        #059669,
        #10b981,
        #0d9488
    );
    border: 1px solid rgba(52,211,153,.3);
    box-shadow: 0 6px 18px rgba(16,185,129,.15);
}

.op-back-btn {
    background: rgba(139,92,246,.13);
    border: 1px solid rgba(167,139,250,.28);
    color: #c4b5fd;
}

.op-deliver-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(16,185,129,.3);
    filter: brightness(1.12);
}

.op-back-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    background: rgba(139,92,246,.25);
    color: white;
}

.op-deliver-btn:disabled,
.op-back-btn:disabled {
    opacity: .45;
    cursor: not-allowed;
}


/* MESSAGE / LOADING / ERROR */

.op-message {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 35px 20px;
    border: 1px solid rgba(148,163,184,.14);
    border-radius: 18px;
    background: rgba(15,23,42,.65);
}

.op-message-icon {
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

.op-message h3 {
    color: #e2e8f0;
    font-size: 17px;
    margin: 0 0 8px;
}

.op-message p {
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.7;
    margin: 0;
}

.op-loader {
    width: 32px;
    height: 32px;
    border: 3px solid rgba(167,139,250,.17);
    border-top-color: #a78bfa;
    border-radius: 50%;
    animation: opSpin .8s linear infinite;
    margin-bottom: 18px;
}

.op-error {
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
}


/* PAGINATION */

.op-pagination {
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
}

.op-page-info {
    color: #94a3b8;
    font-size: 11px;
}

.op-page-info strong {
    color: #c4b5fd;
}

.op-page-controls {
    display: flex;
    align-items: center;
    gap: 7px;
}

.op-page-btn {
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

.op-page-btn:hover:not(:disabled) {
    color: #ddd6fe;
    border-color: rgba(167,139,250,.45);
}

.op-page-btn.active {
    color: white;
    border-color: rgba(167,139,250,.5);
    background: linear-gradient(135deg,#7c3aed,#6366f1);
}

.op-page-btn:disabled {
    opacity: .35;
    cursor: not-allowed;
}


/* ANIMATIONS */

@keyframes opFadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes opFloat {
    from {
        transform: translate3d(0,0,0) scale(1);
    }

    to {
        transform: translate3d(20px,-20px,0) scale(1.12);
    }
}

@keyframes opSpin {
    to {
        transform: rotate(360deg);
    }
}


/* RESPONSIVE */

@media(max-width: 1100px) {
    .op-page {
        padding: 27px 24px 35px;
    }

    .op-orders-grid {
        grid-template-columns: 1fr;
    }
}

@media(max-width: 700px) {
    .op-page {
        padding: 21px 15px 30px;
    }

    .op-header {
        align-items: flex-start;
    }

    .op-heading-icon {
        width: 48px;
        height: 48px;
    }

    .op-heading {
        font-size: 25px;
    }

    .op-stats-grid {
        grid-template-columns: 1fr;
    }

    .op-refresh-btn {
        width: 100%;
    }

    .op-pagination {
        flex-direction: column;
        align-items: flex-start;
    }

    .op-page-controls {
        flex-wrap: wrap;
    }
}

@media(max-width: 420px) {
    .op-actions {
        grid-template-columns: 1fr;
    }
}

@media(prefers-reduced-motion: reduce) {
    .op-page *,
    .op-page *::before,
    .op-page *::after {
        animation: none !important;
        transition: none !important;
    }
}
`;


function AdminShipped() {

    const navigate = useNavigate()

    const [orders, setOrders] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);

    const [totalAmount, setTotalAmount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [updatingOrder, setUpdatingOrder] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const fetchShippedOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:8000/api/v1/order/orders/status/${"Shipped"}?page=${currentPage}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch shipped orders"
                );
            }

            setOrders(result.data.orders);
            setCurrentPage(result.data.currentPage);
            setTotalPages(result.data.totalPages);
            setTotalOrders(result.data.totalOrders);
            setTotalAmount(result.data.totalAmount);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchShippedOrders();

    }, [currentPage]);

    const handleUpdateOrderStatus = async (orderId, newStatus) => {

        try {

            setUpdatingOrder({
                orderId,
                status: newStatus
            });

            setError("");

            const response = await fetch(
                `http://localhost:8000/api/v1/order/orders/${orderId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        orderStatus: newStatus
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to update order status"
                );
            }

            await fetchShippedOrders();

        } catch (error) {

            setError(error.message);

        } finally {

            setUpdatingOrder(null);

        }

    };

    const filteredOrders = orders.filter((order) => {

        const search = searchTerm.trim().toLowerCase();

        const orderId = order._id?.toLowerCase() || "";

        const customerName =
            order.user?.username?.trim().toLowerCase() || "";

        const customerEmail =
            order.user?.email?.trim().toLowerCase() || "";

        return (
            orderId.includes(search) ||
            customerName.includes(search) ||
            customerEmail.includes(search)
        );

    });

    const getPageNumbers = () => {

        return Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );

    };

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(amount || 0);

    };


    const formatDate = (date) => {

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    };

    return (

        <>

            <style>{shippedStyles}</style>

            <div className="op-page">

                {/* BACKGROUND */}

                <div className="op-atmosphere">

                    <div className="op-orb op-orb-one"></div>

                    <div className="op-orb op-orb-two"></div>

                    <div className="op-orb op-orb-three"></div>

                    <div className="op-grid-bg"></div>

                </div>


                {/* HEADER */}

                <div className="op-header">

                    <div className="op-heading-content">

                        <div className="op-heading-icon">

                            <PackageCheck size={29} />

                        </div>

                        <div>

                            <p className="op-heading-label">
                                ADMINISTRATION
                            </p>

                            <h1 className="op-heading">
                                Shipped Orders
                            </h1>

                            <p className="op-subtitle">
                                Track shipped orders and manage their
                                delivery status.
                            </p>

                        </div>

                    </div>


                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap"
                    }}>

                        <button
                            className="op-refresh-btn"
                            onClick={() => fetchProcessingOrders(currentPage)}
                            disabled={loading}
                        >

                            <RefreshCw size={15} />

                            Refresh Orders

                        </button>

                        <button
                            className="op-refresh-btn"
                            onClick={() => navigate("/admin/order-managment")}
                        >

                            <Truck size={15} />

                            View PreProceesing Orders

                            <ArrowRight size={14} />

                        </button>


                        <button
                            className="op-refresh-btn"
                            onClick={() => navigate("/your-shipped-route")}
                        >

                            <Truck size={15} />

                            View Delivered Orders

                            <ArrowRight size={14} />

                        </button>

                    </div>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="op-error">

                        <Sparkles size={17} />

                        {error}

                    </div>

                )}


                {/* STATISTICS */}

                <div className="op-stats-grid">

                    <div className="op-stat-card">

                        <div className="op-stat-top">

                            <span className="op-stat-label">
                                Shipped Orders
                            </span>

                            <div className="op-stat-icon">
                                <Truck size={23} />
                            </div>

                        </div>

                        <h2 className="op-stat-value">
                            {totalOrders}
                        </h2>

                        <p className="op-stat-description">
                            Orders currently in transit
                        </p>

                    </div>


                    <div className="op-stat-card">

                        <div className="op-stat-top">

                            <span className="op-stat-label">
                                Total Order Amount
                            </span>

                            <div className="op-stat-icon">
                                <IndianRupee size={23} />
                            </div>

                        </div>

                        <h2 className="op-stat-value">
                            {formatCurrency(totalAmount)}
                        </h2>

                        <p className="op-stat-description">
                            Combined value of shipped orders
                        </p>

                    </div>

                </div>


                {/* SECTION HEADER */}

                <div className="op-section-top">

                    <h2 className="op-section-title">

                        <Boxes size={19} />

                        Shipped Orders

                    </h2>


                    <div className="op-total-tag">

                        <Truck size={14} />

                        {totalOrders} Orders Shipped

                    </div>

                </div>


                {/* SEARCH */}

                <div className="op-search-container">

                    <Search size={17} />

                    <input
                        type="text"
                        className="op-search"
                        placeholder="Search by order ID, customer name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>


                {/* LOADING */}

                {loading ? (

                    <div className="op-message">

                        <div className="op-loader"></div>

                        <h3>Loading Shipped Orders</h3>

                        <p>
                            Fetching your shipped orders. Please wait...
                        </p>

                    </div>

                ) : filteredOrders.length === 0 ? (

                    /* EMPTY STATE */

                    <div className="op-message">

                        <div className="op-message-icon">

                            <ShoppingBag size={29} />

                        </div>

                        <h3>
                            {searchTerm
                                ? "No Matching Orders Found"
                                : "No Shipped Orders"}
                        </h3>

                        <p>
                            {searchTerm
                                ? "Try searching with a different order ID or customer name."
                                : "There are currently no orders in the shipped section."}
                        </p>

                    </div>

                ) : (

                    /* ORDER CARDS */

                    <div className="op-orders-grid">

                        {filteredOrders.map((order, index) => (

                            <div
                                className="op-order-card"
                                key={order._id}
                                style={{
                                    animationDelay: `${index * 0.08}s`
                                }}
                            >

                                {/* ORDER TOP */}

                                <div className="op-order-top">

                                    <div>

                                        <div className="op-order-id">
                                            Order #{order._id}
                                        </div>

                                        <div className="op-order-date">

                                            <CalendarDays size={12} />

                                            {formatDate(order.createdAt)}

                                        </div>

                                    </div>


                                    <span className="op-status">

                                        <span className="op-status-dot"></span>

                                        Shipped

                                    </span>

                                </div>


                                {/* ORDER DETAILS */}

                                <div className="op-order-info">

                                    <div className="op-info-item">

                                        <div className="op-info-label">

                                            <User size={12} />

                                            Customer

                                        </div>

                                        <div className="op-info-value">

                                            {order.user?.username || "Unknown"}

                                        </div>

                                    </div>


                                    <div className="op-info-item">

                                        <div className="op-info-label">

                                            <ShoppingBag size={12} />

                                            Total Items

                                        </div>

                                        <div className="op-info-value">

                                            {order.orderItems?.reduce(
                                                (total, item) =>
                                                    total + (item.quantity || 0),
                                                0
                                            ) || 0}

                                        </div>

                                    </div>


                                    <div className="op-info-item">

                                        <div className="op-info-label">

                                            <Truck size={12} />

                                            Payment Method

                                        </div>

                                        <div className="op-info-value">

                                            {order.paymentMethod || "N/A"}

                                        </div>

                                    </div>


                                    <div className="op-info-item">

                                        <div className="op-info-label">

                                            <IndianRupee size={12} />

                                            Payment Status

                                        </div>

                                        <div className="op-info-value">

                                            <span className={`op-payment ${order.isPaid
                                                    ? ""
                                                    : "op-payment-pending"
                                                }`}>

                                                {order.isPaid
                                                    ? "Paid"
                                                    : "Pending"}

                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* AMOUNT */}

                                <div className="op-order-amount">

                                    <span className="op-amount-label">
                                        Total Order Amount
                                    </span>

                                    <span className="op-amount-value">

                                        {formatCurrency(order.totalPrice)}

                                    </span>

                                </div>


                                {/* ACTION BUTTONS */}

                                <div className="op-actions">

                                    {/* MOVE TO PROCESSING */}

                                    <button
                                        className="op-back-btn"
                                        onClick={() =>
                                            handleUpdateOrderStatus(
                                                order._id,
                                                "Processing"
                                            )
                                        }
                                        disabled={
                                            updatingOrder?.orderId === order._id
                                        }
                                    >

                                        <ArrowLeft size={15} />

                                        {updatingOrder?.orderId === order._id &&
                                            updatingOrder?.status === "Processing"
                                            ? "Moving Back..."
                                            : "To Processing"}

                                    </button>


                                    {/* MARK AS DELIVERED */}

                                    <button
                                        className="op-deliver-btn"
                                        onClick={() =>
                                            handleUpdateOrderStatus(
                                                order._id,
                                                "Delivered"
                                            )
                                        }
                                        disabled={
                                            updatingOrder?.orderId === order._id
                                        }
                                    >

                                        <PackageCheck size={15} />

                                        {updatingOrder?.orderId === order._id &&
                                            updatingOrder?.status === "Delivered"
                                            ? "Updating..."
                                            : "Delivered"}

                                        <ArrowRight size={14} />

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* PAGINATION */}

                {!loading && totalPages > 1 && (

                    <div className="op-pagination">

                        <div className="op-page-info">

                            Showing{" "}

                            <strong>{filteredOrders.length}</strong>

                            {" "}orders on page{" "}

                            <strong>{currentPage}</strong>

                            {" "}of{" "}

                            <strong>{totalPages}</strong>

                        </div>


                        <div className="op-page-controls">

                            <button
                                className="op-page-btn"
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
                                    className={`op-page-btn ${currentPage === page ? "active" : ""
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >

                                    {page}

                                </button>

                            ))}


                            <button
                                className="op-page-btn"
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

            </div>

        </>

    );

}

export default AdminShipped;
