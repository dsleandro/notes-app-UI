import React, { useState } from "react";
import axios from "axios";
import {PATH_USER} from "../helpers/Constants";

export default function SignUp() {

    const [inputs, setInputs] = useState({ username: "", password: "", confirmPassword: "" });
    const [isError, setIsError] = useState(0);

    function handleInputs(e) {
        var field = e.target;
        setInputs((prevState) => {
            return { ...prevState, [field.name]: field.value }
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (inputs.password === inputs.confirmPassword) {
            delete inputs.confirmPassword;
            await axios.post(PATH_USER + '/signup', inputs);

        } else setIsError(isError + 1)

    }

    return (
        <div className="container">
            <div className="card-body formSignin">
                <h3>Create new user</h3>
                {isError > 0 ? <div> Password do not match</div> : null}
                <form onSubmit={(e) => handleSubmit(e)}>
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
                            autoComplete="new-password"
                            minLength="8"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            onChange={(e) => handleInputs(e)}
                            placeholder="Confirm Password"
                            required
                            autoComplete="new-password"
                            minLength="8"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary col-md-5">Save</button>
                </form>
            </div>
        </div>
    )

}