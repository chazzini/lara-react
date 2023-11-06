import React, { Component } from "react";
import Layout from "./layout/Layout";
import SelectCategories from "./partials/SelectCategory";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const EditPostWithNavigation = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    return <EditPost {...props} navigate={navigate} params={params}></EditPost>;
};

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id,
            categories: [],
            query: {
                title: "",
                content: "",
                category_id: "",
            },
            errors: [],
            isloading: false,
        };
    }

    updateContent(event) {
        this.setState({
            query: {
                ...this.state.query,
                content: event.target.value,
            },
        });
    }

    updateTitle(event) {
        this.setState((prevState) => ({
            query: {
                ...this.state.query,
                title: event.target.value,
            },
        }));
    }

    updateCategoryId(event) {
        this.setState((prevState) => ({
            query: {
                ...this.state.query,
                category_id: event.target.value,
            },
        }));
    }

    fetchCategories() {
        axios.get("/api/categories/").then((response) =>
            this.setState({
                categories: response.data.data,
            })
        );
    }
    fetchPost() {
        this.setState({
            isloading: true,
        });
        axios
            .get(`/api/posts/${this.state.id}`)
            .then((response) => {
                this.setState({
                    query: {
                        title: response.data?.data?.title,
                        content: response.data?.data?.content,
                        category_id: response.data?.data?.category.id,
                    },
                });
            })
            .finally(() =>
                this.setState({
                    isloading: false,
                })
            );
    }

    componentDidMount() {
        this.fetchPost();
        this.fetchCategories();
    }

    updatePost(event) {
        if (this.state.isloading) return;

        this.setState({
            errors: {},
            isloading: true,
        });

        axios
            .put(`/api/posts/${this.state.id}`, this.state.query)
            .then((response) => {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: "Post successfully updated",
                });
                this.props.navigate("/");
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: error.response.data.message,
                });
                this.setState({ errors: error.response?.data.errors });
            })
            .finally(() =>
                this.setState({
                    isloading: false,
                })
            );
    }

    errorMessage(field) {
        if (!this.state.errors || !this.state.errors[field]) return;
        return (
            <div id="emailHelp" className="form-text text-danger">
                {this.state.errors[field] &&
                    this.state.errors[field].map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
            </div>
        );
    }

    render() {
        return (
            <Layout header="Edit Post">
                <div className="card-body">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            this.updatePost(event);
                        }}
                    >
                        <div className="mb-3">
                            <label for="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                autoFocus
                                onChange={(event) => this.updateTitle(event)}
                                value={this.state.query.title}
                            />
                            {this.errorMessage("title")}
                        </div>

                        <div className="mb-3">
                            <label className="form-check-label" for="content">
                                Content
                            </label>
                            <textarea
                                className="form-control"
                                id="textarea"
                                rows="3"
                                onChange={(event) => this.updateContent(event)}
                                value={this.state.query.content}
                            ></textarea>
                            {this.errorMessage("content")}
                        </div>
                        <div className="mb-3">
                            <label className="form-check-label" for="content">
                                Select Category
                            </label>
                            <SelectCategories
                                categories={this.state.categories}
                                selectedFunc={(event) => {
                                    this.updateCategoryId(event);
                                }}
                                selected_id={this.state.query.category_id}
                            />
                            {this.errorMessage("category_id")}
                        </div>

                        <button type="submit" className="btn btn-primary">
                            {this.state.isloading ? "...loading" : "Update"}
                        </button>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default EditPost;
