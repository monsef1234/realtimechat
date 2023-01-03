import React from "react";
import userImg from "../../assets/user-icon.png";
import "./SidebarHeader.scss";
const SidebarHeader = ({ logoutHandler, currentUser }) => {
  return (
    <div className="asideHeader d-flex gap-4 align-items-center">
      <div className="userAction d-flex gap-2 align-items-center">
        <img src={currentUser?.photoURL || userImg} alt="user" />
        <h5 className="text-capitalize pe-2">{currentUser?.displayName}</h5>
      </div>
      <button onClick={logoutHandler} className="logoutBtn">
        logout
      </button>
    </div>
  );
};

export default SidebarHeader;
