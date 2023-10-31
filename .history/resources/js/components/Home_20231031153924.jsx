import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
    }

    fetchPosts(page = 1) {
        axios.get("/api/posts/", { params: { page } }).then((response) =>
            this.setState({
                posts: response.data,
            })
        );
    }

    componentDidMount() {
        this.fetchPosts();
    }

    renderPosts() {
        return this.state.posts.data.map((post) => (
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

    renderPaginatorLinks() {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {this.state.posts.data.links((link) => (
                        <li
                            className={`page-item, ${
                                link.active ? "active" : ""
                            }`}
                        >
                            <a className="page-link" href={link.url}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }

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
                                <tbody>
                                    {this.state.posts.data &&
                                        this.renderPosts()}
                                </tbody>
                            </table>
                            {this.state.posts.links &&
                                this.renderPaginatorLinks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
