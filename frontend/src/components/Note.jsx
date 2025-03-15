import React from "react";
import "../styles/Note.css";

const Note = ({ note, onDelete }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-us");
  return (
    <div className="note-container">
      <h1 className="note-title">{note.title}</h1>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
};

export default Note;
