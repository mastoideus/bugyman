import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import "./UsersList.css";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading)
    content = (
      <div style={{ width: "100%", textAlign: "center" }}>
        <div className="lds-dual-ring"></div>
      </div>
    );
  if (isError) {
    content = <p className="errorMsg">No Users found, error.</p>;
  }

  if (isSuccess) {
    const { ids } = users;
    content = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;
  }

  return (
    <div style={{ color: "white" }} className="main_container users_container">
      {content}
    </div>
  );
};

export default UsersList;
