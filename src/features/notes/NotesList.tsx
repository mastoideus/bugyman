import React from "react";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import "./NotesList.css";
import useAuth from "../../hooks/useAuth";

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const { isAdmin, isManager, username } = useAuth();

  let content;

  if (isError) {
    content = <p className="errorMsg">No Bug-Tickets found.</p>;
  }

  if (isSuccess) {
    const { ids, entities } = notes;
    const entity: any = entities;
    let filteredIds;
    if (isAdmin || isManager) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entity[noteId].username === username
      );
    }

    content =
      filteredIds.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);
  }

  return (
    <div className="main_container notes-container">
      {isLoading ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="notes_tableContainer">
          <table className="notes__table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Ticket Title</th>
                <th>Assigned to</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default NotesList;
