import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import "./Login.css";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current?.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [password, username]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (error) {}
  };

  const handleUsernameInput = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e: any) => {
    setPassword(e.target.value);
  };
  const handlePersistToggle = () => {
    setPersist((prev: any) => !prev);
  };

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="lds-dual-ring">Please wait</div>
      </div>
    );
  }

  const content = (
    <section className="main_container login">
      <header className="login__header">
        <h2 className="login__headerTitle">Employee Login</h2>
      </header>
      <main className="login__main">
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="form__label" htmlFor="username">
            Username:
          </label>
          <input
            className="form__input"
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameInput}
            ref={userRef}
            required
            autoComplete="off"
          />
          <label className="form__label">Password:</label>
          <input
            className="form__input"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordInput}
            required
          />
          <button
            style={{ fontSize: "1rem" }}
            className="welcome__links public__btn"
          >
            Sign In
          </button>
          <label
            htmlFor="persist"
            style={{ marginBottom: "1rem", color: "white" }}
          >
            <input
              type="checkbox"
              id="persist"
              checked={persist}
              onChange={handlePersistToggle}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer className="login__footer">
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
