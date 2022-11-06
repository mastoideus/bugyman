import React from "react";
import "./PublicPage.css";
import BugymanSection from "../components/PublicPage/BugymanSection";
import loginImg from "../assets/images/loginImg.png";
import welcomeImg from "../assets/images/welcomeImg.png";
import newUserImg from "../assets/images/newUserImg.png";
import usersImg from "../assets/images/usersImg.png";
import newTicketImg from "../assets/images/newTicketImg.png";
import tableImg from "../assets/images/tableImg.png";

const PublicPage = () => {
  return (
    <>
      <div className="main_container public" id="login">
        <BugymanSection />
      </div>
      <section style={{ marginTop: "7rem" }} className="main_container">
        <div className="public__reviewRow">
          <div className="imgContainer">
            <img src={loginImg} alt="" />
          </div>
          <div className="public__reviewTitle">
            <h1>
              Log<span style={{ color: "darkred" }}>in*to</span> the realm of
              Bugyman
            </h1>
          </div>
        </div>
        <div className="public__reviewRow">
          <div className="public__reviewTitle">
            <h1>
              Be the <span style={{ color: "darkred" }}>bug</span> you wanna
              fix!
            </h1>
          </div>
          <div className="imgContainer">
            <img src={welcomeImg} alt="" />
          </div>
        </div>
        <div
          className="public__reviewRow thirdReview"
          style={{ marginBottom: "0" }}
        >
          <div className="public__reviewTitle thirdReviewTitle">
            <h1>
              Track your bugwar and conquer{" "}
              <span style={{ color: "darkred" }}>the red battlefield</span>
            </h1>
          </div>
          <div className="imgContainer thirdImg">
            <img src={usersImg} alt="" />
          </div>
        </div>
        <div className="public__reviewCreate">
          <div
            style={{ display: "flex", marginBottom: "10rem" }}
            className="public__createUsers"
          >
            <p className="textRolesTickets">Create Users</p>
            <div className="imgContainer createImg">
              <img src={newUserImg} alt="" />
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="public__rolesTickets"
        >
          <div className="imgContainer imgRolesTickets">
            <img src={newTicketImg} alt="" />
          </div>
          <p className="textRolesTickets">Assign Roles & Tickets</p>
        </div>
      </section>
      <section
        className="main_container tableSection"
        style={{ display: "flex", marginTop: "10rem" }}
      >
        <p className="public__tableText">
          Read <span style={{ color: "darkred" }}>&</span> Edit your Bug-Tracker
          Table
        </p>

        <div className="imgContainer tableImg">
          <img src={tableImg} alt="" />
        </div>
      </section>
      <footer style={{ textAlign: "center" }}>
        <a href="#login" className="public__loginLinkToTop">
          LOGIN
        </a>
        <h1 className="public__bugymanFooter main_container">BUGYMAN</h1>
      </footer>
    </>
  );
};

export default PublicPage;
