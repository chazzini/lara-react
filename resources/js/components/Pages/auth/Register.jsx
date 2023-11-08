import React from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
    return (
        <>
            <h3>Register</h3>
            <hr />
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                    />
                </div>
                <NavLink
                    type="button"
                    className="btn btn-link"
                    to="/auth/register"
                >
                    Already have an account login
                </NavLink>
            </form>
        </>
    );
};

export default Register;
