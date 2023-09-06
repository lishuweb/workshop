import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

test("renders content", () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true,
    };

    const { container } = render(<Note note = {note} />);

    const div = container.querySelector(".note");

    screen.debug();

    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    );


    // const element = screen.getByText(
    //     "Component testing is done with react-testing-library"
    // );

    // expect(element).toBeDefined();
});

test("clicking the button calls event handler once", async () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true,
    };

    const mockHandler = jest.fn();

    render(<Note note = {note} updateNote = {mockHandler} />);

    const user = userEvent.setup();                             //user aayo
    const button = screen.getByText("change true");
    await user.click(button);

    expect (mockHandler.mock.calls).toHaveLength(1);
})