import React from "react";
import Layout from "./components/Layout";
import PublicPage from "./pages/PublicPage";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import DashLayout from "./pages/DashLayout";
import { Routes, Route } from "react-router-dom";
import UsersList from "./features/users/UsersList";
import NotesList from "./features/notes/NotesList";
import EditNote from "./features/notes/EditNote";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PublicPage />} />
        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
