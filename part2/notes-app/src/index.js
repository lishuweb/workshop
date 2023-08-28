import React from 'react'
import { createRoot } from "react-dom/client";

import App from './App';
import "./index.css";

let notes = [
    { id: 1, content: "note 1", important: true},
    { id: 1, content: "note 1", important: true},
    { id: 1, content: "note 1", important: true},
];

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App notes={notes} />);