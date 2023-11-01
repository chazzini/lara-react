import React from "react";
import { NavLink } from "react-router-dom";
const Layout = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <NavLink to={"/"} className="navbar-brand">
                        React Laravel App
                    </NavLink>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ">
                            <li className="nav-item active">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "active nav-link"
                                            : "nav-link"
                                    }
                                    to={"/"}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "active nav-link"
                                            : "nav-link"
                                    }
                                    to={"/post/create"}
                                >
                                    Create Post
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card container">
                            <div className="card-header row">
                                <div className="col-md-4">{props.header}</div>
                            </div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Layout;
