import React, { Component } from "react";
import Layout from "./layout/Layout";

class CreatePost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout header="Create Post">
                <div className="card-body">
                    <div>create Post</div>;
                </div>
            </Layout>
        );
    }
}

export default CreatePost;
