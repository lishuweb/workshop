import { useState, useEffect } from "react";
import Note from "./components/Note";
import functionName from "./services/Notes";
import Notification from "./components/Notification";
import loginService from "./services/login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    let myAxiosData = functionName.getAll();
    myAxiosData.then((result) => {
      result.push({ 
        id: 1000, content: "this is fake note", important: true 
      });
      setNotes(result);
    });

    // getting user from localStorage if available
    let myUser = window.localStorage.getItem("noteUser");
    if(myUser)
    {
      setUser(JSON.parse(myUser));    //JSON.parse - javascript object ma halxa
    }
  }, []);
 
  const notesToShow = notes.filter((note) => (showAll ? true : note.important));

  const handleSubmit = (event) => {
    event.preventDefault();
    let myNote = {
      content: newNote,
      important: Math.random() > 0.2,
    };

    let myPromise = functionName.create(myNote, user.token);
    myPromise.then((result) => {
      setNotes(notes.concat(result.data));
      setNewNote("");
    })
    .catch((e) => {
      setNotification(e.response.data.error);
      setTimeout(() => {
        setNotification("");
      }, 2000);

      if(e.response.data.error === "token expired")
      {
        setUser(null);
        window.localStorage.removeItem("noteUser");
      }
    })
  };

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const updateData = (id) => {
    let currentNote = notes.find((note) => {
      return note.id === id;
    });

    let updatedNote = { ...currentNote, important: !currentNote.important };
    let putPromise = functionName.update(id, updatedNote);
    putPromise
      .then((result) => {
        let updatedNote = result.data;
        setNotes(
          notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
      })
      .catch((err) => {
        if (err.response.status === 404) 
        {
          setNotification(`sorry this note "${currentNote.content}" does not exist`);
          setTimeout(() => {
            setNotification("");
          }, 2000);
          
          setNotes(notes.filter((note) => note.id !== currentNote.id));
        } 
        else 
        {
          console.log("Please check again!");
        }
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try
    {
      let loggedinUser = await loginService.login(
        {
          username,
          password,
        }
      )
      setUser(loggedinUser);
      window.localStorage.setItem("noteUser", JSON.stringify(loggedinUser));
    }
    catch (error) 
    {
      setNotification(
        error.response.data.error
      );
      setTimeout(() => {
        setNotification("");
      }, 2000);
    } 
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username 
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername( target.value )}
          />
        </div>
        <div>
          password 
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
          <button type="submit">login</button>
      </form>
    )
  };

  const noteForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange} />
        <button>Submit</button>
      </form>
    )
  };

  const style = { fontSize: "60px" };

  return (
    <>
      <h1 style = {style} className="redbackground">
        Notes
      </h1>

      <Notification 
        message = {notification} 
      />

      { user === null ? loginForm() : noteForm() }

      <button onClick={handleShowAll}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((value) => {
          return (
            <Note
              key={value.id}
              note={value}
              updateNote={() => {
                updateData(value.id);
              }}
            />
          );
        })}
      </ul>
      
      { noteForm }
    </>
  );
};

export default App;
