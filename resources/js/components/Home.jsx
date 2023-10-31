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
            <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                    <p className="fw-normal mb-1">{post.title}</p>
                </td>
                <td>{post.content}</td>
                <td>{post.category.name}</td>
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

    navigatePaginator(url) {
        if (url) {
            const fullUrl = new URL(url);
            const page = fullUrl.searchParams.get("page");
            this.fetchPosts(page);
        }
    }
    renderPaginator() {
        return (
            <p>
                showing page {this.state.posts.meta.current_page} out of{" "}
                {this.state.posts.meta.last_page}
            </p>
        );
    }

    renderPaginatorLinks() {
        return (
            <nav aria-label="Page navigation example ">
                <ul className="pagination">
                    {this.state.posts.meta.links.map((link, index) => (
                        <li
                            key={index}
                            className={`page-item, ${
                                link.active ? "active" : ""
                            }`}
                        >
                            <a
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                onClick={() => this.navigatePaginator(link.url)}
                                className="page-link"
                            ></a>
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
                                        <th>Category</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.posts.data &&
                                        this.renderPosts()}
                                </tbody>
                            </table>
                            <div className="row mt-3">
                                <div className="col-md-4">
                                    {this.state.posts?.meta &&
                                        this.renderPaginator()}
                                </div>
                                <div className="col-md-8 d-flex justify-content-end">
                                    {this.state.posts.meta?.links &&
                                        this.renderPaginatorLinks()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
