import React from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const user: any = useAppSelector((state) => selectUserById(state, id!));

  const content = user ? <EditUserForm user={user} /> : <p>...Loading</p>;
  return content;
};

export default EditUser;
