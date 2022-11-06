import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const { username, isManager, isAdmin } = useAuth();

  return (
    <div className="welcome">
      <div className="third-triangle"></div>
      <h1 className="welcome__title">Welcome</h1>
      <small className="welcome__date">{today}</small>
      <p className="welcome__links public__btn mobile ">
        <Link to="/dash/notes" className="welcome__alink">
          View Bug-Tickets
        </Link>
      </p>
      {(isManager || isAdmin) && (
        <p className="welcome__links public__btn mobile">
          <Link to="/dash/users" className="welcome__alink">
            View User Settings
          </Link>
        </p>
      )}
    </div>
  );
};

export default Welcome;
