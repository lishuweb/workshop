import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const noteReducer = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote(state, action) {
            const newState = state.concat(action.payload);
            return newState;
        },
        toggleImportanceOf(state, action) {
            let myNote = state.find((note) => 
                note.id === action.payload
            );
            let changedNote = { ...myNote, important: !myNote.important};
            return state.map((note) =>  
                note.id === changedNote.id ? changedNote : note
            );
        }
    },
});

const { createNote, toggleImportanceOf } = noteReducer.actions;
export { createNote, toggleImportanceOf };

export default noteReducer.reducer;