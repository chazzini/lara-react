import React, { Component } from "react";
import Layout from "./Pages/layout/Layout";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            categories: [],
            query: {
                page: 1,
                category_id: "",
                order_column: "id",
                order_direction: "asc",
            },
        };
    }

    fetchPosts() {
        axios
            .get("/api/posts/", { params: this.state.query })
            .then((response) =>
                this.setState({
                    posts: response.data,
                })
            );
    }
    fetchCategories() {
        axios.get("/api/categories/").then((response) =>
            this.setState({
                categories: response.data.data,
            })
        );
    }

    componentDidMount() {
        this.fetchPosts();
        this.fetchCategories();
    }
    // componentDidUpdate() {
    //     this.fetchPosts();
    // }

    renderCategories() {
        return (
            <select
                className="form-control"
                onChange={(event) => {
                    this.setFilterCategory(event.target.value);
                }}
            >
                <option value=""> -- filter by category --</option>
                {this.state.categories.map((category) => {
                    return (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    );
                })}
            </select>
        );
    }

    setFilterCategory(id) {
        console.log(id);
        this.setState(
            {
                query: {
                    page: 1,
                    category_id: id,
                },
            },
            () => {
                this.fetchPosts();
            }
        );
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

            console.log(page);

            this.setState(
                {
                    query: {
                        ...this.state.query,
                        page: page,
                    },
                },
                () => {
                    this.fetchPosts();
                }
            );
        }
    }
    renderPaginator() {
        return (
            <p>
                Showing {this.state.posts.meta.current_page} to{" "}
                {this.state.posts.meta.to} of {this.state.posts.meta.total}
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

    orderbyColumnIcon(column) {
        let icon = "fa-sort-up";

        if (this.state.query.order_column === column) {
            icon =
                this.state.query.order_direction === "asc" ? (
                    <i className="fas fa-sort-up"></i>
                ) : (
                    <i className="fas fa-sort-down"></i>
                );
        }

        return <i className={`fas ${icon}`}></i>;
    }

    updateOrder(column) {
        let direction = "asc";
        if (this.state.query.order_column === column) {
            direction =
                this.state.query.order_direction == "asc" ? "desc" : "asc";
        }

        this.setState(
            {
                query: {
                    page: 1,
                    category_id: "",
                    order_column: column,
                    order_direction: direction,
                },
            },
            this.fetchPosts()
        );
    }

    render() {
        return (
            <Layout header={this.state.categories && this.renderCategories()}>
                <div className="card-body">
                    <table className="table align-middle mb-0 bg-white">
                        <thead className="bg-light">
                            <tr>
                                <th>
                                    <div
                                        onClick={() => this.updateOrder("id")}
                                        className="btn-group"
                                        role="group"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-link py-0 pl-0 pr-1"
                                        >
                                            ID
                                        </button>
                                        {this.orderbyColumnIcon("id")}
                                    </div>
                                </th>
                                <th>
                                    <div
                                        onClick={() =>
                                            this.updateOrder("title")
                                        }
                                        className="btn-group"
                                        role="group"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-link py-0 pl-0 pr-1"
                                        >
                                            Title
                                        </button>

                                        {this.orderbyColumnIcon("title")}
                                    </div>
                                </th>
                                <th>Content</th>
                                <th>Category</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.posts.data && this.renderPosts()}
                        </tbody>
                    </table>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            {this.state.posts?.meta && this.renderPaginator()}
                        </div>
                        <div className="col-md-8 d-flex justify-content-end">
                            {this.state.posts.meta?.links &&
                                this.renderPaginatorLinks()}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Home;
