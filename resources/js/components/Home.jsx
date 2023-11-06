import React, { Component } from "react";
import Layout from "./Pages/layout/Layout";

import SelectCategories from "./Pages/partials/SelectCategory";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

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
                global: "",
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

    deletePost(event) {
        Swal.fire({
            title: "Are you sure want to delete this post ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete("/api/posts/" + event.target.value)
                    .then((response) => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your post has been deleted.",
                            icon: "success",
                        });
                        this.fetchPosts();
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Oops!",
                            text: "somthing went wrong ",
                            icon: "error",
                        });
                    });
            }
        });
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

    setFilterCategory(event) {
        this.setState(
            {
                query: {
                    ...this.state.query,
                    page: 1,
                    category_id: event.target.value,
                },
            },
            () => {
                this.fetchPosts();
            }
        );
    }
    filterGlobal(event) {
        this.setState(
            {
                query: {
                    ...this.state.query,
                    page: 1,
                    global: event.target.value,
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
                    <NavLink
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                        to={`post/edit/${post.id}`}
                    >
                        Edit
                    </NavLink>
                    <button
                        type="button"
                        className="btn btn-danger"
                        value={post.id}
                        onClick={(event) => this.deletePost(event)}
                    >
                        Delete
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
            <Layout
                header={
                    this.state.categories && (
                        <SelectCategories
                            categories={this.state.categories}
                            selectedFunc={(event) => {
                                this.setFilterCategory(event);
                            }}
                        />
                    )
                }
            >
                <input
                    type="text"
                    value={this.state.query.global}
                    onChange={(event) => this.filterGlobal(event)}
                    placeholder="search..."
                />
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
