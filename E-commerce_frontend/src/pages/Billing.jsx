
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const billingStyles = `
    .billing-shell {
        position: relative;
        isolation: isolate;
        min-height: 100vh;
        overflow: hidden;
        color: #f8fafc;
        background:
            radial-gradient(ellipse at 50% -15%, #30205a 0%, transparent 50%),
            linear-gradient(145deg, #080914, #0b1020 48%, #0a0b16);
    }

    .billing-atmosphere {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    .billing-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(85px);
        opacity: .2;
        animation: billingFloat 12s ease-in-out infinite alternate;
    }

    .billing-orb-one {
        width: 330px;
        height: 330px;
        background: #7c3aed;
        top: 100px;
        left: -150px;
    }

    .billing-orb-two {
        width: 380px;
        height: 380px;
        background: #2563eb;
        top: 550px;
        right: -180px;
        animation-delay: -4s;
    }

    .billing-grid-bg {
        position: absolute;
        inset: 0;
        opacity: .055;
        background-image:
            linear-gradient(#a5b4fc 1px, transparent 1px),
            linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
        background-size: 54px 54px;
        mask-image: linear-gradient(to bottom, black, transparent 80%);
    }

    .billing-container {
        position: relative;
        width: 100%;
        max-width: 1250px;
        margin: 0 auto;
        padding: 55px 25px 85px;
    }

    .billing-hero {
        animation: billingFadeUp .65s both;
    }

    .billing-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        padding: 8px 14px;
        border: 1px solid rgba(167,139,250,.25);
        border-radius: 999px;
        background: rgba(139,92,246,.09);
        color: #c4b5fd;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .billing-title {
        margin-top: 20px;
        font-size: clamp(2.4rem, 5vw, 4rem);
        font-weight: 800;
        letter-spacing: -2px;
        line-height: 1.1;
    }

    .billing-gradient {
        background: linear-gradient(110deg, #c4b5fd, #60a5fa, #e879f9);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .billing-subtitle {
        max-width: 570px;
        margin-top: 14px;
        color: #94a3b8;
        font-size: 14px;
        line-height: 1.8;
    }

    .billing-steps {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 30px;
        flex-wrap: wrap;
    }

    .billing-step {
        display: flex;
        align-items: center;
        gap: 9px;
        color: #64748b;
        font-size: 12px;
        font-weight: 600;
    }

    .billing-step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 29px;
        height: 29px;
        border: 1px solid rgba(148,163,184,.2);
        border-radius: 50%;
        background: rgba(255,255,255,.035);
    }

    .billing-step.active {
        color: #c4b5fd;
    }

    .billing-step.active .billing-step-number {
        border-color: rgba(167,139,250,.55);
        background: rgba(139,92,246,.2);
        color: #ddd6fe;
    }

    .billing-step-line {
        width: 35px;
        height: 1px;
        background: rgba(148,163,184,.2);
    }

    .billing-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.65fr) minmax(290px, .85fr);
        gap: 25px;
        align-items: start;
        margin-top: 42px;
    }

    .billing-left {
        display: flex;
        flex-direction: column;
        gap: 23px;
        min-width: 0;
    }

    .billing-panel {
        position: relative;
        padding: 27px;
        overflow: hidden;
        border: 1px solid rgba(196,181,253,.13);
        border-radius: 23px;
        background:
            radial-gradient(circle at 100% 0%, rgba(139,92,246,.09), transparent 45%),
            linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.018));
        backdrop-filter: blur(18px);
        box-shadow: 0 18px 45px rgba(0,0,0,.16);
        animation: billingFadeUp .65s both;
    }

    .billing-panel-heading {
        display: flex;
        align-items: center;
        gap: 13px;
        margin-bottom: 23px;
    }

    .billing-panel-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 43px;
        height: 43px;
        flex-shrink: 0;
        border: 1px solid rgba(167,139,250,.25);
        border-radius: 14px;
        background: rgba(139,92,246,.14);
        color: #c4b5fd;
        font-size: 20px;
    }

    .billing-panel-heading h2 {
        color: #f8fafc;
        font-size: 18px;
        font-weight: 750;
    }

    .billing-panel-heading p {
        margin-top: 4px;
        color: #64748b;
        font-size: 12px;
    }

    .billing-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        padding: 17px 0;
        border-bottom: 1px solid rgba(196,181,253,.09);
        transition: background .25s;
    }

    .billing-item:first-child {
        padding-top: 0;
    }

    .billing-item:last-child {
        padding-bottom: 0;
        border-bottom: none;
    }

    .billing-item-info {
        display: flex;
        align-items: center;
        gap: 14px;
        min-width: 0;
    }

    .billing-item-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        flex-shrink: 0;
        border: 1px solid rgba(167,139,250,.17);
        border-radius: 13px;
        background: rgba(139,92,246,.1);
        color: #c4b5fd;
        font-size: 13px;
        font-weight: 700;
    }

    .billing-item-name {
        color: #f1f5f9;
        font-size: 14px;
        font-weight: 650;
        overflow-wrap: anywhere;
    }

    .billing-item-quantity {
        margin-top: 6px;
        color: #64748b;
        font-size: 12px;
    }

    .billing-item-price {
        flex-shrink: 0;
        color: #e2e8f0;
        font-size: 14px;
        font-weight: 700;
    }

    .billing-address-content {
        padding: 19px;
        border: 1px solid rgba(167,139,250,.14);
        border-radius: 16px;
        background: rgba(139,92,246,.055);
    }

    .billing-address-name {
        margin-bottom: 9px;
        color: #f8fafc;
        font-size: 16px;
        font-weight: 700;
    }

    .billing-address-line {
        margin-top: 6px;
        color: #94a3b8;
        font-size: 13px;
        line-height: 1.7;
    }

    .billing-default-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 16px;
        padding: 7px 11px;
        border: 1px solid rgba(52,211,153,.18);
        border-radius: 999px;
        background: rgba(16,185,129,.09);
        color: #6ee7b7;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .6px;
        text-transform: uppercase;
    }

    .billing-address-warning {
        padding: 17px;
        border: 1px solid rgba(251,191,36,.18);
        border-radius: 15px;
        background: rgba(245,158,11,.06);
        color: #fcd34d;
        font-size: 13px;
        line-height: 1.7;
    }

    .billing-profile-link {
        display: inline-block;
        margin-top: 12px;
        color: #c4b5fd;
        font-size: 12px;
        font-weight: 700;
        text-decoration: underline;
        text-underline-offset: 4px;
    }

    .billing-summary {
        position: sticky;
        top: 25px;
        animation: billingFadeUp .8s both;
    }

    .billing-summary-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 24px;
    }

    .billing-summary-top h2 {
        font-size: 19px;
        font-weight: 750;
    }

    .billing-secure {
        padding: 6px 9px;
        border: 1px solid rgba(52,211,153,.16);
        border-radius: 999px;
        background: rgba(16,185,129,.08);
        color: #6ee7b7;
        font-size: 10px;
        font-weight: 700;
    }

    .billing-price-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-top: 18px;
        color: #94a3b8;
        font-size: 13px;
    }

    .billing-price-value {
        color: #e2e8f0;
        font-weight: 600;
    }

    .billing-free {
        color: #6ee7b7;
        font-weight: 700;
    }

    .billing-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin-top: 25px;
        padding-top: 22px;
        border-top: 1px solid rgba(196,181,253,.15);
    }

    .billing-total-label {
        color: #f8fafc;
        font-size: 15px;
        font-weight: 700;
    }

    .billing-total-value {
        color: #c4b5fd;
        font-size: 25px;
        font-weight: 800;
        letter-spacing: -.5px;
    }

    .billing-summary-note {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-top: 22px;
        padding: 13px;
        border: 1px solid rgba(96,165,250,.13);
        border-radius: 13px;
        background: rgba(59,130,246,.055);
        color: #94a3b8;
        font-size: 11px;
        line-height: 1.7;
    }

    .billing-back {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 22px;
        color: #a5b4fc;
        font-size: 12px;
        font-weight: 700;
        transition: color .2s, transform .2s;
    }

    .billing-back:hover {
        color: #ddd6fe;
        transform: translateX(-3px);
    }

    .billing-status {
        display: flex;
        min-height: 65vh;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px;
        text-align: center;
    }

    .billing-status-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 68px;
        height: 68px;
        margin-bottom: 20px;
        border: 1px solid rgba(167,139,250,.25);
        border-radius: 22px;
        background: rgba(139,92,246,.13);
        color: #c4b5fd;
        font-size: 28px;
    }

    .billing-status h2 {
        font-size: 23px;
        font-weight: 750;
    }

    .billing-status p {
        max-width: 400px;
        margin-top: 10px;
        color: #94a3b8;
        font-size: 13px;
        line-height: 1.8;
    }

    .billing-action {
        margin-top: 23px;
        padding: 12px 22px;
        border: 1px solid rgba(167,139,250,.25);
        border-radius: 12px;
        background: linear-gradient(110deg, #7c3aed, #6366f1);
        color: white;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: transform .25s, filter .25s;
    }

    .billing-action:hover {
        transform: translateY(-2px);
        filter: brightness(1.13);
    }

    .billing-loading-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 20px 3px 0;
        border-radius: 50%;
        background: #a78bfa;
        animation: billingPulse .8s infinite alternate;
    }

    .billing-loading-dot:nth-child(2) {
        animation-delay: .2s;
    }

    .billing-loading-dot:nth-child(3) {
        animation-delay: .4s;
    }

    @keyframes billingFloat {
        from { transform: translate(0, 0) scale(1); }
        to { transform: translate(25px, -25px) scale(1.1); }
    }

    @keyframes billingFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes billingPulse {
        from { opacity: .3; transform: translateY(0); }
        to { opacity: 1; transform: translateY(-4px); }
    }

    @media (max-width: 850px) {
        .billing-layout {
            grid-template-columns: 1fr;
        }

        .billing-summary {
            position: static;
        }
    }

    @media (max-width: 550px) {
        .billing-container {
            padding: 38px 17px 60px;
        }

        .billing-panel {
            padding: 21px;
        }

        .billing-title {
            letter-spacing: -1px;
        }

        .billing-steps {
            gap: 8px;
        }

        .billing-step {
            gap: 6px;
            font-size: 10px;
        }

        .billing-step-line {
            width: 15px;
        }

        .billing-item {
            gap: 9px;
        }

        .billing-item-info {
            gap: 10px;
        }

        .billing-item-number {
            width: 36px;
            height: 36px;
        }

        .billing-item-name {
            font-size: 12px;
        }

        .billing-item-price {
            font-size: 12px;
        }

        .billing-total-value {
            font-size: 21px;
        }
    }

    .billing-payment-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 17px;
    border: 1px solid rgba(196,181,253,.13);
    border-radius: 15px;
    background: rgba(255,255,255,.025);
    cursor: pointer;
    transition: .25s ease;
}

.billing-payment-option:hover {
    border-color: rgba(167,139,250,.45);
    background: rgba(139,92,246,.07);
}

.billing-payment-option.selected {
    border-color: #8b5cf6;
    background: rgba(139,92,246,.12);
    box-shadow: 0 0 20px rgba(139,92,246,.08);
}

.billing-payment-option input {
    accent-color: #a78bfa;
    width: 17px;
    height: 17px;
}

.billing-payment-option strong {
    display: block;
    color: #f1f5f9;
    font-size: 13px;
}

.billing-payment-option small {
    display: block;
    margin-top: 5px;
    color: #94a3b8;
    font-size: 11px;
}

.billing-payment-symbol {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    border: 1px solid rgba(167,139,250,.2);
    border-radius: 12px;
    background: rgba(139,92,246,.12);
    color: #c4b5fd;
    font-size: 18px;
}

.billing-demo-note {
    margin-top: 17px;
    padding: 13px;
    border: 1px solid rgba(96,165,250,.18);
    border-radius: 12px;
    background: rgba(59,130,246,.06);
    color: #bfdbfe;
    font-size: 11px;
    line-height: 1.7;
}

.billing-place-order {
    width: 100%;
    margin-top: 24px;
    padding: 15px;
    border: none;
    border-radius: 13px;
    background: linear-gradient(110deg, #7c3aed, #4f46e5);
    color: white;
    font-size: 14px;
    font-weight: 750;
    cursor: pointer;
    transition: .25s ease;
}

.billing-place-order:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.12);
}

.billing-place-order:disabled {
    opacity: .55;
    cursor: not-allowed;
}

.billing-order-error {
    margin-top: 14px;
    color: #fca5a5;
    font-size: 12px;
    line-height: 1.6;
}

    @media (prefers-reduced-motion: reduce) {
        .billing-orb,
        .billing-panel,
        .billing-hero,
        .billing-summary,
        .billing-loading-dot {
            animation: none !important;
            transition: none !important;
        }
    }

`;

