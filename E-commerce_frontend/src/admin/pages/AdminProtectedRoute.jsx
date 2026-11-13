import React, { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
    const {user} = useContext(AuthContext)

    if(!user)
    {
        return <Navigate to="/admin/login" replace/>
    }

    if(user?.role !== "admin")
    {
        return <Navigate to = "/" replace state={{
            error : "Access Denied! You are not authorized to access admin pages."
        }}/>
    }

    return <Outlet/>
}

export default AdminProtectedRoute