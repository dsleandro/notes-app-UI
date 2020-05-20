import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLogedIn } from "../context/AuthContext";
import { PATH_NOTES } from "../helpers/Constants";


export default function CreateNote(props) {

    const [note, setNote] = useState({
        title: props.editNote ? props.editNote.title : '',
        content: props.editNote ? props.editNote.content : '',
        id: props.editNote ? props.editNote.id : ''
    });
    const logged = useLogedIn();
    const history = useHistory();
    //set a default header
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("auth");
    axios.defaults.headers.common['username'] = localStorage.getItem("user");


    async function handleSubmit(e) {
        e.preventDefault();
        const newNote = {
            title: note.title,
            content: note.content,
            user: { username: logged.user },
        };

        if (props.editNote) {

            await axios.put(PATH_NOTES + note.id, newNote);

        } else {

            await axios.post(PATH_NOTES, newNote);
        }
    
        history.push("/");
        
    }
    function handleInputs(e) {
        var field = e.target;
        setNote((prevState) => { return { ...prevState, [field.name]: field.value } })
    }

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Title"
                            onChange={(e) => handleInputs(e)}
                            value={note.title}
                            autoFocus={true}
                            name="title" required />
                    </div>

                    <div className="form-group">
                        <textarea name="content"
                            className="form-control"
                            onChange={(e) => handleInputs(e)}
                            value={note.content}
                            placeholder="Content"></textarea>
                    </div>
                    <button type="submit" className="col-md-4 btn btn-primary">Save</button>
                    <button type="reset" className=" col-md-4 btn btn-light" onClick={() => history.push("/")}>Cancel</button>
                </form>
            </div>

        </div>
    )
}