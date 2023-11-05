import React, { Component } from "react";
import Layout from "./layout/Layout";
import SelectCategories from "./partials/SelectCategory";
import { useNavigate } from "react-router-dom";

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

    componentDidMount() {
        this.fetchCategories();
    }

    createPost(event) {
        if (this.state.isloading) return;

        this.setState({
            errors: {},
            isloading: true,
        });

        axios
            .post("/api/posts", this.state.query)
            .then((response) => this.props.navigate("/"))
            .catch((error) => {
                console.log(error);
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
            <Layout header="Create Post">
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
                        <button type="submit" className="btn btn-primary">
                            {this.state.isloading ? "...loading" : "Submit"}
                        </button>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default CreatePost;
