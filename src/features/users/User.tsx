import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "./usersApiSlice";
import "./User.css";
import { FaUserAlt, FaUserSecret, FaUserTie } from "react-icons/fa";

const User: React.FC<{ userId: any }> = (props) => {
  const user: any = useAppSelector((state) =>
    selectUserById(state, props.userId)
  );
  console.log(user);
  const navigate = useNavigate();

  if (!user) {
    return <p></p>;
  }

  const onEditNavigate = () => {
    navigate(`/dash/users/${props.userId}`);
  };
  return (
    <div className="user">
      <div className="user__header">
        <FaUserAlt style={{ fontSize: "100px" }} className="user__avatar" />
        <p className="user__headerName">{user.username}</p>
        <button
          className="user__editBtn welcome__links public__btn"
          onClick={onEditNavigate}
        >
          Edit
        </button>
      </div>
      <div className="user__body">
        <p>Roles:</p>
        <ul>
          {user.roles.length > 0 ? (
            user.roles.map((role: string) => <li>{role}</li>)
          ) : (
            <li>{user.roles[0]}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default User;
