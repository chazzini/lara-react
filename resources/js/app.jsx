import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import CreatePost, {
    CreatePostWithNavigation,
} from "./components/Pages/CreatePost";
import NotFound from "./components/Pages/errors/NotFound";
import EditPost, { EditPostWithNavigation } from "./components/Pages/EditPost";
import Layout from "./components/Pages/layout/Layout";
import AuthLayout from "./components/Pages/layout/AuthLayout";
import Login from "./components/Pages/auth/Login";
import Register from "./components/Pages/auth/Register";
import { AbilityContext } from "./Abilities/Can";
import Ability from "./Abilities/Ability";
const app = document.getElementById("app");

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="posts" Component={Layout}>
                <Route index Component={Home} />
                <Route path="/posts/create" Component={CreatePost} />
                <Route path="/posts/edit/:id" Component={EditPost} />
            </Route>
            <Route Component={AuthLayout}>
                <Route path="login" Component={Login} />
                <Route path="register" Component={Register} />
            </Route>
            <Route path="*" element={<Navigate to="/posts" replace />} />
        </>
    )
);

ReactDOM.createRoot(app).render(
    <AbilityContext.Provider value={Ability}>
        <RouterProvider router={router} />
    </AbilityContext.Provider>
);
