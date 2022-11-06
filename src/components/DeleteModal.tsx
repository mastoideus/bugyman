import React from "react";
import { Outlet } from "react-router-dom";
import "./DeleteModal.css";
import ReactDOM from "react-dom";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const DeleteModal: React.FC<{ children: any }> = (props) => {
  const content = <div className="delete-modal">{props.children}</div>;
  const element = document.getElementById("delete-modal") as
    | HTMLDivElement
    | DocumentFragment;

  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, element)}
      {ReactDOM.createPortal(content, element)}
    </div>
  );
};

export default DeleteModal;
