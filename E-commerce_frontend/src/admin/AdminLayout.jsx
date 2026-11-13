
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./component/AdminSideBar";
import AdminNavBar from "./component/AdminNavBar";

function AdminLayout() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-950">

            <AdminSideBar />

            <div className="flex-1 min-w-0 min-h-0 h-full flex flex-col overflow-hidden">

                <AdminNavBar />

                <main className="flex-1 min-h-0 min-w-0 w-full overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;
