import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="back">
            <div className="div-center">
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
