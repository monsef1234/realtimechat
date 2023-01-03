import React from "react";
import "./Sidebar.scss";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import SidebarBody from "../SidebarBody/SidebarBody";
const Sidebar = ({ logoutHandler, currentUser }) => {
  return (
    <aside>
      <SidebarHeader currentUser={currentUser} logoutHandler={logoutHandler} />
      <SidebarBody />
    </aside>
  );
};

export default Sidebar;
