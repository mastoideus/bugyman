import React, { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import "./NewUserForm.css";

const USER_REGEX = /^[A-z]{3,20}$/;
const PSW_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  const validUsernameClass = !validUsername ? "invalid_username" : "";
  const validPasswordClass = !validPassword ? "invalid_password" : "";
  const validRolesClass = !roles.length ? "invalid_roles" : "";

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidPassword(PSW_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChange = (e: any) => setUsername(e.target.value);
  const onPasswordChange = (e: any) => setPassword(e.target.value);

  const onRolesChange = (e: any) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option: any) => option.value
    );
    setRoles(values);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e: any) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const content = (
    <div className="main_container form-container">
      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title">
          <h2 className="form__titleNewUser">New User</h2>
          <button
            className="form__iconBtn welcome__links public__btn"
            disabled={!canSave}
          >
            Save
          </button>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span>[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUsernameClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChange}
        />
        <label className="form__label" htmlFor="password">
          Password: <span>[4-12 chars incl. !@$#%]</span>
        </label>
        <input
          className={`form__input ${validPasswordClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        <label className="form__label" htmlFor="roles">
          Assigned Roles:
          <span> [Hold down Ctrl to select multiple options]</span>
        </label>
        <select
          className={`form__select ${validRolesClass}`}
          id="roles"
          name="roles"
          multiple={true}
          value={roles}
          size={3}
          onChange={onRolesChange}
        >
          {options}
        </select>
      </form>
    </div>
  );

  return <div>{content}</div>;
};

export default NewUserForm;
