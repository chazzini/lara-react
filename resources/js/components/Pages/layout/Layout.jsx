import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
const Layout = (props) => {
    const navigate = useNavigate();
    const handleLogout = (event) => {
        axios.post("/api/logout").then((response) => navigate("/login"));
    };

    useEffect(() => {
        axios.post("/api/posts").catch((error) => {
            if (error.response.status === 401) {
                navigate("/login");
            }
        });
    });

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <NavLink to={"/posts"} className="navbar-brand">
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
                                    to={"/posts"}
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
                                    to={"/posts/create"}
                                >
                                    Create Post
                                </NavLink>
                            </li>
                        </ul>

                        <button
                            className="my-2 my-lg-0 btn btn-outline-danger navbar-text"
                            type="button"
                            onClick={(event) => handleLogout(event)}
                        >
                            Logout
                        </button>
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
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Layout;
