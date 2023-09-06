import { useState } from "react";

const NoteForm = ({ onSubmit }) => {
  const [newNote, setNewNote] = useState(""); 

  const mySubmit = (e) => {
    e.preventDefault();
    onSubmit(
      {
        content: newNote,
        important: Math.random() > 0.5,
      }
    );
  }
  
  return (
      <form onSubmit = { mySubmit }>
        <input 
            className="something"
            placeholder="enter something here"
            value = { newNote } 
            onChange = {(e) => {
              setNewNote(e.target.value);
            }} 
        />
        <button type="submit">save</button>
      </form>
    )
  };

  export default NoteForm;