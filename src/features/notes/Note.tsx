import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectNoteById } from "./notesApiSlice";
import { FiEdit } from "react-icons/fi";
import "./Note.css";

const Note: React.FC<{ noteId: any }> = (props) => {
  const note: any = useAppSelector((state) =>
    selectNoteById(state, props.noteId)
  );
  const navigate = useNavigate();
  console.log(note);

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      hour: "numeric",
    });
    const handleEdit = () => navigate(`/dash/notes/${props.noteId}`);

    return (
      <tr className="note-row">
        <td>{note.completed ? "Completed" : "Open"}</td>
        <td>{created}</td>
        <td>{updated}</td>
        <td>{note.title}</td>
        <td>{note.username}</td>
        <td style={{ textAlign: "center" }}>
          <FiEdit onClick={handleEdit} />
        </td>
      </tr>
    );
  } else return null;
};

export default Note;
