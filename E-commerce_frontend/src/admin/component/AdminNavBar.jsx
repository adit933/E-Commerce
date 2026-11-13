import React from "react";
import { Bell, UserCircle, Search } from "lucide-react";

const adminNavbarStyles = `
    .admin-navbar {
        position: relative;
        isolation: isolate;
        background:
            radial-gradient(ellipse at 15% -100%, rgba(124,58,237,.22), transparent 65%),
            linear-gradient(110deg, rgba(11,16,32,.97), rgba(12,13,29,.97));
        border-bottom: 1px solid rgba(196,181,253,.14);
        box-shadow: 0 8px 30px rgba(0,0,0,.12);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }

    .admin-navbar::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(139,92,246,.35),
            rgba(96,165,250,.25),
            transparent
        );
        pointer-events: none;
    }

    .admin-navbar-heading {
        background: linear-gradient(110deg, #c4b5fd, #93c5fd, #e879f9);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .admin-navbar-action {
        position: relative;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        color: #a5b4fc;
        background: rgba(139,92,246,.08);
        border: 1px solid rgba(167,139,250,.13);
        transition: all 300ms ease;
    }

    .admin-navbar-action:hover {
        color: #e9d5ff;
        background: rgba(139,92,246,.17);
        border-color: rgba(167,139,250,.32);
        transform: translateY(-2px);
        box-shadow: 0 8px 22px rgba(124,58,237,.16);
    }

    .admin-navbar-profile {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 7px 13px;
        border-radius: 14px;
        background: linear-gradient(
            135deg,
            rgba(255,255,255,.065),
            rgba(255,255,255,.02)
        );
        border: 1px solid rgba(196,181,253,.12);
        transition: all 300ms ease;
    }

    .admin-navbar-profile:hover {
        background: rgba(139,92,246,.09);
        border-color: rgba(167,139,250,.25);
    }

    .admin-navbar-avatar {
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        color: white;
        background: linear-gradient(135deg, #7c3aed, #6366f1, #2563eb);
        box-shadow: 0 5px 18px rgba(124,58,237,.25);
    }

    .admin-navbar-notification-dot {
        position: absolute;
        top: 9px;
        right: 9px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #c084fc;
        box-shadow: 0 0 9px rgba(192,132,252,.8);
    }

    @media (prefers-reduced-motion: reduce) {
        .admin-navbar-action,
        .admin-navbar-profile {
            transition: none !important;
        }

        .admin-navbar-action:hover {
            transform: none !important;
        }
    }
`;

function AdminNavBar() {
    return (
        <>
            <style>{adminNavbarStyles}</style>

            <header className="admin-navbar h-20 flex items-center justify-between px-5 sm:px-8">

                {/* Page Heading */}
                <div>
                    <h1 className="text-xl font-semibold admin-navbar-heading">
                        Admin Dashboard
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Manage your store efficiently
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 sm:gap-5">

                    {/* Notifications */}
                    <button
                        type="button"
                        className="admin-navbar-action"
                        aria-label="Notifications"
                    >
                        <Bell size={19} />
                        <span className="admin-navbar-notification-dot" />
                    </button>

                    {/* Admin Profile */}
                    <div className="admin-navbar-profile">

                        <div className="admin-navbar-avatar">
                            <UserCircle size={23} />
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-slate-200">
                                Administrator
                            </p>

                            <p className="text-[11px] text-slate-500 mt-0.5">
                                Store Admin
                            </p>
                        </div>

                    </div>

                </div>

            </header>
        </>
    );
}

export default AdminNavBar;