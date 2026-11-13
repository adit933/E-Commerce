import React from "react";

const adminStatCardStyles = `
    .admin-stat-card {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        background:
            radial-gradient(
                circle at 100% 0%,
                rgba(124,58,237,.13),
                transparent 45%
            ),
            linear-gradient(
                145deg,
                rgba(17,24,39,.95),
                rgba(11,16,32,.96)
            );
        border: 1px solid rgba(167,139,250,.13);
        border-radius: 18px;
        padding: 24px;
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        box-shadow: 0 8px 25px rgba(0,0,0,.12);
        transition:
            transform 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
    }

    .admin-stat-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 12%;
        width: 76%;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(196,181,253,.55),
            rgba(96,165,250,.4),
            transparent
        );
        pointer-events: none;
    }

    .admin-stat-card:hover {
        transform: translateY(-5px);
        border-color: rgba(167,139,250,.35);
        box-shadow:
            0 15px 35px rgba(0,0,0,.2),
            0 0 25px rgba(124,58,237,.09);
    }

    .admin-stat-card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 13px;
        color: #c4b5fd;
        background: linear-gradient(
            135deg,
            rgba(124,58,237,.22),
            rgba(59,130,246,.13)
        );
        border: 1px solid rgba(167,139,250,.2);
        box-shadow: 0 5px 18px rgba(124,58,237,.1);
        transition:
            transform 300ms ease,
            box-shadow 300ms ease;
    }

    .admin-stat-card:hover .admin-stat-card-icon {
        transform: scale(1.08) rotate(-3deg);
        box-shadow: 0 7px 22px rgba(124,58,237,.2);
    }

    .admin-stat-card-title {
        color: #a5b4fc;
    }

    .admin-stat-card-value {
        background: linear-gradient(110deg, #f8fafc, #c4b5fd, #93c5fd);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .admin-stat-card-description {
        color: #64748b;
    }

    @media (prefers-reduced-motion: reduce) {
        .admin-stat-card,
        .admin-stat-card-icon {
            transition: none !important;
        }

        .admin-stat-card:hover {
            transform: none !important;
        }

        .admin-stat-card:hover .admin-stat-card-icon {
            transform: none !important;
        }
    }
`;

function AdminStatCard({ title, value, description, icon: Icon }) {
    return (
        <>
            <style>{adminStatCardStyles}</style>

            <div className="admin-stat-card">

                <div className="flex items-center justify-between gap-4">

                    <p className="admin-stat-card-title text-sm font-medium">
                        {title}
                    </p>

                    {Icon && (
                        <div className="admin-stat-card-icon shrink-0">
                            <Icon size={22} strokeWidth={1.8} />
                        </div>
                    )}

                </div>

                <h2 className="admin-stat-card-value text-3xl font-bold mt-6">
                    {value}
                </h2>

                <p className="admin-stat-card-description text-sm mt-2">
                    {description}
                </p>

            </div>
        </>
    );
}

export default AdminStatCard;