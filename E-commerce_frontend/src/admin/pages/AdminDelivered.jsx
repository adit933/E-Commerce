
import React, { useState } from "react";
import { useEffect } from "react";
import {
    Package,
    Truck,
    ShoppingBag,
    IndianRupee,
    Search,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    ArrowRight,
    User,
    CalendarDays,
    Boxes,
    Sparkles,
    PackageCheck,
    CheckCircle2,
    CreditCard,
    LayoutDashboard
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const LIMIT = 6;


const orderDeliveredStyles = `

.od-page {
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

.od-page * {
    box-sizing: border-box;
    font-family: inherit;
}

/* BACKGROUND */

.od-atmosphere {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.od-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(85px);
    opacity: .17;
    animation: odFloat 12s ease-in-out infinite alternate;
}

.od-orb-one {
    width: 350px;
    height: 350px;
    background: #059669;
    top: -170px;
    left: 8%;
}

.od-orb-two {
    width: 300px;
    height: 300px;
    background: #2563eb;
    top: 45%;
    right: -180px;
}

.od-orb-three {
    width: 260px;
    height: 260px;
    background: #10b981;
    bottom: -150px;
    left: 35%;
}

.od-grid-bg {
    position: absolute;
    inset: 0;
    opacity: .045;
    background-image:
        linear-gradient(#a5b4fc 1px, transparent 1px),
        linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
    background-size: 42px 42px;
}

/* HEADER */

.od-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 35px;
    animation: odFadeUp .6s ease both;
}

.od-heading-content {
    display: flex;
    align-items: center;
    gap: 17px;
}

.od-heading-icon {
    width: 59px;
    height: 59px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 17px;
    color: #a7f3d0;
    background: linear-gradient(
        135deg,
        rgba(16,185,129,.32),
        rgba(59,130,246,.2)
    );
    border: 1px solid rgba(110,231,183,.28);
    box-shadow: 0 8px 25px rgba(16,185,129,.15);
    transition: .3s ease;
}

.od-heading-icon:hover {
    transform: rotate(-6deg) scale(1.07);
}

.od-heading-label {
    color: #6ee7b7;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 3px;
    margin: 0 0 6px;
}

.od-heading {
    font-size: clamp(27px, 3vw, 36px);
    font-weight: 850;
    letter-spacing: -1px;
    margin: 0;
    background: linear-gradient(
        110deg,
        #a7f3d0,
        #60a5fa,
        #c4b5fd
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.od-subtitle {
    margin: 8px 0 0;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.6;
}

.od-header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.od-refresh-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 43px;
    padding: 0 15px;
    border-radius: 10px;
    color: #a7f3d0;
    background: rgba(16,185,129,.12);
    border: 1px solid rgba(110,231,183,.25);
    font-size: 11px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
}

.od-refresh-btn:hover {
    color: white;
    background: rgba(16,185,129,.25);
    transform: translateY(-3px);
}

.od-refresh-btn:disabled {
    opacity: .5;
    cursor: not-allowed;
}

.od-nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 43px;
    padding: 0 15px;
    border-radius: 10px;
    color: #c4b5fd;
    background: rgba(139,92,246,.13);
    border: 1px solid rgba(167,139,250,.25);
    font-size: 11px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
}

.od-nav-btn:hover {
    color: white;
    background: rgba(139,92,246,.25);
    transform: translateY(-3px);
}

/* STATISTICS */

.od-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 19px;
    margin-bottom: 35px;
}

.od-stat-card {
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
    animation: odFadeUp .55s ease both;
}

.od-stat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(110,231,183,.35);
    box-shadow: 0 12px 30px rgba(0,0,0,.2);
}

.od-stat-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 22px;
}

.od-stat-icon {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    color: #a7f3d0;
    background: rgba(16,185,129,.17);
    border: 1px solid rgba(110,231,183,.23);
}

.od-stat-label {
    color: #94a3b8;
    font-size: 12px;
    font-weight: 650;
}

.od-stat-value {
    color: #f1f5f9;
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 850;
    letter-spacing: -1px;
    margin: 0;
    overflow-wrap: anywhere;
}

.od-stat-description {
    color: #64748b;
    font-size: 11px;
    margin: 9px 0 0;
}

/* SECTION HEADER */

.od-section-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.od-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #e2e8f0;
    font-size: 16px;
    font-weight: 750;
    margin: 0;
}

.od-section-title svg {
    color: #6ee7b7;
}

.od-total-tag {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border: 1px solid rgba(110,231,183,.2);
    border-radius: 10px;
    background: rgba(16,185,129,.1);
    color: #a7f3d0;
    font-size: 11px;
    font-weight: 700;
}

/* SEARCH */

.od-search-container {
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

.od-search-container:focus-within {
    border-color: rgba(110,231,183,.55);
    box-shadow: 0 0 0 3px rgba(16,185,129,.08);
}

.od-search-container svg {
    color: #6ee7b7;
    flex-shrink: 0;
}

.od-search {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: #f1f5f9;
    font-size: 12px;
}

.od-search::placeholder {
    color: #64748b;
}

/* ORDER GRID */

.od-orders-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

/* ORDER CARD */

.od-order-card {
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
    animation: odFadeUp .55s ease both;
    transition: .35s ease;
}

.od-order-card:hover {
    transform: translateY(-6px);
    border-color: rgba(110,231,183,.38);
    box-shadow: 0 18px 38px rgba(0,0,0,.25);
}

.od-order-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 21px;
}

.od-order-id {
    color: #a7f3d0;
    font-size: 13px;
    font-weight: 800;
    overflow-wrap: anywhere;
}

.od-order-date {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #64748b;
    font-size: 10px;
    margin-top: 7px;
}

.od-status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 11px;
    border-radius: 30px;
    color: #86efac;
    background: rgba(34,197,94,.1);
    border: 1px solid rgba(74,222,128,.2);
    font-size: 10px;
    font-weight: 750;
    white-space: nowrap;
}

.od-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
}

.od-order-info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 15px;
    margin-bottom: 21px;
}

.od-info-item {
    min-width: 0;
}

.od-info-label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #64748b;
    font-size: 10px;
    font-weight: 650;
    margin-bottom: 7px;
}

.od-info-label svg {
    color: #6ee7b7;
}

.od-info-value {
    color: #e2e8f0;
    font-size: 12px;
    font-weight: 700;
    overflow-wrap: anywhere;
}

.od-order-amount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 15px 0;
    border-top: 1px solid rgba(148,163,184,.12);
    border-bottom: 1px solid rgba(148,163,184,.12);
    margin-top: auto;
}

.od-amount-label {
    color: #94a3b8;
    font-size: 11px;
    font-weight: 650;
}

.od-amount-value {
    color: #a7f3d0;
    font-size: 20px;
    font-weight: 850;
    letter-spacing: -.5px;
}

.od-payment {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #86efac;
    font-size: 10px;
    font-weight: 750;
    padding: 6px 9px;
    border-radius: 7px;
    background: rgba(34,197,94,.1);
}

.od-payment-pending {
    color: #fcd34d;
    background: rgba(245,158,11,.1);
}

/* MESSAGE / LOADING / ERROR */

.od-message {
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

.od-message-icon {
    width: 65px;
    height: 65px;
    display: grid;
    place-items: center;
    margin-bottom: 18px;
    border-radius: 19px;
    color: #a7f3d0;
    background: rgba(16,185,129,.15);
    border: 1px solid rgba(110,231,183,.2);
}

.od-message h3 {
    color: #e2e8f0;
    font-size: 17px;
    margin: 0 0 8px;
}

.od-message p {
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.7;
    margin: 0;
}

.od-loader {
    width: 32px;
    height: 32px;
    border: 3px solid rgba(110,231,183,.17);
    border-top-color: #6ee7b7;
    border-radius: 50%;
    animation: odSpin .8s linear infinite;
    margin-bottom: 18px;
}

.od-error {
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

.od-pagination {
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

.od-page-info {
    color: #94a3b8;
    font-size: 11px;
}

.od-page-info strong {
    color: #a7f3d0;
}

.od-page-controls {
    display: flex;
    align-items: center;
    gap: 7px;
}

.od-page-btn {
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

.od-page-btn:hover:not(:disabled) {
    color: #a7f3d0;
    border-color: rgba(110,231,183,.45);
}

.od-page-btn.active {
    color: white;
    border-color: rgba(110,231,183,.5);
    background: linear-gradient(135deg,#059669,#2563eb);
}

.od-page-btn:disabled {
    opacity: .35;
    cursor: not-allowed;
}

.od-mark-paid-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 9px;
    padding: 7px 11px;
    border-radius: 7px;
    border: 1px solid rgba(110,231,183,.3);
    background: rgba(16,185,129,.13);
    color: #6ee7b7;
    font-size: 10px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
}

.od-mark-paid-btn:hover:not(:disabled) {
    background: rgba(16,185,129,.28);
    color: white;
    transform: translateY(-2px);
}

.od-mark-paid-btn:disabled {
    opacity: .5;
    cursor: not-allowed;
}

/* ANIMATIONS */

@keyframes odFadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes odFloat {
    from {
        transform: translate3d(0,0,0) scale(1);
    }

    to {
        transform: translate3d(20px,-20px,0) scale(1.12);
    }
}

@keyframes odSpin {
    to {
        transform: rotate(360deg);
    }
}

/* RESPONSIVE */

@media(max-width: 1100px) {

    .od-page {
        padding: 27px 24px 35px;
    }

    .od-orders-grid {
        grid-template-columns: 1fr;
    }
}

@media(max-width: 700px) {

    .od-page {
        padding: 21px 15px 30px;
    }

    .od-header {
        align-items: flex-start;
    }

    .od-heading-icon {
        width: 48px;
        height: 48px;
    }

    .od-heading {
        font-size: 25px;
    }

    .od-stats-grid {
        grid-template-columns: 1fr;
    }

    .od-header-actions {
        width: 100%;
    }

    .od-header-actions button {
        flex: 1;
    }

    .od-pagination {
        flex-direction: column;
        align-items: flex-start;
    }

    .od-page-controls {
        flex-wrap: wrap;
    }
}

@media(prefers-reduced-motion: reduce) {

    .od-page *,
    .od-page *::before,
    .od-page *::after {
        animation: none !important;
        transition: none !important;
    }
}
`;


function AdminDelivered() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);

    const [totalAmount, setTotalAmount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [updatingPaymentId, setUpdatingPaymentId] = useState(null);


    const fetchDeliveredOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:8000/api/v1/order/orders/status/${"Delivered"}?page=${currentPage}`,
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
                    result.message || "Failed to fetch delivered orders"
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

    const markPaymentAsPaid = async (orderId) => {

        try {

            setUpdatingPaymentId(orderId);
            setError("");

            const response = await fetch(
                `http://localhost:8000/api/v1/order/orders/paid/${orderId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to update payment status"
                );
            }

            // Update the particular order in the frontend
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId
                        ? { ...order, isPaid: true, paidAt: result.data.paidAt }
                        : order
                )
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setUpdatingPaymentId(null);

        }

    };


    useEffect(() => {

        fetchDeliveredOrders();

    }, [currentPage]);


    const filteredOrders = orders.filter((order) => {

        const search = searchTerm?.trim().toLowerCase();

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

            <style>{orderDeliveredStyles}</style>

            <div className="od-page">

                {/* BACKGROUND */}

                <div className="od-atmosphere">

                    <div className="od-orb od-orb-one"></div>

                    <div className="od-orb od-orb-two"></div>

                    <div className="od-orb od-orb-three"></div>

                    <div className="od-grid-bg"></div>

                </div>


                {/* HEADER */}

                <div className="od-header">

                    <div className="od-heading-content">

                        <div className="od-heading-icon">

                            <PackageCheck size={29} />

                        </div>

                        <div>

                            <p className="od-heading-label">
                                ADMINISTRATION
                            </p>

                            <h1 className="od-heading">
                                Delivered Orders
                            </h1>

                            <p className="od-subtitle">
                                Monitor completed deliveries and track
                                your total earnings.
                            </p>

                        </div>

                    </div>


                    <div className="od-header-actions">

                        <button
                            className="od-refresh-btn"
                            onClick={() => fetchDeliveredOrders()}
                            disabled={loading}
                        >

                            <RefreshCw size={15} />

                            Refresh Orders

                        </button>

                        <button
                            className="od-nav-btn"
                            onClick={() => navigate("/admin/order-management")}
                        >

                            <LayoutDashboard size={15} />

                            Order Management

                            <ArrowRight size={14} />

                        </button>

                        <button
                            className="od-nav-btn"
                            onClick={() => navigate("/admin/shipped-order")}
                        >

                            <Truck size={15} />

                            Shipped Orders

                            <ArrowRight size={14} />

                        </button>

                    </div>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="od-error">

                        <Sparkles size={17} />

                        {error}

                    </div>

                )}


                {/* STATISTICS */}

                <div className="od-stats-grid">

                    <div className="od-stat-card">

                        <div className="od-stat-top">

                            <span className="od-stat-label">
                                Total Delivered Orders
                            </span>

                            <div className="od-stat-icon">

                                <PackageCheck size={23} />

                            </div>

                        </div>

                        <h2 className="od-stat-value">
                            {totalOrders}
                        </h2>

                        <p className="od-stat-description">
                            Successfully completed orders
                        </p>

                    </div>


                    <div className="od-stat-card">

                        <div className="od-stat-top">

                            <span className="od-stat-label">
                                Total Amount Earned
                            </span>

                            <div className="od-stat-icon">

                                <IndianRupee size={23} />

                            </div>

                        </div>

                        <h2 className="od-stat-value">
                            {formatCurrency(totalAmount)}
                        </h2>

                        <p className="od-stat-description">
                            Combined value of delivered orders
                        </p>

                    </div>

                </div>


                {/* SECTION HEADER */}

                <div className="od-section-top">

                    <h2 className="od-section-title">

                        <Boxes size={19} />

                        Delivered Orders

                    </h2>


                    <div className="od-total-tag">

                        <CheckCircle2 size={14} />

                        {totalOrders} Successfully Delivered

                    </div>

                </div>


                {/* SEARCH */}

                <div className="od-search-container">

                    <Search size={17} />

                    <input
                        type="text"
                        className="od-search"
                        placeholder="Search by order ID, customer name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>


                {/* LOADING */}

                {loading ? (

                    <div className="od-message">

                        <div className="od-loader"></div>

                        <h3>Loading Delivered Orders</h3>

                        <p>
                            Fetching your completed orders. Please wait...
                        </p>

                    </div>

                ) : filteredOrders.length === 0 ? (

                    /* EMPTY STATE */

                    <div className="od-message">

                        <div className="od-message-icon">

                            <ShoppingBag size={29} />

                        </div>

                        <h3>
                            {searchTerm
                                ? "No Matching Orders Found"
                                : "No Delivered Orders"}
                        </h3>

                        <p>
                            {searchTerm
                                ? "Try searching with a different order ID or customer name."
                                : "There are currently no completed deliveries. Delivered orders will appear here."}
                        </p>

                    </div>

                ) : (

                    /* ORDER CARDS */

                    <div className="od-orders-grid">

                        {filteredOrders.map((order, index) => (

                            <div
                                className="od-order-card"
                                key={order._id}
                                style={{
                                    animationDelay: `${index * 0.08}s`
                                }}
                            >

                                {/* ORDER TOP */}

                                <div className="od-order-top">

                                    <div>

                                        <div className="od-order-id">

                                            Order #{order._id}

                                        </div>

                                        <div className="od-order-date">

                                            <CalendarDays size={12} />

                                            {formatDate(order.createdAt)}

                                        </div>

                                    </div>


                                    <span className="od-status">

                                        <span className="od-status-dot"></span>

                                        Delivered

                                    </span>

                                </div>


                                {/* ORDER DETAILS */}

                                <div className="od-order-info">

                                    <div className="od-info-item">

                                        <div className="od-info-label">

                                            <User size={12} />

                                            Customer

                                        </div>

                                        <div className="od-info-value">

                                            {order.user?.username || "Unknown"}

                                        </div>

                                    </div>


                                    <div className="od-info-item">

                                        <div className="od-info-label">

                                            <ShoppingBag size={12} />

                                            Total Items

                                        </div>

                                        <div className="od-info-value">

                                            {order.orderItems?.reduce(
                                                (total, item) =>
                                                    total + (item.quantity || 0),
                                                0
                                            ) || 0}

                                        </div>

                                    </div>


                                    <div className="od-info-item">

                                        <div className="od-info-label">

                                            <CreditCard size={12} />

                                            Payment Method

                                        </div>

                                        <div className="od-info-value">

                                            {order.paymentMethod || "N/A"}

                                        </div>

                                    </div>


                                    <div className="od-info-item">

                                        <div className="od-info-label">

                                            <IndianRupee size={12} />

                                            Payment Status

                                        </div>

                                        <div className="od-info-value">

                                            <span className={`od-payment ${order.isPaid
                                                    ? ""
                                                    : "od-payment-pending"
                                                }`}>

                                                <CheckCircle2 size={12} />

                                                {order.isPaid
                                                    ? "Paid"
                                                    : "Pending"}

                                            </span>


                                            {/* Show Mark as Paid only for unpaid COD orders */}

                                            {order.paymentMethod === "COD" && !order.isPaid && (

                                                <button
                                                    className="od-mark-paid-btn"
                                                    disabled={updatingPaymentId === order._id}
                                                    onClick={() => markPaymentAsPaid(order._id)}
                                                >

                                                    {updatingPaymentId === order._id ? (

                                                        <>
                                                            <RefreshCw size={12} />
                                                            Updating...
                                                        </>

                                                    ) : (

                                                        <>
                                                            <CheckCircle2 size={12} />
                                                            Mark as Paid
                                                        </>

                                                    )}

                                                </button>

                                            )}

                                        </div>

                                    </div>

                                </div>


                                {/* ORDER AMOUNT */}

                                <div className="od-order-amount">

                                    <span className="od-amount-label">
                                        Total Order Amount
                                    </span>

                                    <span className="od-amount-value">

                                        {formatCurrency(order.totalPrice)}

                                    </span>

                                </div>


                            </div>

                        ))}

                    </div>

                )}


                {/* PAGINATION */}

                {!loading && totalPages > 1 && (

                    <div className="od-pagination">

                        <div className="od-page-info">

                            Showing{" "}

                            <strong>{filteredOrders.length}</strong>

                            {" "}orders on page{" "}

                            <strong>{currentPage}</strong>

                            {" "}of{" "}

                            <strong>{totalPages}</strong>

                        </div>


                        <div className="od-page-controls">

                            <button
                                className="od-page-btn"
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
                                    className={`od-page-btn ${currentPage === page ? "active" : ""
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >

                                    {page}

                                </button>

                            ))}


                            <button
                                className="od-page-btn"
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

export default AdminDelivered;
