import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import notesService from "../services/notes";

const NoteForm = () => {

    const notes = useSelector((state) => state.notes);
    const dispatch = useDispatch();

    const addNote = (event) => {
        event.preventDefault();
        const newNote = {
          content: event.target.myInput.value,
          important: true,
          id: notes.length + 1,
        };
        notesService.createNew(newNote).then((myNote) => {
            dispatch(createNote(myNote));;
        });
        event.target.myInput.value = "";
    };

    return (
        <form onSubmit = { addNote } >
            <input  name="myInput" />
            <button>Add note</button>
        </form>
    );
};

export default NoteForm;