import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "../components/DashLayout/DashHeader";
import DashFooter from "../components/DashLayout/DashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div
        style={{
          padding: "7rem 2rem",
          boxSizing: "border-box",
        }}
        className="dash-container"
      >
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
