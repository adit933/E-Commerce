
import React, { useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {

    const { admin, loading } = useContext(AdminAuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
