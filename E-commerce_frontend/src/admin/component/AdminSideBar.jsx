import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    Store
} from "lucide-react";

const adminSidebarStyles = `
    .admin-sidebar {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        background:
            radial-gradient(ellipse at 20% 0%, #30205a 0%, transparent 55%),
            linear-gradient(160deg, #080914 0%, #0b1020 55%, #0a0b16 100%);
        border-right: 1px solid rgba(196,181,253,.12);
    }

    .admin-sidebar-atmosphere {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    .admin-sidebar-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(65px);
        opacity: .2;
        animation: adminSidebarFloat 12s ease-in-out infinite alternate;
    }

    .admin-sidebar-orb-one {
        width: 230px;
        height: 230px;
        background: #7c3aed;
        top: 5%;
        left: -130px;
    }

    .admin-sidebar-orb-two {
        width: 200px;
        height: 200px;
        background: #2563eb;
        bottom: 8%;
        right: -140px;
        animation-delay: -5s;
    }

    .admin-sidebar-grid {
        position: absolute;
        inset: 0;
        opacity: .07;
        background-image:
            linear-gradient(#a5b4fc 1px, transparent 1px),
            linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: linear-gradient(to bottom, black, transparent 85%);
    }

    .admin-sidebar-logo {
        background: linear-gradient(110deg, #c4b5fd, #60a5fa, #e879f9);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .admin-sidebar-link {
        position: relative;
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 13px 15px;
        border: 1px solid transparent;
        border-radius: 13px;
        color: #94a3b8;
        font-size: 14px;
        font-weight: 500;
        transition:
            transform 300ms ease,
            color 300ms ease,
            background 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
    }

    .admin-sidebar-link:hover {
        color: #e2e8f0;
        background: rgba(139,92,246,.09);
        border-color: rgba(167,139,250,.13);
        transform: translateX(4px);
    }

    .admin-sidebar-link.active {
        color: white;
        background: linear-gradient(
            110deg,
            rgba(124,58,237,.28),
            rgba(99,102,241,.16),
            rgba(139,92,246,.12)
        );
        border-color: rgba(167,139,250,.27);
        box-shadow:
            0 8px 25px rgba(0,0,0,.15),
            inset 0 1px 0 rgba(255,255,255,.06);
    }

    .admin-sidebar-link.active::before {
        content: "";
        position: absolute;
        left: -1px;
        top: 25%;
        height: 50%;
        width: 3px;
        border-radius: 5px;
        background: linear-gradient(#c4b5fd, #60a5fa);
        box-shadow: 0 0 12px rgba(167,139,250,.65);
    }

    .admin-sidebar-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a78bfa;
        transition: transform 300ms ease, color 300ms ease;
    }

    .admin-sidebar-link:hover .admin-sidebar-icon {
        transform: scale(1.1);
        color: #c4b5fd;
    }

    .admin-sidebar-link.active .admin-sidebar-icon {
        color: #c4b5fd;
    }

    .admin-sidebar-footer {
        border-top: 1px solid rgba(196,181,253,.12);
        background: rgba(255,255,255,.025);
    }

    @keyframes adminSidebarFloat {
        from { transform: translate3d(0,0,0) scale(1); }
        to { transform: translate3d(20px,-20px,0) scale(1.12); }
    }

    @media (prefers-reduced-motion: reduce) {
        .admin-sidebar-orb {
            animation: none !important;
        }

        .admin-sidebar-link,
        .admin-sidebar-icon {
            transition: none !important;
        }

        .admin-sidebar-link:hover {
            transform: none !important;
        }
    }
`;

function AdminSidebar() {

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
        { name: "Products", path: "/admin/product-managment", icon: Package },
        { name: "Categories", path: "/admin/categories", icon: Tags },
        { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
        { name: "Users", path: "/admin/users", icon: Users }
    ];

    return (
        <>
            <style>{adminSidebarStyles}</style>

            <aside className="admin-sidebar w-64 min-h-screen flex flex-col text-white p-5">

                {/* Background effects */}
                <div className="admin-sidebar-atmosphere">
                    <div className="admin-sidebar-orb admin-sidebar-orb-one" />
                    <div className="admin-sidebar-orb admin-sidebar-orb-two" />
                    <div className="admin-sidebar-grid" />
                </div>

                {/* Logo */}
                <div className="mb-12 px-3 pt-3">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/20 flex items-center justify-center text-purple-300">
                            <Store size={21} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold tracking-wide">
                                Admin<span className="admin-sidebar-logo">Panel</span>
                            </h2>
                            <p className="text-[10px] text-slate-500 tracking-[2px] uppercase mt-1">
                                Store Management
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mb-4 px-3">
                    <p className="text-[10px] uppercase tracking-[2px] text-slate-500 font-semibold">
                        Main Menu
                    </p>
                </div>

                <nav className="flex flex-col gap-2">

                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `admin-sidebar-link ${isActive ? "active" : ""}`
                                }
                            >
                                <span className="admin-sidebar-icon">
                                    <Icon size={19} strokeWidth={1.8} />
                                </span>

                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}

                </nav>

                {/* Footer */}
                <div className="admin-sidebar-footer mt-auto -mx-5 -mb-5 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                            <Store size={17} className="text-white" />
                        </div>

                        <div>
                            <p className="text-sm text-slate-200 font-medium">
                                Store Admin
                            </p>
                            <p className="text-xs text-slate-500">
                                Management Panel
                            </p>
                        </div>
                    </div>
                </div>

            </aside>
        </>
    );
}

export default AdminSidebar;