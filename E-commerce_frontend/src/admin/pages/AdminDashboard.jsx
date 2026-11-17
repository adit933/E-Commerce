
import React, { useEffect, useMemo, useState } from "react";
import {
    IndianRupee,
    Package,
    ShoppingCart,
    Users,
    TrendingUp,
    TrendingDown,
    Wallet,
    Clock,
    AlertTriangle,
    CreditCard,
    ArrowUpRight,
    RefreshCw,
    Boxes,
    CalendarDays,
    BarChart3,
    CircleDollarSign
} from "lucide-react";
import AdminStatCard from "../component/AdminStatCard";

const adminDashboardStyles = `
.admin-dashboard {
    position: relative;
    isolation: isolate;
    min-height: 100%;
    width: 100%;
    color: #f8fafc;
    overflow: hidden;
}

.admin-dashboard-atmosphere {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
}

.admin-dashboard-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: .16;
    animation: dashboardFloat 12s ease-in-out infinite alternate;
}

.admin-dashboard-orb-one {
    width: 360px;
    height: 360px;
    background: #7c3aed;
    top: -180px;
    left: 8%;
}

.admin-dashboard-orb-two {
    width: 350px;
    height: 350px;
    background: #2563eb;
    top: 35%;
    right: -180px;
    animation-delay: -5s;
}

.admin-dashboard-grid {
    position: absolute;
    inset: 0;
    opacity: .045;
    background-image:
        linear-gradient(#a5b4fc 1px, transparent 1px),
        linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to bottom, black, transparent 85%);
}

.dashboard-welcome {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(167,139,250,.2);
    background: linear-gradient(115deg,
        rgba(91,33,182,.28),
        rgba(30,41,90,.45),
        rgba(30,41,59,.55));
    border-radius: 22px;
    padding: 30px;
    animation: dashboardFadeUp .5s ease both;
}

.dashboard-welcome::after {
    content: "";
    position: absolute;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: rgba(129,140,248,.12);
    filter: blur(65px);
    right: -70px;
    top: -130px;
    pointer-events: none;
}

.dashboard-welcome-label {
    color: #c4b5fd;
    letter-spacing: 2.5px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
}

.dashboard-heading {
    background: linear-gradient(110deg,#ddd6fe,#93c5fd,#f0abfc);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.dashboard-date {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    color: #cbd5e1;
    font-size: 13px;
    padding: 10px 15px;
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 12px;
    background: rgba(15,23,42,.4);
}

.dashboard-live {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #86efac;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.dashboard-live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 12px #4ade80;
}

.dashboard-section-title {
    color: #f1f5f9;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -.3px;
}

.dashboard-section-subtitle {
    color: #94a3b8;
    font-size: 12px;
    margin-top: 5px;
}

.dashboard-panel {
    background: linear-gradient(145deg,
        rgba(30,41,59,.76),
        rgba(15,23,42,.83));
    border: 1px solid rgba(148,163,184,.13);
    border-radius: 19px;
    padding: 23px;
    box-shadow: 0 12px 35px rgba(0,0,0,.13);
    transition: border-color .25s ease, transform .25s ease;
    min-width: 0;
}

.dashboard-panel:hover {
    border-color: rgba(167,139,250,.3);
    transform: translateY(-2px);
}

.dashboard-stat-grid {
    animation: dashboardFadeUp .7s ease both;
}

.dashboard-chart-grid {
    animation: dashboardFadeUp .9s ease both;
}

.dashboard-stat-card {
    min-width: 0;
    position: relative;
}

.dashboard-chart {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    height: 205px;
    padding-top: 20px;
}

.dashboard-chart-column {
    flex: 1;
    min-width: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 9px;
}

.dashboard-bar-track {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-radius: 7px;
    background: rgba(255,255,255,.025);
    overflow: hidden;
}

.dashboard-bar {
    width: 70%;
    min-height: 3px;
    border-radius: 6px 6px 2px 2px;
    background: linear-gradient(to top,#6d28d9,#a78bfa,#60a5fa);
    box-shadow: 0 0 15px rgba(139,92,246,.17);
    transition: height .5s ease, opacity .2s ease;
    position: relative;
}

.dashboard-bar:hover {
    opacity: .75;
}

.dashboard-chart-label {
    color: #94a3b8;
    font-size: 10px;
    white-space: nowrap;
}

.dashboard-chart-value {
    color: #cbd5e1;
    font-size: 9px;
    min-height: 12px;
    white-space: nowrap;
}

.dashboard-donut {
    width: 178px;
    height: 178px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    position: relative;
}

.dashboard-donut::after {
    content: "";
    position: absolute;
    width: 119px;
    height: 119px;
    border-radius: 50%;
    background: #111b30;
    border: 1px solid rgba(255,255,255,.06);
}

.dashboard-donut-content {
    z-index: 1;
    text-align: center;
}

.dashboard-legend {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
}

.dashboard-legend-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 12px;
}

.dashboard-legend-left {
    display: flex;
    align-items: center;
    gap: 9px;
    color: #cbd5e1;
}

.dashboard-legend-dot {
    width: 9px;
    height: 9px;
    border-radius: 3px;
    flex-shrink: 0;
}

.dashboard-horizontal-track {
    width: 100%;
    height: 8px;
    background: rgba(255,255,255,.06);
    border-radius: 20px;
    overflow: hidden;
}

.dashboard-horizontal-fill {
    height: 100%;
    border-radius: 20px;
    transition: width .6s ease;
}

.dashboard-product-row {
    display: flex;
    align-items: center;
    gap: 13px;
    margin-top: 21px;
}

.dashboard-product-image {
    width: 43px;
    height: 43px;
    border-radius: 11px;
    object-fit: cover;
    background: #273449;
    border: 1px solid rgba(255,255,255,.08);
}

.dashboard-product-placeholder {
    width: 43px;
    height: 43px;
    border-radius: 11px;
    display: grid;
    place-items: center;
    color: #c4b5fd;
    background: rgba(139,92,246,.14);
}

.dashboard-table-wrapper {
    overflow-x: auto;
    width: 100%;
}

.dashboard-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
    text-align: left;
}

.dashboard-table th {
    color: #64748b;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    padding: 15px 12px;
    border-bottom: 1px solid rgba(148,163,184,.12);
}

.dashboard-table td {
    padding: 16px 12px;
    font-size: 12px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(148,163,184,.08);
}

.dashboard-table tr:last-child td {
    border-bottom: none;
}

.dashboard-table tbody tr:hover {
    background: rgba(139,92,246,.045);
}

.dashboard-status {
    display: inline-flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
}

.dashboard-status-processing {
    color: #fcd34d;
    background: rgba(245,158,11,.12);
}

.dashboard-status-shipped {
    color: #93c5fd;
    background: rgba(59,130,246,.13);
}

.dashboard-status-delivered {
    color: #86efac;
    background: rgba(34,197,94,.12);
}

.dashboard-status-cancelled {
    color: #fca5a5;
    background: rgba(239,68,68,.12);
}

.dashboard-status-default {
    color: #c4b5fd;
    background: rgba(139,92,246,.12);
}

.dashboard-payment-box {
    border-radius: 13px;
    padding: 15px;
    background: rgba(255,255,255,.035);
    border: 1px solid rgba(255,255,255,.06);
}

.dashboard-error {
    padding: 14px 17px;
    border: 1px solid rgba(248,113,113,.25);
    border-radius: 12px;
    background: rgba(239,68,68,.09);
    color: #fca5a5;
    font-size: 13px;
}

.dashboard-empty {
    text-align: center;
    padding: 35px 15px;
    color: #64748b;
    font-size: 13px;
}

.dashboard-refresh {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 15px;
    border: 1px solid rgba(167,139,250,.24);
    background: rgba(139,92,246,.1);
    color: #c4b5fd;
    border-radius: 11px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: .2s;
}

.dashboard-refresh:hover {
    background: rgba(139,92,246,.2);
    border-color: rgba(167,139,250,.5);
}

.dashboard-refresh:disabled {
    opacity: .5;
    cursor: not-allowed;
}

@keyframes dashboardFloat {
    from { transform: translate3d(0,0,0) scale(1); }
    to { transform: translate3d(20px,-20px,0) scale(1.12); }
}

@keyframes dashboardFadeUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}

@media(max-width: 768px) {
    .admin-dashboard {
        padding: 18px !important;
    }

    .dashboard-welcome {
        padding: 22px;
    }

    .dashboard-panel {
        padding: 17px;
    }

    .dashboard-donut {
        width: 145px;
        height: 145px;
    }

    .dashboard-donut::after {
        width: 97px;
        height: 97px;
    }

    .dashboard-chart {
        gap: 5px;
    }
}

@media(prefers-reduced-motion: reduce) {
    .admin-dashboard-orb,
    .dashboard-welcome,
    .dashboard-stat-grid,
    .dashboard-chart-grid {
        animation: none !important;
    }

    .dashboard-panel,
    .dashboard-bar,
    .dashboard-horizontal-fill {
        transition: none !important;
    }
}
`;

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(amount) || 0);
};

