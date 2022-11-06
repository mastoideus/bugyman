import React from "react";
import "./DashFooter.css";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { username, status } = useAuth();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeBtn = null;
  if (pathname !== "/dash") {
    goHomeBtn = (
      <button className="dash-footer__button" onClick={onGoHomeClicked}>
        Go Home
      </button>
    );
  }

  return (
    <div className="dash-footer">
      {goHomeBtn}
      <p>
        Current User: <span style={{ color: "darkred" }}>{username}</span>
      </p>
      <p>
        Status: <span style={{ color: "darkred" }}>{status}</span>
      </p>
    </div>
  );
};

export default DashFooter;
