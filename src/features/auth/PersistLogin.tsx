import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh("");
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  let content;
  if (!persist) {
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist yes token no
    content = <p>Loading...</p>;
  } else if (isError) {
    console.log(error);
    content = (
      <p>
        <Link to="/login">Please login again!</Link>
      </p>
    );
    //persist yes token no
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token and uninit");
    content = <Outlet />;
  }

  return <>{content}</>;
};

export default PersistLogin;
