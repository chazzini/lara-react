import React from "react";
import Layout from "../layout/Layout";

const NotFound = () => {
    return (
        <Layout header="Page not found">
            <div className="d-flex justify-content-center align-items-center">
                <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">
                    404
                </h1>
                <div className="inline-block align-middle">
                    <h2 className="font-weight-normal lead" id="desc">
                        The page you requested was not found.
                    </h2>
                </div>
            </div>
        </Layout>
    );
};

export default NotFound;
