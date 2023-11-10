import React, { Component } from "react";
import SelectCategories from "./partials/SelectCategory";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CreatePostWithNavigation = (props) => {
    const navigate = useNavigate();
    return <CreatePost navigate={navigate}></CreatePost>;
};

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            query: {
                title: "",
                content: "",
                category_id: "",
                thumbnail: "",
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
    updateThumbnail(event) {
        this.setState((prevState) => ({
            query: {
                ...this.state.query,
                thumbnail: event.target.files[0],
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

    componentDidMount() {
        this.fetchCategories();
    }

    createPost(event) {
        if (this.state.isloading) return;

        this.setState({
            errors: {},
            isloading: true,
        });

        let postData = new FormData();
        postData.append("title", this.state.query.title);
        postData.append("content", this.state.query.content);
        postData.append("category_id", this.state.query.category_id);
        postData.append("thumbnail", this.state.query.thumbnail);

        axios
            .post("/api/posts", postData)
            .then((response) => {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: "Post successfully created",
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
            <>
                <div className="card-body">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            this.createPost(event);
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
                                value={this.state.title}
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
                                value={this.state.content}
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
                            />
                            {this.errorMessage("category_id")}
                        </div>
                        <div className="mb-3">
                            <label for="thumbnail" className="form-label">
                                Thumbnail
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="thumbnail"
                                autoFocus
                                onChange={(event) =>
                                    this.updateThumbnail(event)
                                }
                            />
                            {this.errorMessage("thumbnail")}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {this.state.isloading ? "...loading" : "Submit"}
                        </button>
                    </form>
                </div>
            </>
        );
    }
}

export default CreatePost;
