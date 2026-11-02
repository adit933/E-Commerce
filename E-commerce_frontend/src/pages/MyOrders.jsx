
import React, { useEffect, useState } from "react";

const myOrdersStyles = `

.myorders-shell {
    position: relative;
    isolation: isolate;
    min-height: 100vh;
    overflow: hidden;
    color: #f8fafc;
    background:
        radial-gradient(ellipse at 50% -15%, #30205a 0%, transparent 50%),
        linear-gradient(145deg, #080914, #0b1020 48%, #0a0b16);
}

.myorders-atmosphere {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.myorders-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(95px);
    opacity: .19;
    animation: orderFloat 13s ease-in-out infinite alternate;
}

.myorders-orb-one {
    width: 360px;
    height: 360px;
    background: #7c3aed;
    top: 100px;
    left: -170px;
}

.myorders-orb-two {
    width: 400px;
    height: 400px;
    background: #2563eb;
    top: 650px;
    right: -190px;
    animation-delay: -5s;
}

.myorders-grid {
    position: absolute;
    inset: 0;
    opacity: .045;
    background-image:
        linear-gradient(#a5b4fc 1px, transparent 1px),
        linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
    background-size: 55px 55px;
    mask-image: linear-gradient(to bottom, black, transparent 85%);
}

.myorders-container {
    position: relative;
    width: 100%;
    max-width: 1150px;
    margin: auto;
    padding: 65px 25px 90px;
}

/* Hero section */

.myorders-hero {
    animation: orderFadeUp .7s both;
}

.myorders-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 8px 15px;
    border: 1px solid rgba(167,139,250,.25);
    border-radius: 999px;
    background: rgba(139,92,246,.09);
    color: #c4b5fd;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.6px;
    text-transform: uppercase;
}

.myorders-title {
    margin-top: 22px;
    font-size: clamp(2.6rem, 6vw, 4.4rem);
    font-weight: 850;
    letter-spacing: -2.5px;
    line-height: 1.1;
}

.myorders-gradient {
    background: linear-gradient(110deg, #c4b5fd, #60a5fa, #e879f9);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.myorders-subtitle {
    max-width: 550px;
    margin-top: 16px;
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.8;
}

/* Order count */

.myorders-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-top: 48px;
    margin-bottom: 22px;
    animation: orderFadeUp .8s both;
}

.myorders-toolbar h2 {
    color: #f1f5f9;
    font-size: 18px;
    font-weight: 750;
}

.myorders-count {
    padding: 8px 14px;
    border: 1px solid rgba(167,139,250,.22);
    border-radius: 999px;
    background: rgba(139,92,246,.1);
    color: #c4b5fd;
    font-size: 11px;
    font-weight: 750;
}

/* Order card */

.myorders-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.myorder-card {
    position: relative;
    padding: 27px;
    overflow: hidden;
    border: 1px solid rgba(196,181,253,.13);
    border-radius: 24px;
    background:
        radial-gradient(circle at 100% 0%, rgba(139,92,246,.10), transparent 42%),
        linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.018));
    backdrop-filter: blur(18px);
    box-shadow: 0 18px 45px rgba(0,0,0,.17);
    animation: orderFadeUp .65s both;
    transition: border-color .3s, transform .3s, box-shadow .3s;
}

.myorder-card:hover {
    transform: translateY(-4px);
    border-color: rgba(167,139,250,.32);
    box-shadow: 0 25px 55px rgba(0,0,0,.25);
}

.myorder-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #60a5fa, transparent);
    opacity: .7;
}

.myorder-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    flex-wrap: wrap;
}

.myorder-id-label {
    color: #64748b;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.3px;
}

.myorder-id {
    margin-top: 8px;
    color: #e2e8f0;
    font-size: 14px;
    font-weight: 750;
    overflow-wrap: anywhere;
}

.myorder-date {
    margin-top: 8px;
    color: #94a3b8;
    font-size: 12px;
}

/* Status badges */

.myorder-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border: 1px solid;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 750;
    white-space: nowrap;
}

.myorder-status::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 9px currentColor;
}

.status-processing {
    color: #fcd34d;
    background: rgba(245,158,11,.08);
    border-color: rgba(245,158,11,.24);
}

.status-shipped {
    color: #93c5fd;
    background: rgba(59,130,246,.09);
    border-color: rgba(59,130,246,.25);
}

.status-delivered {
    color: #6ee7b7;
    background: rgba(16,185,129,.08);
    border-color: rgba(16,185,129,.25);
}

.status-cancelled {
    color: #fca5a5;
    background: rgba(239,68,68,.08);
    border-color: rgba(239,68,68,.25);
}

.myorder-divider {
    height: 1px;
    margin: 24px 0;
    background: rgba(196,181,253,.12);
}

/* Products */

.myorder-section-title {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 16px;
    color: #e2e8f0;
    font-size: 14px;
    font-weight: 750;
}

.myorder-section-title span {
    color: #a78bfa;
    font-size: 16px;
}

.myorder-product {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid rgba(196,181,253,.08);
}

.myorder-product:first-of-type {
    padding-top: 0;
}

.myorder-product:last-child {
    padding-bottom: 0;
    border-bottom: none;
}

.myorder-product-left {
    display: flex;
    align-items: center;
    gap: 13px;
    min-width: 0;
}

.myorder-product-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43px;
    height: 43px;
    flex-shrink: 0;
    border: 1px solid rgba(167,139,250,.2);
    border-radius: 14px;
    background: rgba(139,92,246,.11);
    color: #c4b5fd;
    font-size: 13px;
    font-weight: 750;
}

.myorder-product-name {
    color: #f1f5f9;
    font-size: 13px;
    font-weight: 700;
    overflow-wrap: anywhere;
}

.myorder-product-quantity {
    margin-top: 6px;
    color: #64748b;
    font-size: 11px;
}

.myorder-product-price {
    flex-shrink: 0;
    color: #e2e8f0;
    font-size: 13px;
    font-weight: 750;
}

/* Information */

.myorder-info-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 13px;
}

.myorder-info-box {
    padding: 16px;
    border: 1px solid rgba(167,139,250,.12);
    border-radius: 15px;
    background: rgba(139,92,246,.045);
    transition: background .25s, border-color .25s;
}

.myorder-info-box:hover {
    background: rgba(139,92,246,.09);
    border-color: rgba(167,139,250,.25);
}

.myorder-info-label {
    color: #64748b;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1px;
}

.myorder-info-value {
    margin-top: 10px;
    color: #e2e8f0;
    font-size: 13px;
    font-weight: 700;
}

.myorder-paid {
    color: #6ee7b7;
}

.myorder-pending {
    color: #fcd34d;
}

.myorder-total {
    color: #c4b5fd;
    font-size: 19px;
}

/* Address */

.myorder-address {
    padding: 19px;
    border: 1px solid rgba(167,139,250,.15);
    border-radius: 17px;
    background:
        linear-gradient(120deg, rgba(139,92,246,.075), rgba(59,130,246,.035));
}

.myorder-address-name {
    margin-bottom: 9px;
    color: #f1f5f9;
    font-size: 14px;
    font-weight: 750;
}

.myorder-address p {
    margin-top: 5px;
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.7;
}

/* Loading, error and empty states */

.myorders-state {
    display: flex;
    min-height: 390px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 35px;
    border: 1px solid rgba(196,181,253,.14);
    border-radius: 25px;
    background: rgba(255,255,255,.035);
    text-align: center;
    animation: orderFadeUp .6s both;
}

.myorders-state-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 75px;
    margin-bottom: 22px;
    border: 1px solid rgba(167,139,250,.25);
    border-radius: 23px;
    background: rgba(139,92,246,.13);
    color: #c4b5fd;
    font-size: 30px;
}

.myorders-state h2 {
    color: #f8fafc;
    font-size: 22px;
    font-weight: 800;
}

.myorders-state p {
    max-width: 400px;
    margin-top: 11px;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.8;
}

.myorders-retry {
    margin-top: 23px;
    padding: 12px 23px;
    border: 1px solid rgba(167,139,250,.3);
    border-radius: 12px;
    background: linear-gradient(110deg, #7c3aed, #4f46e5);
    color: white;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: .25s;
}

.myorders-retry:hover {
    transform: translateY(-2px);
    filter: brightness(1.12);
}

.myorders-loading-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 22px 4px 0;
    border-radius: 50%;
    background: #a78bfa;
    animation: orderPulse .8s infinite alternate;
}

.myorders-loading-dot:nth-child(2) {
    animation-delay: .2s;
}

.myorders-loading-dot:nth-child(3) {
    animation-delay: .4s;
}

/* Animations */

@keyframes orderFloat {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(25px, -25px) scale(1.1); }
}

@keyframes orderFadeUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes orderPulse {
    from {
        opacity: .3;
        transform: translateY(0);
    }
    to {
        opacity: 1;
        transform: translateY(-5px);
    }
}

/* Responsive */

@media (max-width: 650px) {

    .myorders-container {
        padding: 42px 17px 65px;
    }

    .myorders-title {
        letter-spacing: -1.5px;
    }

    .myorders-toolbar {
        margin-top: 35px;
    }

    .myorder-card {
        padding: 21px;
        border-radius: 19px;
    }

    .myorder-info-grid {
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .myorder-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    .myorder-info-value {
        margin-top: 0;
        text-align: right;
    }

    .myorder-total {
        font-size: 16px;
    }
}

@media (max-width: 420px) {

    .myorder-header {
        flex-direction: column;
    }

    .myorder-id {
        font-size: 12px;
    }

    .myorder-product {
        gap: 8px;
    }

    .myorder-product-left {
        gap: 9px;
    }

    .myorder-product-number {
        width: 35px;
        height: 35px;
    }

    .myorder-product-name {
        font-size: 11px;
    }

    .myorder-product-price {
        font-size: 11px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .myorders-orb,
    .myorders-hero,
    .myorder-card,
    .myorders-state,
    .myorders-loading-dot {
        animation: none !important;
    }

    .myorder-card,
    .myorder-info-box,
    .myorders-retry {
        transition: none !important;
    }
}

`;

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8000/api/v1/order/orders",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to fetch your orders."
                );
            }

            setOrders(Array.isArray(result.data) ? result.data : []);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Processing":
                return "status-processing";
            case "Shipped":
                return "status-shipped";
            case "Delivered":
                return "status-delivered";
            case "Cancelled":
                return "status-cancelled";
            default:
                return "";
        }
    };

    return (
        <>
            <style>{myOrdersStyles}</style>

            <main className="myorders-shell">

                {/* Background atmosphere */}
                <div className="myorders-atmosphere">
                    <div className="myorders-orb myorders-orb-one"></div>
                    <div className="myorders-orb myorders-orb-two"></div>
                    <div className="myorders-grid"></div>
                </div>

                <div className="myorders-container">

                    {/* Hero */}
                    <section className="myorders-hero">

                        <span className="myorders-eyebrow">
                            ✦ &nbsp; YOUR PURCHASES
                        </span>

                        <h1 className="myorders-title">
                            My <span className="myorders-gradient">Orders</span>
                        </h1>

                        <p className="myorders-subtitle">
                            Everything you've ordered, all in one place.
                            Follow your purchases and stay updated on their
                            journey to your doorstep.
                        </p>

                    </section>

                    {/* Loading */}
                    {loading && (
                        <div className="myorders-state">
                            <div className="myorders-state-icon">◌</div>

                            <h2>Gathering Your Orders</h2>

                            <p>
                                We're getting your purchase history ready.
                                This will only take a moment.
                            </p>

                            <div>
                                <span className="myorders-loading-dot"></span>
                                <span className="myorders-loading-dot"></span>
                                <span className="myorders-loading-dot"></span>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="myorders-state">

                            <div className="myorders-state-icon">!</div>

                            <h2>Something Went Wrong</h2>

                            <p>{error}</p>

                            <button
                                className="myorders-retry"
                                onClick={fetchMyOrders}
                            >
                                Try Again
                            </button>

                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && !error && orders.length === 0 && (
                        <div className="myorders-state">

                            <div className="myorders-state-icon">🛍</div>

                            <h2>No Orders Yet</h2>

                            <p>
                                Your order history is looking a little empty.
                                Once you place an order, you'll find all its
                                details and delivery updates here.
                            </p>

                        </div>
                    )}

                    {/* Order list */}
                    {!loading && !error && orders.length > 0 && (

                        <>

                            <div className="myorders-toolbar">
                                <h2>Your Order History</h2>

                                <span className="myorders-count">
                                    {orders.length} {orders.length === 1 ? "ORDER" : "ORDERS"}
                                </span>
                            </div>

                            <div className="myorders-list">

                                {orders.map((order, index) => (

                                    <section
                                        key={order._id}
                                        className="myorder-card"
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >

                                        {/* Order heading */}
                                        <div className="myorder-header">

                                            <div>
                                                <span className="myorder-id-label">
                                                    ORDER REFERENCE
                                                </span>

                                                <h2 className="myorder-id">
                                                    #{order._id}
                                                </h2>

                                                <p className="myorder-date">
                                                    Placed on {formatDate(order.createdAt)}
                                                </p>
                                            </div>

                                            <span className={`myorder-status ${getStatusClass(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>

                                        </div>

                                        <div className="myorder-divider"></div>

                                        {/* Products */}
                                        <div>

                                            <h3 className="myorder-section-title">
                                                <span>▦</span>
                                                Products in this order
                                            </h3>

                                            {order.orderItems?.map((item, itemIndex) => (

                                                <div
                                                    key={item._id || itemIndex}
                                                    className="myorder-product"
                                                >

                                                    <div className="myorder-product-left">

                                                        <div className="myorder-product-number">
                                                            {String(itemIndex + 1).padStart(2, "0")}
                                                        </div>

                                                        <div>
                                                            <p className="myorder-product-name">
                                                                {item.product?.name || "Product unavailable"}
                                                            </p>

                                                            <p className="myorder-product-quantity">
                                                                Quantity: {item.quantity}
                                                            </p>
                                                        </div>

                                                    </div>

                                                    <p className="myorder-product-price">
                                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                    </p>

                                                </div>

                                            ))}

                                        </div>

                                        <div className="myorder-divider"></div>

                                        {/* Order information */}
                                        <div className="myorder-info-grid">

                                            <div className="myorder-info-box">
                                                <span className="myorder-info-label">
                                                    PAYMENT METHOD
                                                </span>

                                                <p className="myorder-info-value">
                                                    {order.paymentMethod}
                                                </p>
                                            </div>

                                            <div className="myorder-info-box">
                                                <span className="myorder-info-label">
                                                    PAYMENT STATUS
                                                </span>

                                                <p className={`myorder-info-value ${order.isPaid ? "myorder-paid" : "myorder-pending"}`}>
                                                    {order.isPaid ? "Paid" : "Pending"}
                                                </p>
                                            </div>

                                            <div className="myorder-info-box">
                                                <span className="myorder-info-label">
                                                    TOTAL AMOUNT
                                                </span>

                                                <p className="myorder-info-value myorder-total">
                                                    ₹{Number(order.totalPrice).toLocaleString("en-IN")}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="myorder-divider"></div>

                                        {/* Delivery address */}
                                        <div className="myorder-address">

                                            <h3 className="myorder-section-title">
                                                <span>⌖</span>
                                                Delivery Address
                                            </h3>

                                            <p className="myorder-address-name">
                                                {order.shippingAddress?.fullName}
                                            </p>

                                            <p>
                                                {order.shippingAddress?.street},
                                                {" "}{order.shippingAddress?.city}
                                            </p>

                                            <p>
                                                {order.shippingAddress?.state},
                                                {" "}{order.shippingAddress?.country}
                                                {" - "}{order.shippingAddress?.pincode}
                                            </p>

                                            <p>
                                                Phone: {order.shippingAddress?.phone}
                                            </p>

                                        </div>

                                    </section>

                                ))}

                            </div>

                        </>

                    )}

                </div>

            </main>
        </>
    );
};

export default MyOrders;
