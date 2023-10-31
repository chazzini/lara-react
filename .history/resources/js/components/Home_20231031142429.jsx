import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
    }

    fetchPosts() {
        axios.get("/api/posts/").then((response) =>
            this.setState({
                posts: response.data.data,
            })
        );
    }

    componentDidMount() {
        this.fetchPosts();
    }

    renderPosts() {
        return this.state.posts.map((post) => (
            <tr>
                <td>{post.id}</td>
                <td>
                    <p className="fw-normal mb-1">{post.title}</p>
                </td>
                <td>{post.content}</td>
                <td>{post.created_at}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                    >
                        Edit
                    </button>
                </td>
            </tr>
        ));
    }

    renderPagination() {}

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">Table</div>

                        <div className="card-body">
                            <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>{this.renderPosts()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
