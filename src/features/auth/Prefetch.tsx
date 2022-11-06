import React, { useEffect } from "react";
import { store } from "../../app/store";
import { Outlet } from "react-router-dom";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";

const Prefetch = () => {
  useEffect(() => {
    const notes = store.dispatch(
      notesApiSlice.endpoints.getNotes.initiate("notes")
    );
    const users = store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate("users")
    );

    return () => {
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default Prefetch;
