import React, { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import Form from "../components/Form";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note was deleted.");
          getNotes(); // Should just delete from the notes array but this is a temp fix
        } else {
          alert("Error deleting note.");
        }
      })
      .catch((err) => alert(err));
  };

  const createNote = () => {
    api
      .post("/api/notes/", { title: form.title, content: form.content })
      .then((res) => {
        if (res.status === 201) {
          getNotes();
          setForm({ title: "", content: "" });
          alert("Note created.");
        } else {
          alert("Error creating note.");
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => {
          return <Note key={note.id} note={note} onDelete={deleteNote} />;
        })}
      </div>

      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={form.title}
          onChange={(e) =>
            setForm((prevData) => ({ ...prevData, title: e.target.value }))
          }
        />

        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          required
          value={form.content}
          onChange={(e) =>
            setForm((prevData) => ({ ...prevData, content: e.target.value }))
          }
          minLength={1}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Home;
