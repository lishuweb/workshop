import { useState, useEffect } from "react";
import Note from "./components/Note";
import functionName from "./services/Notes";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState("");
  console.log(newNote, "hello");
  console.log(notes, "NOTESSS");

  useEffect(() => {
    let myAxiosData = functionName.getAll();
    myAxiosData.then((result) => {
      result.push({ 
        id: 1000, content: "this is fake note", important: true 
      });
      setNotes(result);
    });
 }, []);
 
  const notesToShow = notes.filter((note) => (showAll ? true : note.important));

  const handleSubmit = (event) => {
    event.preventDefault();
    let myNote = {
      content: newNote,
      important: Math.random() > 0.2,
    };

    let myPromise = functionName.create(myNote);
    myPromise.then((result) => {
      setNotes(notes.concat(result.data));
      setNewNote("");
    });
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

  return (
    <>
      <h1>Notes</h1>

      <Notification 
        message = {notification} 
      />

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
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default App;
