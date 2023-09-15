import { useState } from "react";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import Notes from "./Notes";
import Note from "./Note";
import Login from "./Login";

const notes = [
  {
    "content": "the app is in redux store",
    "important": true,
    "id": 1
  },
  {
    "content": "state changes are made with actions",
    "important": false,
    "id": 2
  },
  {
    "content": "this is new note",
    "important": true,
    "id": 3
  },
  {
    "content": "hello tej ",
    "important": true,
    "id": 4
  },
  {
    "content": "this is lshu",
    "important": true,
    "id": 5
  },
  {
    "content": "hi i am me",
    "important": true,
    "id": 6
  },
  {
    "content": "hey how you feeling today",
    "important": true,
    "id": 7
  },
];

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
  </div>
);

const Users = () => (
  <div>
    <h2>Users</h2>
  </div>
);

const App = () => {

  const [user, setUser] = useState(null);

  const match = useMatch("/notes/:id");
  const note = match ? notes.find((note) => note.id == match.params.id) : null;

  const padding = {
    padding: 5,
  };

  return (
    <>

      <div>

        <Link style = {padding} to = "/">
          home  
        </Link>
        <Link style = {padding} to = "/notes">
          notes
        </Link>
        <Link style = {padding} to = "/users">
          users
        </Link>
        {user ? (
          <em> {user} logged in</em>
          ) : (
            <Link style = {padding} to = "/login">
              login
            </Link>
          ) 
        }

      </div>

      <Routes>
        <Route path = "/notes/:id" element = {<Note note = {note} />} />
        <Route path = "/login" element = {<Login setUser = {setUser} />} />
        <Route path = "/notes" element = {<Notes notes = {notes} />} />
        <Route 
          path = "/users" 
          element = {user ? <Users /> : <Navigate replace to = "/login" />} 
        />
        <Route path = "/" element = {<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>

    </>
  );
};
export default App;