function Billing() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("")
    const [placingOrder, setPlacingOrder] = useState(false)
    const [orderError, setOrderError] = useState("")
    const [createdOrder, setCreatedOrder] = useState(null)
    const [orderResult, setOrderResult] = useState(null);



    // Fetch cart
    useEffect(() => {

        const fetchCart = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:8000/api/v1/cart/carts/fetch",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch cart");
                }

                setCart(data.data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();

    }, []);

    // Cart calculations
    const items = cart?.items || [];

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const shippingPrice = subtotal > 1000 ? 0 : 100;
    const taxPrice = subtotal * 0.18;
    const totalPrice = subtotal + shippingPrice + taxPrice;

    const money = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR"
        }).format(amount);

    // Find default address
    const defaultAddress = Array.isArray(user?.address)
        ? user.address.find(address => address.isDefault)
        : null;


    const placeOrder = async () => {
        if (!defaultAddress) {
            setOrderError("Please set a default delivery address first.");
            return;
        }

        try {
            setPlacingOrder(true);
            setOrderError("");

            let order = createdOrder;

            // Step 1: Create order if it hasn't already been created.
            if (!order) {
                const orderResponse = await fetch(
                    "http://localhost:8000/api/v1/order/orders",
                    {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            paymentMethod
                        })
                    }
                );

                const orderData = await orderResponse.json();

                if (!orderResponse.ok) {
                    throw new Error(
                        orderData.message || "Failed to place order."
                    );
                }

                order = orderData.data?.data || orderData.data;

                if (!order?._id) {
                    throw new Error("Order was created, but its ID was not returned.");
                }

                setCreatedOrder(order);
            }
            
            const paymentResponse = await fetch(
                `http://localhost:8000/api/v1/payment/payments/${order._id}`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            const paymentData = await paymentResponse.json();

            if (!paymentResponse.ok) {
                throw new Error(
                    paymentData.message || "Order created, but payment creation failed."
                );
            }

            const payment = paymentData.data?.data || paymentData.data;

            // Step 3: Save confirmation details.
            setOrderResult({
                order,
                payment
            });

            setCreatedOrder(null);

        } catch (err) {
            setOrderError(err.message);
        } finally {
            setPlacingOrder(false);
        }
    };

    // Loading screen
    if (loading) {
        return (
            <div className="billing-shell">
                <style>{billingStyles}</style>

                <div className="billing-atmosphere">
                    <div className="billing-orb billing-orb-one"></div>
                    <div className="billing-orb billing-orb-two"></div>
                    <div className="billing-grid-bg"></div>
                </div>

                <div className="billing-status">
                    <div className="billing-status-icon">✦</div>
                    <h2>Preparing your checkout</h2>
                    <p>We're gathering your cart details. Just a moment...</p>

                    <div>
                        <span className="billing-loading-dot"></span>
                        <span className="billing-loading-dot"></span>
                        <span className="billing-loading-dot"></span>
                    </div>
                </div>
            </div>
        );
    }

    // Error screen
    if (error) {
        return (
            <div className="billing-shell">
                <style>{billingStyles}</style>

                <div className="billing-atmosphere">
                    <div className="billing-orb billing-orb-one"></div>
                    <div className="billing-grid-bg"></div>
                </div>

                <div className="billing-status">
                    <div className="billing-status-icon">!</div>
                    <h2>Unable to load your checkout</h2>
                    <p>{error}</p>

                    <button
                        onClick={() => navigate("/cart")}
                        className="billing-action"
                    >
                        Return to Cart
                    </button>
                </div>
            </div>
        );
    }

    // Order confirmation screen
    if (orderResult) {
        const { order, payment } = orderResult;

        return (
            <div className="billing-shell">
                <style>{billingStyles}</style>

                <div className="billing-atmosphere">
                    <div className="billing-orb billing-orb-one"></div>
                    <div className="billing-orb billing-orb-two"></div>
                    <div className="billing-grid-bg"></div>
                </div>

                <div className="billing-status">

                    <div className="billing-status-icon">
                        ✓
                    </div>

                    <h2>Order Placed Successfully!</h2>

                    <p>
                        Your order has been created successfully.
                    </p>

                    <div className="billing-address-content mt-6 w-full max-w-md text-left">

                        <p className="billing-address-line">
                            Order ID
                        </p>

                        <h3 className="billing-address-name break-all">
                            {order._id}
                        </h3>

                        <p className="billing-address-line">
                            Payment Method: {payment.method}
                        </p>

                        <p className="billing-address-line">
                            Payment Status:{" "}
                            <span className="text-emerald-400 font-bold">
                                {payment.status}
                            </span>
                        </p>

                        <p className="billing-address-line">
                            Amount: {money(payment.amount)}
                        </p>

                        {payment.method !== "COD" && (
                            <p className="billing-address-line">
                                Demo payment only. No actual money was transferred.
                            </p>
                        )}

                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="billing-action"
                    >
                        Continue Shopping
                    </button>

                </div>
            </div>
        );
    }

    // Empty cart screen
    if (items.length === 0) {
        return (
            <div className="billing-shell">
                <style>{billingStyles}</style>

                <div className="billing-atmosphere">
                    <div className="billing-orb billing-orb-one"></div>
                    <div className="billing-grid-bg"></div>
                </div>

                <div className="billing-status">
                    <div className="billing-status-icon">🛍</div>
                    <h2>Your cart is empty</h2>
                    <p>Add something you love before proceeding to checkout.</p>

                    <button
                        onClick={() => navigate("/shop")}
                        className="billing-action"
                    >
                        Explore Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="billing-shell">

            <style>{billingStyles}</style>

            {/* Background effects */}
            <div className="billing-atmosphere">
                <div className="billing-orb billing-orb-one"></div>
                <div className="billing-orb billing-orb-two"></div>
                <div className="billing-grid-bg"></div>
            </div>

            <main className="billing-container">

                {/* Page heading */}
                <header className="billing-hero">

                    <span className="billing-eyebrow">
                        <span>✦</span>
                        Almost there
                    </span>

                    <h1 className="billing-title">
                        Complete your{" "}
                        <span className="billing-gradient">
                            checkout.
                        </span>
                    </h1>

                    <p className="billing-subtitle">
                        Review your items, confirm your delivery address
                        and get ready to place your order.
                    </p>

                    {/* Checkout progress */}
                    <div className="billing-steps">

                        <div className="billing-step">
                            <span className="billing-step-number">✓</span>
                            Cart
                        </div>

                        <span className="billing-step-line"></span>

                        <div className="billing-step active">
                            <span className="billing-step-number">2</span>
                            Review
                        </div>

                        <span className="billing-step-line"></span>

                        <div className="billing-step">
                            <span className="billing-step-number">3</span>
                            Payment
                        </div>

                    </div>

                </header>

                <div className="billing-layout">

                    {/* Left section */}
                    <div className="billing-left">

                        {/* Cart items */}
                        <section className="billing-panel">

                            <div className="billing-panel-heading">

                                <div className="billing-panel-icon">
                                    🛍
                                </div>

                                <div>
                                    <h2>Your Items</h2>
                                    <p>
                                        {items.length} product
                                        {items.length !== 1 ? "s" : ""} in your cart
                                    </p>
                                </div>

                            </div>

                            <div>
                                {items.map((item, index) => (

                                    <div
                                        key={item._id}
                                        className="billing-item"
                                    >

                                        <div className="billing-item-info">

                                            <div className="billing-item-number">
                                                {String(index + 1).padStart(2, "0")}
                                            </div>

                                            <div>
                                                <h3 className="billing-item-name">
                                                    {item.product?.name || "Product"}
                                                </h3>

                                                <p className="billing-item-quantity">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                        </div>

                                        <p className="billing-item-price">
                                            {money(item.price * item.quantity)}
                                        </p>

                                    </div>

                                ))}
                            </div>

                            <button
                                onClick={() => navigate("/cart")}
                                className="billing-back"
                            >
                                ← Return to cart to make changes
                            </button>

                        </section>

                        {/* Delivery address */}
                        <section className="billing-panel">

                            <div className="billing-panel-heading">

                                <div className="billing-panel-icon">
                                    📍
                                </div>

                                <div>
                                    <h2>Delivery Address</h2>
                                    <p>Where should we deliver your order?</p>
                                </div>

                            </div>

                            {defaultAddress ? (

                                <div className="billing-address-content">

                                    <h3 className="billing-address-name">
                                        {user?.fullName}
                                    </h3>

                                    <p className="billing-address-line">
                                        {user?.phoneNumber}
                                    </p>

                                    <p className="billing-address-line">
                                        {defaultAddress.street},
                                        {" "}{defaultAddress.city},
                                        {" "}{defaultAddress.state}
                                    </p>

                                    <p className="billing-address-line">
                                        {defaultAddress.country}
                                        {" - "}{defaultAddress.pincode}
                                    </p>

                                    <span className="billing-default-tag">
                                        ✓ Default Address
                                    </span>

                                </div>

                            ) : (

                                <div className="billing-address-warning">
                                    <strong>No default address found.</strong>

                                    <p>
                                        Please set a default delivery address
                                        from your profile before placing your order.
                                    </p>

                                    <button
                                        onClick={() => navigate("/profile")}
                                        className="billing-profile-link"
                                    >
                                        Go to Profile →
                                    </button>
                                </div>

                            )}

                        </section>

                        {/* Payment method */}
                        <section className="billing-panel">

                            <div className="billing-panel-heading">
                                <div className="billing-panel-icon">
                                    💳
                                </div>

                                <div>
                                    <h2>Payment Method</h2>
                                    <p>Choose how you would like to pay</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">

                                <label className={`billing-payment-option ${paymentMethod === "COD" ? "selected" : ""
                                    }`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        disabled={placingOrder || !!createdOrder}
                                    />

                                    <div className="billing-payment-symbol">📦</div>

                                    <div>
                                        <strong>Cash on Delivery</strong>
                                        <small>Pay when your order is delivered</small>
                                    </div>
                                </label>

                                <label className={`billing-payment-option ${paymentMethod === "UPI" ? "selected" : ""
                                    }`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="UPI"
                                        checked={paymentMethod === "UPI"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        disabled={placingOrder || !!createdOrder}
                                    />

                                    <div className="billing-payment-symbol">⌁</div>

                                    <div>
                                        <strong>UPI (Demo)</strong>
                                        <small>Simulated UPI payment confirmation</small>
                                    </div>
                                </label>

                                <label className={`billing-payment-option ${paymentMethod === "Debit Card" ? "selected" : ""
                                    }`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Debit Card"
                                        checked={paymentMethod === "Debit Card"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        disabled={placingOrder || !!createdOrder}
                                    />

                                    <div className="billing-payment-symbol">💳</div>

                                    <div>
                                        <strong>Debit Card (Demo)</strong>
                                        <small>Simulated debit card payment confirmation</small>
                                    </div>
                                </label>

                            </div>

                            {paymentMethod !== "COD" && (
                                <div className="billing-demo-note">
                                    This is a demonstration payment. No real card details,
                                    UPI PIN or money transfer is involved.
                                </div>
                            )}

                        </section>

                    </div>

                    {/* Right section: Price summary */}
                    <aside className="billing-summary">

                        <section className="billing-panel">

                            <div className="billing-summary-top">

                                <h2>Order Summary</h2>

                                <span className="billing-secure">
                                    ✓ PRICE DETAILS
                                </span>

                            </div>

                            <div className="billing-price-row">
                                <span>Subtotal</span>
                                <span className="billing-price-value">
                                    {money(subtotal)}
                                </span>
                            </div>

                            <div className="billing-price-row">
                                <span>Shipping Charges</span>

                                <span className={
                                    shippingPrice === 0
                                        ? "billing-free"
                                        : "billing-price-value"
                                }>
                                    {shippingPrice === 0
                                        ? "FREE"
                                        : money(shippingPrice)}
                                </span>
                            </div>

                            <div className="billing-price-row">
                                <span>Tax (18%)</span>
                                <span className="billing-price-value">
                                    {money(taxPrice)}
                                </span>
                            </div>

                            <div className="billing-total">

                                <span className="billing-total-label">
                                    Total Amount
                                </span>

                                <span className="billing-total-value">
                                    {money(totalPrice)}
                                </span>

                            </div>

                            <div className="billing-summary-note">
                                <span>ⓘ</span>
                                <p>
                                    Your final order amount includes applicable
                                    shipping charges and 18% tax.
                                </p>
                            </div>

                            {orderError && (
                                <p className="billing-order-error">
                                    {orderError}
                                </p>
                            )}

                            <button
                                className="billing-place-order"
                                onClick={placeOrder}
                                disabled={!defaultAddress || placingOrder || !!orderResult}
                            >
                                {placingOrder
                                    ? "Processing..."
                                    : createdOrder
                                        ? "Retry Payment Creation"
                                        : `Place Order · ${money(totalPrice)}`
                                }
                            </button>

                        </section>

                    </aside>

                </div>

            </main>

        </div>
    );
}

export default Billing;
