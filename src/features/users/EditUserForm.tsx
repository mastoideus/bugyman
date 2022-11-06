import React, { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { BsSave2Fill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import DeleteModal from "../../components/DeleteModal";

const USER_REGEX = /^[A-z]{3,20}$/;
const PSW_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm: React.FC<{
  user: {
    roles: string[] | string;
    username: string;
    active: boolean;
    id: string;
  };
}> = (props) => {
  const [updateUser, { isSuccess, isLoading, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(props.user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(props.user.roles);
  const [active, setActive] = useState(props.user.active);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidPassword(PSW_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChange = (e: any) => setUsername(e.target.value);
  const onPasswordChange = (e: any) => setPassword(e.target.value);

  const onActiveChange = (e: any) => setActive((prev) => !prev);

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

  const onSaveUserClicked = async (e: any) => {
    if (password) {
      await updateUser({
        id: props.user.id,
        username,
        password,
        roles,
        active,
      });
    } else {
      await updateUser({ id: props.user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: props.user.id });
  };

  let canSave;
  if (password) {
    canSave =
      [roles.length, validPassword, validUsername].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "";
  const validUsernameClass = !validUsername ? "validUsernameClass" : "";
  const validPassClass = !validPassword ? "validPassClass" : "";
  const validRolesClass = !Boolean(roles.length) ? "validRolesClass" : "";

  /*const errContent = (error?.data?.message || delerror?.data?.message) ?? "";*/

  const content = (
    <div
      className="main_container form-container"
      style={{ margin: "10px auto" }}
    >
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title">
          <h2 className="form__titleNewUser">Edit User</h2>
          <button
            className="form__iconBtn welcome__links public__btn"
            disabled={!canSave}
            onClick={onSaveUserClicked}
          >
            Save
          </button>
          <button
            className="form__iconBtn welcome__links public__btn"
            onClick={() => setDeleteModal(true)}
          >
            Delete
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
          className={`form__input ${validPassClass}`}
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
        <label
          className="form__label form__checkboxContainer"
          htmlFor="user-active"
          style={{ marginTop: ".5rem" }}
        >
          Active:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChange}
          />
        </label>
      </form>
    </div>
  );

  return (
    <>
      {deleteModal ? (
        <DeleteModal>
          <p>Are you sure you want to delete the User?</p>
          <small>
            (To delete an User there should be no Tickets assigned to them)
          </small>
          <div className="delete-modal__actions">
            <button
              className="delete-modal__btn"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
            <button className="delete-modal__btn" onClick={onDeleteUserClicked}>
              OK
            </button>
          </div>
        </DeleteModal>
      ) : null}
      {content}
    </>
  );
};

export default EditUserForm;
