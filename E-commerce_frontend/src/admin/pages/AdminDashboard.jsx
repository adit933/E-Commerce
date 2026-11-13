import { IndianRupee, Package, ShoppingCart, Users } from "lucide-react";
import React from "react";
import AdminStatCard from "../component/AdminStatCard";
import { useState } from "react";
import { useEffect } from "react";

const adminDashboardStyles = `
    .admin-dashboard {
    position: relative;
    isolation: isolate;
    flex: 1;
    min-height: 0;
    width: 100%;
    color: white;
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
        filter: blur(75px);
        opacity: .16;
        animation: dashboardFloat 12s ease-in-out infinite alternate;
    }

    .admin-dashboard-orb-one {
        width: 320px;
        height: 320px;
        background: #7c3aed;
        top: -180px;
        left: 10%;
    }

    .admin-dashboard-orb-two {
        width: 280px;
        height: 280px;
        background: #2563eb;
        top: 35%;
        right: -180px;
        animation-delay: -5s;
    }

    .admin-dashboard-grid {
        position: absolute;
        inset: 0;
        opacity: .07;
        background-image:
            linear-gradient(#a5b4fc 1px, transparent 1px),
            linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: linear-gradient(to bottom, black, transparent 85%);
    }

    .admin-dashboard-label {
        color: #a78bfa;
        letter-spacing: 3px;
    }

    .admin-dashboard-heading {
        background: linear-gradient(110deg, #c4b5fd, #60a5fa, #e879f9);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .admin-dashboard-intro {
        animation: dashboardFadeUp .6s ease both;
    }

    .admin-dashboard-statistics {
        animation: dashboardFadeUp .8s ease both;
    }

    @keyframes dashboardFloat {
        from { transform: translate3d(0, 0, 0) scale(1); }
        to { transform: translate3d(20px, -20px, 0) scale(1.12); }
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

    @media (prefers-reduced-motion: reduce) {
        .admin-dashboard-orb {
            animation: none !important;
        }

        .admin-dashboard-intro,
        .admin-dashboard-statistics {
            animation: none !important;
        }
    }
`;

function AdminDashboard() {

    const [stats, setstats] = useState({
        totalUsers: 0,
        totalProducts: 0
    })

    const [loading, setloading] = useState(true)
    const [error, seterror] = useState("")

    useEffect(() => {


        const fetchDashBoardStats = async () => {
            try {
                setloading(true)
                seterror("")

                const response = await fetch(
                    "http://localhost:8000/api/v1/users/dashboard",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const result = await response.json();

                console.log(response);

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch dashboard statistics");
                }

                setstats(result.data);

            }
            catch (error) {
                seterror(error.message);
            } finally {
                setloading(false)
            }
        }

        fetchDashBoardStats()

    }, [])


     const dashBoardStats = [
        {
            title: "Total Product",
            value: loading ? "..." : stats.totalProducts,
            description: "Products in the Store !!!",
            icon: Package
        },
        {
            title: "Total Orders",
            value: "-",
            description: "Orders Recieved !!!",
            icon: ShoppingCart
        },
        {
            title: "Total Users",
            value: loading ? "..." : stats.totalUsers,
            description: "Registered Customers !!!",
            icon: Users
        },
        {
            title: "Total Revenue",
            value: "-",
            description: "Revenue from orders !!!",
            icon: IndianRupee
        }
    ];

    return (
        <>
            <style>{adminDashboardStyles}</style>

            <div className="admin-dashboard p-8">

                {/* Background atmosphere */}
                <div className="admin-dashboard-atmosphere">
                    <div className="admin-dashboard-orb admin-dashboard-orb-one" />
                    <div className="admin-dashboard-orb admin-dashboard-orb-two" />
                    <div className="admin-dashboard-grid" />
                </div>

                {/* Dashboard Heading */}
                <div className="admin-dashboard-intro mb-10">
                    <p className="admin-dashboard-label text-xs uppercase font-semibold mb-3">
                        Store Management
                    </p>

                    <h1 className="admin-dashboard-heading text-3xl font-bold">
                        Dashboard Overview
                    </h1>

                    <p className="text-slate-400 text-sm mt-3">
                        Here's what's happening with your store.
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="admin-dashboard-statistics grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                    {dashBoardStats.map((stat) => (
                        <AdminStatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                            description={stat.description}
                            icon={stat.icon}
                        />
                    ))}

                </div>

            </div>
        </>
    );
}

export default AdminDashboard;