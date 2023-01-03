import React from "react";
import "./User.scss";
import { useDispatch } from "react-redux";
import { chatSelect } from "../../redux/chatSlice";

const User = ({ chat, currentUser }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="userBox  d-flex align-items-center"
      onClick={() =>
        dispatch(
          chatSelect({ userInfo: chat[1].userInfo, id: currentUser.uid })
        )
      }
    >
      <img src={chat[1].userInfo.photoURL} alt="" />
      <div className="userInfo">
        <h5 className="text-capitalize">{chat[1].userInfo.displayName}</h5>
        <span className="lastMsg">{chat[1].lastMessage?.text}</span>
      </div>
    </div>
  );
};

export default User;
