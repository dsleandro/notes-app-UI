import React, { useState } from "react";
import axios from "axios";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Auth } from "../helpers/PrivateRoute";
import { useLogedIn } from "../context/AuthContext";
import {PATH_USER} from "../helpers/Constants";

export default function SignIn() {
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const [isError, setIsError] = useState(0);
    const history = useHistory();
    const logged = useLogedIn();


    function handleInputs(e) {
        var field = e.target;
        setInputs((prevState) => {
            return { ...prevState, [field.name]: field.value }
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios.post(PATH_USER + '/login', inputs).then((res) => {

            if (res.headers.authorization) {
                localStorage.setItem("auth", res.headers.authorization);
                localStorage.setItem("user", res.headers.user);
                logged.setUser(res.headers.user);
                Auth.authenticate(() => {
                    history.push("/");
                });

            } else {
                setIsError(isError + 1);
            }
        });

    }
    if (Auth.isAuthenticated === true) {
        return <Redirect to="/" />
    }
    return (
        <div className="container">
            <div className="divSignin">
               
                {isError > 0 ? <div className="errorMessage">Incorrect username or password</div> : null}
                <form className="formSignin" onSubmit={(e) => handleSubmit(e)}>
                <h3 id="welcomeBack">Welcome back!</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            onChange={(e) => handleInputs(e)}
                            placeholder="Username"
                            value={inputs.username}
                            required
                            autoComplete="username"
                        />
                        <input
                            type="password"
                            name="password"
                            className="form-control my-2"
                            onChange={(e) => handleInputs(e)}
                            placeholder="Password"
                            minLength="8"
                            autoComplete="current-password"
                        />
                    </div>
                  
                    <button type="submit" className="btn btn-primary col-md-5">Sign in</button>
                    <Link id="forgotPassword" to="">Forgot Password?</Link>
                </form>
            </div>
        </div>
    )
}
