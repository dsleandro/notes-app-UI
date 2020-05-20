import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useLocation, useHistory } from "react-router-dom";
import { useLogedIn } from "../context/AuthContext";
import {PATH_NOTES} from "../helpers/Constants";
import { TrashIcon, PencilIcon, Spinner } from "./Icons";

export default function NoteList(props) {

    const [notes, setNotes] = useState(null);
    const [mouseHover, setMouseHover] = useState({ hover: false, i: null });
    const logged = useLogedIn();
    const location = useLocation();
    const history = useHistory();

    axios.defaults.headers.common['Authorization'] = localStorage.getItem("auth");
    axios.defaults.headers.common['username'] = localStorage.getItem("user");

    useEffect(() => {
        if (location.state) {
            var url = new URL(PATH_NOTES + "search"),
                params = { query: location.state };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            axios.get(url).then((res) => setNotes(res.data));

        } else {

            axios.get(PATH_NOTES).then((res) => setNotes(res.data));
        }
    }, [logged, location]);

    const getNotes = async () => {
        const res = await axios.get(PATH_NOTES);
        setNotes(res.data);
    }

   

    const handleDeleteNote = async (id) => {
        await axios.delete(PATH_NOTES + id);
        getNotes();
    }

    const handleEditNote = async (note) => {
        props.editNote(note);
        history.push("/edit/" + note.id)
    }

    if (notes === null) {
        return <Spinner />
    } else {

        return (
            <div className="row">
                {
                    notes.map((note, i) =>
                        <div className="col-md-4 p-2" key={note.id} >
                            <div className="card"

                                onMouseEnter={() => setMouseHover(prevState => ({ ...prevState, hover: true, i: i }))}
                                onMouseLeave={() => setMouseHover(prevState => ({ ...prevState, hover: false, i: i }))}
                            >
                                <div id="cardTitle">
                                    <h4>{note.title}</h4>
                                </div>
                                <div id="cardContent">
                                    <pre id="preTagNotes">{note.content}</pre>
                                </div>
                                <div id="cardFooter">
                                    {mouseHover.hover ? <>  {mouseHover.i === i ? <>
                                        <button className="btn btn-white footBtn"
                                            onClick={() => handleDeleteNote(note.id)}
                                        ><TrashIcon/></button>
                                        <button className="btn btn-white footBtn" onClick={() => handleEditNote(note)} ><PencilIcon/></button> </> : null}
                                    </> : null}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

}