const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};

const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
};

const getStatusClass = (status) => {
    const classes = {
        Processing: "dashboard-status-processing",
        Shipped: "dashboard-status-shipped",
        Delivered: "dashboard-status-delivered",
        Cancelled: "dashboard-status-cancelled"
    };

    return classes[status] || "dashboard-status-default";
};

const statusColors = {
    Processing: "#f59e0b",
    Shipped: "#3b82f6",
    Delivered: "#22c55e",
    Cancelled: "#ef4444"
};

function AdminDashboard() {

    const [stats, setStats] = useState({
        currentYear: new Date().getFullYear(),
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        paidOrdersCount: 0,
        pendingOrdersCount: 0,
        lowStockProducts: 0,
        monthlyRevenue: [],
        orderStatus: [],
        topProducts: [],
        recentOrders: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashBoardStats = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8000/api/v1/users/dashboard",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch dashboard statistics"
                );
            }

            setStats(result.data);

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashBoardStats();
    }, []);

    // Today's date
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Monthly revenue chart calculations
    const monthlyData = stats.monthlyRevenue || [];

    const maxMonthlyRevenue = Math.max(
        ...monthlyData.map(item => Number(item.revenue) || 0),
        1
    );

    const yearlyRevenue = monthlyData.reduce(
        (sum, item) => sum + (Number(item.revenue) || 0),
        0
    );

    // Order status donut calculations
    const orderStatuses = stats.orderStatus || [];

    const totalStatusOrders = orderStatuses.reduce(
        (sum, item) => sum + Number(item.count || 0),
        0
    );

    let currentAngle = 0;

    const donutGradient = orderStatuses.length
        ? `conic-gradient(${orderStatuses.map(item => {
            const count = Number(item.count) || 0;
            const start = currentAngle;
            const percentage = totalStatusOrders
                ? (count / totalStatusOrders) * 100
                : 0;

            currentAngle += percentage * 3.6;

            return `${statusColors[item.status] || "#8b5cf6"} ${start}deg ${currentAngle}deg`;
        }).join(", ")})`
        : "conic-gradient(#334155 0deg 360deg)";

    // Top product calculations
    const topProducts = stats.topProducts || [];

    const maxProductSales = Math.max(
        ...topProducts.map(item => Number(item.totalSold) || 0),
        1
    );

    // Payment statistics
    const paidCount = Number(stats.paidOrdersCount) || 0;
    const pendingCount = Number(stats.pendingOrdersCount) || 0;
    const cancelledCount = Number(
        orderStatuses.find(item => item.status === "Cancelled")?.count || 0
    );

    const paymentTotal = paidCount + pendingCount;

    // Statistic cards
    const dashboardStats = [
        {
            title: "Total Revenue",
            value: formatCurrency(stats.totalRevenue),
            description: "Revenue from paid orders",
            icon: IndianRupee
        },
        {
            title: "Total Orders",
            value: stats.totalOrders,
            description: "Orders received",
            icon: ShoppingCart
        },
        {
            title: "Total Products",
            value: stats.totalProducts,
            description: "Active store products",
            icon: Package
        },
        {
            title: "Total Customers",
            value: stats.totalUsers,
            description: "Registered customers",
            icon: Users
        },
        {
            title: "Average Order Value",
            value: formatCurrency(stats.averageOrderValue),
            description: "Average paid order amount",
            icon: Wallet
        },
        {
            title: "Paid Orders",
            value: stats.paidOrdersCount,
            description: "Successfully paid orders",
            icon: CreditCard
        },
        {
            title: "Pending Orders",
            value: stats.pendingOrdersCount,
            description: "Awaiting payment",
            icon: Clock
        },
        {
            title: "Low Stock Products",
            value: stats.lowStockProducts,
            description: "Products with stock ≤ 5",
            icon: AlertTriangle
        }
    ];

    return (
        <>
            <style>{adminDashboardStyles}</style>

            <div className="admin-dashboard p-8">

                {/* Background */}
                <div className="admin-dashboard-atmosphere">
                    <div className="admin-dashboard-orb admin-dashboard-orb-one" />
                    <div className="admin-dashboard-orb admin-dashboard-orb-two" />
                    <div className="admin-dashboard-grid" />
                </div>

                {/* Welcome Header */}
                <section className="dashboard-welcome mb-8">
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div>
                            <div className="dashboard-live mb-4">
                                <span className="dashboard-live-dot" />
                                Store Dashboard
                            </div>

                            <p className="dashboard-welcome-label mb-2">
                                ADMINISTRATION PANEL
                            </p>

                            <h1 className="dashboard-heading text-3xl md:text-4xl font-bold">
                                {getGreeting()}, Admin!
                            </h1>

                            <p className="text-slate-400 text-sm mt-3 max-w-xl leading-relaxed">
                                Welcome back! Here's your store's performance
                                overview and the latest business activity.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="dashboard-date">
                                <CalendarDays size={17} className="text-violet-400" />
                                {today}
                            </div>

                            <button
                                className="dashboard-refresh"
                                onClick={fetchDashBoardStats}
                                disabled={loading}
                            >
                                <RefreshCw
                                    size={14}
                                    className={loading ? "animate-spin" : ""}
                                />
                                Refresh Data
                            </button>
                        </div>

                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">

                        <div>
                            <p className="text-xs text-slate-500 mb-1">
                                Reporting Year
                            </p>
                            <p className="text-lg font-bold text-violet-200">
                                {stats.currentYear}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 mb-1">
                                Revenue This Year
                            </p>
                            <p className="text-lg font-bold text-emerald-300">
                                {formatCurrency(yearlyRevenue)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 mb-1">
                                Average Order Value
                            </p>
                            <p className="text-lg font-bold text-blue-300">
                                {formatCurrency(stats.averageOrderValue)}
                            </p>
                        </div>

                    </div>
                </section>

                {/* Error */}
                {error && (
                    <div className="dashboard-error mb-6">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={17} />
                            {error}
                        </div>
                    </div>
                )}

                {/* Statistics */}
                <section className="mb-9">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="dashboard-section-title">
                                Business Overview
                            </h2>
                            <p className="dashboard-section-subtitle">
                                Important metrics at a glance
                            </p>
                        </div>

                        <span className="text-xs text-slate-500">
                            {loading ? "Updating..." : "Live API Data"}
                        </span>
                    </div>

                    <div className="dashboard-stat-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                        {dashboardStats.map((stat) => (
                            <div key={stat.title} className="dashboard-stat-card">
                                <AdminStatCard
                                    title={stat.title}
                                    value={loading ? "..." : stat.value}
                                    description={stat.description}
                                    icon={stat.icon}
                                />
                            </div>
                        ))}

                    </div>

                </section>

                {/* Analytics Heading */}
                <section className="mb-5">
                    <h2 className="dashboard-section-title">
                        Analytics & Performance
                    </h2>
                    <p className="dashboard-section-subtitle">
                        Understand your store's sales and order trends
                    </p>
                </section>

                {/* Charts Row 1 */}
                <section className="dashboard-chart-grid grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">

                    {/* Monthly Revenue */}
                    <div className="dashboard-panel xl:col-span-2">

                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-violet-500/10 text-violet-300">
                                        <BarChart3 size={18} />
                                    </div>
                                    <h3 className="dashboard-section-title">
                                        Monthly Revenue
                                    </h3>
                                </div>

                                <p className="dashboard-section-subtitle ml-11">
                                    Revenue generated throughout {stats.currentYear}
                                </p>
                            </div>

                            <span className="text-xs text-violet-300 bg-violet-500/10 px-3 py-2 rounded-lg">
                                {stats.currentYear}
                            </span>
                        </div>

                        <div className="mt-5">
                            <p className="text-2xl font-bold text-white">
                                {formatCurrency(yearlyRevenue)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                Total revenue across the displayed months
                            </p>
                        </div>

                        {loading ? (
                            <div className="dashboard-empty">
                                Loading revenue data...
                            </div>
                        ) : (
                            <div className="dashboard-chart">

                                {monthlyData.map((item, index) => {
                                    const revenue = Number(item.revenue) || 0;
                                    const height = revenue > 0
                                        ? Math.max((revenue / maxMonthlyRevenue) * 100, 4)
                                        : 2;

                                    return (
                                        <div
                                            key={item.month}
                                            className="dashboard-chart-column"
                                            title={`${item.month}: ${formatCurrency(revenue)}`}
                                        >
                                            <span className="dashboard-chart-value">
                                                {revenue > 0
                                                    ? new Intl.NumberFormat("en-IN", {
                                                        notation: "compact",
                                                        maximumFractionDigits: 1
                                                    }).format(revenue)
                                                    : ""}
                                            </span>

                                            <div className="dashboard-bar-track">
                                                <div
                                                    className="dashboard-bar"
                                                    style={{ height: `${height}%` }}
                                                />
                                            </div>

                                            <span className="dashboard-chart-label">
                                                {item.month}
                                            </span>
                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>

                    {/* Order Status Donut */}
                    <div className="dashboard-panel">

                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-300">
                                <ShoppingCart size={18} />
                            </div>
                            <h3 className="dashboard-section-title">
                                Order Status
                            </h3>
                        </div>

                        <p className="dashboard-section-subtitle ml-11">
                            Distribution of all orders
                        </p>

                        <div className="flex justify-center my-7">

                            <div
                                className="dashboard-donut"
                                style={{ background: donutGradient }}
                            >
                                <div className="dashboard-donut-content">
                                    <p className="text-2xl font-bold text-white">
                                        {totalStatusOrders}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Total Orders
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="dashboard-legend">

                            {orderStatuses.map((item) => (
                                <div
                                    className="dashboard-legend-row"
                                    key={item.status}
                                >
                                    <div className="dashboard-legend-left">
                                        <span
                                            className="dashboard-legend-dot"
                                            style={{
                                                background: statusColors[item.status] || "#8b5cf6"
                                            }}
                                        />
                                        {item.status}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-semibold">
                                            {item.count}
                                        </span>
                                        <span className="text-slate-500 text-xs">
                                            {totalStatusOrders
                                                ? `${((item.count / totalStatusOrders) * 100).toFixed(0)}%`
                                                : "0%"}
                                        </span>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </section>

                {/* Charts Row 2 */}
                <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-9">

                    {/* Top Products */}
                    <div className="dashboard-panel">

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-300">
                                        <TrendingUp size={18} />
                                    </div>
                                    <h3 className="dashboard-section-title">
                                        Top Selling Products
                                    </h3>
                                </div>

                                <p className="dashboard-section-subtitle ml-11">
                                    Best performing products by quantity sold
                                </p>
                            </div>

                            <span className="text-xs text-fuchsia-300 bg-fuchsia-500/10 px-3 py-2 rounded-lg">
                                Top 5
                            </span>
                        </div>

                        {topProducts.length === 0 ? (
                            <div className="dashboard-empty">
                                No product sales available yet.
                            </div>
                        ) : (

                            <div className="mt-2">

                                {topProducts.map((product, index) => {
                                    const sold = Number(product.totalSold) || 0;
                                    const percentage = (sold / maxProductSales) * 100;

                                    return (
                                        <div
                                            key={product._id || index}
                                            className="dashboard-product-row"
                                        >

                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="dashboard-product-image"
                                                />
                                            ) : (
                                                <div className="dashboard-product-placeholder">
                                                    <Package size={19} />
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <p className="text-sm font-semibold text-slate-200 truncate">
                                                        {product.name}
                                                    </p>

                                                    <span className="text-xs text-slate-400 whitespace-nowrap">
                                                        {sold} sold
                                                    </span>
                                                </div>

                                                <div className="dashboard-horizontal-track">
                                                    <div
                                                        className="dashboard-horizontal-fill"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            background: "linear-gradient(90deg,#7c3aed,#c084fc)"
                                                        }}
                                                    />
                                                </div>

                                                <p className="text-xs text-emerald-300 mt-2">
                                                    {formatCurrency(product.totalRevenue)}
                                                </p>
                                            </div>

                                            <span className="text-xs font-bold text-slate-500">
                                                #{index + 1}
                                            </span>

                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>

                    {/* Payment Overview */}
                    <div className="dashboard-panel">

                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-300">
                                <CircleDollarSign size={18} />
                            </div>
                            <h3 className="dashboard-section-title">
                                Payment Overview
                            </h3>
                        </div>

                        <p className="dashboard-section-subtitle ml-11">
                            Payment completion and outstanding orders
                        </p>

                        <div className="grid grid-cols-2 gap-3 mt-7">

                            <div className="dashboard-payment-box">
                                <div className="flex items-center gap-2 text-emerald-300 mb-3">
                                    <CreditCard size={16} />
                                    <span className="text-xs font-semibold">
                                        Paid Orders
                                    </span>
                                </div>

                                <p className="text-2xl font-bold text-white">
                                    {paidCount}
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                    Successfully paid
                                </p>
                            </div>

                            <div className="dashboard-payment-box">
                                <div className="flex items-center gap-2 text-amber-300 mb-3">
                                    <Clock size={16} />
                                    <span className="text-xs font-semibold">
                                        Pending
                                    </span>
                                </div>

                                <p className="text-2xl font-bold text-white">
                                    {pendingCount}
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                    Awaiting payment
                                </p>
                            </div>

                            <div className="dashboard-payment-box col-span-2">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs text-slate-400">
                                        Paid order ratio
                                    </span>

                                    <span className="text-sm font-bold text-emerald-300">
                                        {paymentTotal
                                            ? `${((paidCount / paymentTotal) * 100).toFixed(1)}%`
                                            : "0%"}
                                    </span>
                                </div>

                                <div className="dashboard-horizontal-track">
                                    <div
                                        className="dashboard-horizontal-fill"
                                        style={{
                                            width: `${paymentTotal ? (paidCount / paymentTotal) * 100 : 0}%`,
                                            background: "linear-gradient(90deg,#059669,#34d399)"
                                        }}
                                    />
                                </div>

                                <div className="flex justify-between mt-3 text-xs text-slate-500">
                                    <span>{paidCount} paid</span>
                                    <span>{pendingCount} pending</span>
                                </div>
                            </div>

                            <div className="dashboard-payment-box col-span-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-red-300">
                                    <TrendingDown size={17} />
                                    <span className="text-xs font-semibold">
                                        Cancelled Orders
                                    </span>
                                </div>

                                <span className="text-xl font-bold text-white">
                                    {cancelledCount}
                                </span>
                            </div>

                        </div>

                    </div>

                </section>

                {/* Recent Orders */}
                <section className="dashboard-panel mb-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                        <div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300">
                                    <Boxes size={18} />
                                </div>
                                <h3 className="dashboard-section-title">
                                    Recent Orders
                                </h3>
                            </div>

                            <p className="dashboard-section-subtitle ml-11">
                                Latest five orders received by your store
                            </p>
                        </div>

                        <span className="text-xs text-indigo-300 bg-indigo-500/10 px-3 py-2 rounded-lg w-fit">
                            Latest Activity
                        </span>

                    </div>

                    {stats.recentOrders?.length === 0 ? (

                        <div className="dashboard-empty">
                            No orders have been placed yet.
                        </div>

                    ) : (

                        <div className="dashboard-table-wrapper">

                            <table className="dashboard-table">

                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Payment</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {(stats.recentOrders || []).map((order, index) => (

                                        <tr key={order._id || index}>

                                            <td className="font-semibold text-violet-300">
                                                #{order._id?.slice(-6).toUpperCase() || "N/A"}
                                            </td>

                                            <td>
                                                <div className="font-semibold text-slate-200">
                                                    {order.user?.fullName || "Unknown"}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-1">
                                                    {order.user?.email || "N/A"}
                                                </div>
                                            </td>

                                            <td>
                                                {formatDate(order.createdAt)}
                                            </td>

                                            <td className="font-semibold text-white">
                                                {formatCurrency(order.totalPrice)}
                                            </td>

                                            <td>
                                                <span className={`dashboard-status ${
                                                    order.isPaid
                                                        ? "dashboard-status-delivered"
                                                        : "dashboard-status-processing"
                                                }`}>
                                                    {order.isPaid ? "Paid" : "Unpaid"}
                                                </span>
                                            </td>

                                            <td>
                                                <span className={`dashboard-status ${getStatusClass(order.orderStatus)}`}>
                                                    {order.orderStatus || "Unknown"}
                                                </span>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

                {/* Footer */}
                <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 py-5 border-t border-white/10">

                    <p className="text-xs text-slate-500">
                        Store Administration Dashboard
                    </p>

                    <p className="text-xs text-slate-500">
                        Data powered by your store API · {stats.currentYear}
                    </p>

                </footer>

            </div>
        </>
    );
}

export default AdminDashboard;
