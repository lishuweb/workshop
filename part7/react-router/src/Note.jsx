const Note = ({ note }) => {
    return (
      <div>
        <h2>This is single note for {note.id}</h2>
  
        <li>
          {note.content}  <strong>
                            {note.important ? "important" : ""}
                          </strong>
        </li>
      </div>
    );
  };
  
export default Note;