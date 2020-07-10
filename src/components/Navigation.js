import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "../helpers/PrivateRoute";
import { useLogedIn } from "../context/AuthContext";
import { UserCircle, SearchIcon, SignOutIcon } from "./Icons";

export default function Navigation(props) {
    const history = useHistory();
    const [search, setSearch] = useState();
    const [responsive, setResponsive] = useState(false);
    const logged = useLogedIn();


    function handlelogOut() {
        Auth.signout(() => {
            history.push("/signin");
        });
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
    }

    async function handleSearch(e) {
        e.preventDefault();

        history.push({
            pathname: "/search",
            search: "?query=" + search,
            state: search,
        });

        //Hide form when window is smaller than 768px
        setResponsive(false)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="collapse navbar-collapse brand" id="navbarNavAltMarkup">
                    <Link className="navbar-brand" to="/">
                        Notes App
                    </Link>
                </div>

                {Auth.isAuthenticated ?
                    <form className="form-inline w-30 mx-3 large-screen-search"

                        /*show form on click responsive button*/
                        id={responsive ? "display" : null}

                        onSubmit={(e) => handleSearch(e)}>
                        <input type="search" name="search" placeholder="Search"
                            className="form-control" onChange={(e) => setSearch(e.target.value)}
                        /> <button type="submit" className="btn btn-light mx-1"> <SearchIcon /> </button>
                    </form>
                    : null}

                {/* Hidden button for respopsive design */}
                <button onClick={() => setResponsive(true)} id={responsive ? "doNotDisplay" : null} className="btn btn-light mx-3 small-screen-search"> <SearchIcon /> </button>

                <ul className="navbar-nav  ml-auto">
                    {Auth.isAuthenticated ? null : <> <Link className="btn btn-dark" to="/">Sign in</Link>
                        <Link className="btn btn-dark" to="/signup">Sign up</Link> </>}

                </ul>
                <div className="btn-group" id={responsive ? "doNotDisplay" : null}>
                    {Auth.isAuthenticated ?
                        <>
                            <button type="button" id="user" className="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <UserCircle /> &nbsp;
                                {logged.user}
                            </button>

                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/create">Create note</Link>
                                <Link className="dropdown-item" to="#">User profile</Link>
                                <div className="dropdown-divider"></div>
                                <button onClick={() => handlelogOut()} className="dropdown-item">Log out &nbsp; &nbsp;<SignOutIcon /></button>

                            </div>
                        </>
                        : null}
                </div>

            </div>
        </nav>
    )
}