import React from "react";
import { Link } from "react-router-dom";
const Layout = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link to={"/"} className="navbar-brand">
                        React Laravel App
                    </Link>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ">
                            <li class="nav-item active">
                                <Link className="nav-link" to={"/"}>
                                    Home
                                </Link>
                            </li>
                            <li class="nav-item active">
                                <Link className="nav-link" to={"/post/create"}>
                                    Create Post
                                </Link>
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
