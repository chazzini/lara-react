import { Ability, AbilityBuilder } from "@casl/ability";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AbilityContext } from "../../../Abilities/Can";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const ability = useContext(AbilityContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);
        axios
            .post("/api/login", { email, password })
            .then((response) => {
                axios.get("/api/abilities").then((response) => {
                    const { can, rules } = new AbilityBuilder(Ability);
                    can(response.data);
                    ability.update(rules);
                });
                navigate("/posts");
            })
            .catch((error) => setError(true));
    };

    return (
        <>
            <h3>Login</h3>
            <hr />
            {error && (
                <div class="alert alert-danger" role="alert">
                    Invalid username or password
                </div>
            )}
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <hr />
                <NavLink
                    type="button"
                    className="btn btn-link"
                    to="/auth/register"
                >
                    Signup
                </NavLink>
            </form>
        </>
    );
};

export default Login;
