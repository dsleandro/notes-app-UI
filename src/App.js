import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import './App.css';
import PrivateRoute, { Auth } from "./helpers/PrivateRoute";
import { LogedIn } from "./context/AuthContext";


import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import CreateNote from "./components/CreateNote";
import NoteList from "./components/NoteList";
import SignIn from "./components/SignIn";

const ButtonNewNote = () => <Link className="btn btn-primary" to={"/create"}>Create new note</Link>;

function App() {

  const [user, setUser] = useState();
  const [noteToEdit, setNoteToEdit] = useState(null);

  //save user details
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      const data = localStorage.getItem("user");
      setUser(data);
      Auth.authenticate(() => {
        return <Redirect to="/" />
      });
    }
  }, []);



  return (
    <Router>
      <LogedIn.Provider value={{user, setUser}}>

        <Navigation />
        <div className="container p-4">
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
          <PrivateRoute path="/edit/:id">
            <CreateNote editNote={noteToEdit} />
          </PrivateRoute>
          <PrivateRoute path="/create" >
            <CreateNote/>
          </PrivateRoute>
          <PrivateRoute path="/search" exact>
            <NoteList editNote={setNoteToEdit} />
          </PrivateRoute>
          <PrivateRoute path="/" exact >
            <ButtonNewNote/>
            <NoteList editNote={setNoteToEdit} />
          </PrivateRoute>
        </div>
      </LogedIn.Provider>
    </Router>
  );
}

export default App;
