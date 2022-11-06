import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import "./NewNoteForm.css";

type User = {
  username: string;
  password: string;
  roles: string[];
  active: boolean;
  _id: string | number;
  id: string | number;
};

const NewNoteForm: React.FC<{ users: User[] }> = (props) => {
  const [addNewNote, { isSuccess, isLoading, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(props.users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess]);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const onUserIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const onSaveNoteClicked = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ title, text, user: userId });
    }
  };

  const options = props.users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const content = (
    <div className="main_container form-container">
      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title">
          <h2 className="form__titleNewUser">New Ticket</h2>
          <button
            className="form__iconBtn welcome__links public__btn"
            disabled={!canSave}
          >
            Save
          </button>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input `}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />
        <label className="form__label" htmlFor="text">
          Description:
        </label>
        <textarea
          className={`form__input`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <label className="form__label" htmlFor="username">
          Assigned to:
        </label>
        <select
          className={`form__select select__newNoteForm`}
          id="username"
          name="username"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </div>
  );

  return content;
};

export default NewNoteForm;
