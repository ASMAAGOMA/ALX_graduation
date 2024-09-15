import React from 'react';
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
    const currentUser = "Emma Brewster"; // This can come from state or props
    const status = "Online"; // Similarly, this can be dynamic

    return (
        <>
            <DashHeader />
            <div className="dash_container">
                <Outlet />
            </div>
            <DashFooter currentUser={currentUser} status={status} />
        </>
    );
};

export default DashLayout;