import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import CreatePost, {
    CreatePostWithNavigation,
} from "./components/Pages/CreatePost";
import NotFound from "./components/Pages/errors/NotFound";

const app = document.getElementById("app");

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/post/create",
        element: <CreatePostWithNavigation />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

ReactDOM.createRoot(app).render(<RouterProvider router={router} />);
