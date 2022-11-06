import React from "react";
import "./BugymanSection.css";
import { Link } from "react-router-dom";

const BugymanSection = () => {
  return (
    <>
      <p className="bugyman__textTop">
        @Bugyman: become the bug you wanna fix! The bug-tracker that will turn
        red into green.
      </p>
      <h1 className="bugyman__bugy">BUGY</h1>
      <Link to="/login" style={{ position: "relative" }}>
        <h3 className="public__login public__btn welcome__links ">LOGIN</h3>
        <small style={{ color: "wheat" }}>
          Demo Admin User- username: Haaland password: mancity
        </small>
      </Link>

      <h1 className="bugyman__bugy">MAN</h1>
      <p className="bugyman__textBottom">
        As an Admin you can create Users and Bug-Tickets. Assign one or more
        Roles and Tickets to an User. View the table of current and completed
        tickets, edit or delete them. Maintain your list of Employees.
      </p>
    </>
  );
};

export default BugymanSection;
