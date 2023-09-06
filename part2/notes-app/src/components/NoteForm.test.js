import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm />updates parent state and calls onSubmit", async () => {
    const createNote = jest.fn();
    const user = userEvent.setup();

    render(<NoteForm onSubmit = { createNote } />);

    const input = screen.getByRole("textbox");
    const sendButton = screen.getAllByText("save");

    await user.type(input, "testing a form...");
    await user.click(sendButton);

    expect(createNote.mock.calls).toHaveLength(1);
});