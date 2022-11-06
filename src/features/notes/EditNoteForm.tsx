import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import "./EditNoteForm.css";
import DeleteModal from "../../components/DeleteModal";

type User = {
  username: string;
  password: string;
  roles: string[];
  active: boolean;
  _id: string | number;
  id: string | number;
};

type Note = {
  title: string;
  text: string;
  completed: boolean;
  user: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ticket: number;
};

const EditNoteForm: React.FC<{ users: User[]; note: Note }> = ({
  note,
  users,
}) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e: any) => setTitle(e.target.value);
  const onTextChanged = (e: any) => setText(e.target.value);
  const onCompletedChanged = (e: any) => setCompleted((prev: any) => !prev);
  const onUserIdChanged = (e: any) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e: any) => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user: any) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <div
      className="main_container form-container"
      style={{ marginTop: "1.6rem" }}
    >
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Ticket #{note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="form__iconBtn welcome__links public__btn"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              Save
            </button>
            <button
              className="form__iconBtn welcome__links public__btn"
              title="Delete"
              onClick={() => setDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="username"
              className="form__select form__editNoteSelect"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              <span style={{ color: "gray" }}>Created:</span>
              {created}
            </p>
            <p className="form__updated">
              <span style={{ color: "gray" }}>Updated:</span>
              {updated}
            </p>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {deleteModal && (
        <DeleteModal>
          <p>Are you sure you want to delete the Ticket?</p>
          <div className="delete-modal__actions">
            <button
              className="delete-modal__btn"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
            <button className="delete-modal__btn" onClick={onDeleteNoteClicked}>
              OK
            </button>
          </div>
        </DeleteModal>
      )}
      {content}
    </>
  );
};

export default EditNoteForm;
