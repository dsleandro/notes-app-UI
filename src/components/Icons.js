import React from "react";

function TrashIcon(props) {
    return (
        <i className="fas fa-trash-alt" style = {{ fontSize: 1.1 + "em", color: "black"}}></i>
    )
}

function SearchIcon(props) {
    return (
        <i className="fas fa-search" style = {{ fontSize: 1.1 + "em" }}></i>
    )
}

function UserCircle(props) {
    return (
        <i role="img" aria-label="User icon" className="fas fa-user-circle" style = {{ fontSize: 1.5 + "em" }}></i>
    )
}
function PencilIcon(props) {
    return (
        <i role="img" aria-label="Edit" className="fas fa-pencil-alt" style = {{ fontSize: 1.1 + "em" }}></i>
    )
}

function Spinner(props) {
    return(
    <i role="img" aria-hidden="true" className="fas fa-spinner fa-spin"></i>
    )
}

function SignOutIcon(props) {
    return (
        <i className="fas fa-sign-out-alt" ></i>
    )
}

export { Spinner, PencilIcon, UserCircle, SearchIcon, TrashIcon, SignOutIcon };
/* style = {{ fontSize: 1.6 + "em",  }} */