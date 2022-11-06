import React, { useEffect } from "react";
import "./DashHeader.css";
import logoImg from "../../assets/images/cursorBug.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isSuccess, isLoading, isError, error }] =
    useSendLogoutMutation();

  const { isManager, isAdmin } = useAuth();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => sendLogout("");

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash__navClassPathname";
  }
  return (
    <div className="dash-header">
      <img src={logoImg} width={30} className="dash-header__logo" />
      <div className={`${dashClass}`}>
        <p className="dash-header__dashboard">dashboard</p>
        <nav>
          <ul className="dash-header__navList">
            <p className=" header__links">
              <Link to="/dash/notes/new" className="welcome__alink">
                Add New Ticket
              </Link>
            </p>
            {(isManager || isAdmin) && (
              <p className="header__links">
                <Link to="/dash/users/new" className="welcome__alink">
                  Add New User
                </Link>
              </p>
            )}

            <button
              style={{
                outline: "none",
                border: "none",
                borderRight: "1px solid darkred",
                backgroundColor: "transparent",
              }}
              onClick={onLogoutClicked}
              className=" welcome__logoutBtn header__links welcome__alink"
            >
              Logout
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DashHeader;
