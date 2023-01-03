import { ref } from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import user from "../../assets/user-icon.png";
import useAuth from "../../custom-hooks/useAuth";
import "./Message.scss";
const Message = ({ message }) => {
  const { user } = useSelector((state) => state.chat);
  const { currentUser } = useAuth();
  const ref = useRef(null);
  // useEffect(() => {
  //   ref?.current.scrollIntoView({ behavior: "smooth" });
  // }, [message]);
  return (
    <>
      {message.senderId === currentUser?.uid ? (
        <div className="message d-flex owner" ref={ref}>
          <div className="messageInfo d-flex">
            <img src={currentUser.photoURL} alt="" />
            <small>just now</small>
          </div>
          <div className="messageContent">
            <h5>{message.text}</h5>
            {message.img && <img src={message.img} alt="" />}
          </div>
        </div>
      ) : (
        <div className="message d-flex" ref={ref}>
          <div className="messageInfo d-flex">
            <img src={user.photoURL} alt="" />
            <small>just now</small>
          </div>
          <div className="messageContent">
            <h5>{message.text}</h5>
            {message.img && <img src={message.img} alt="" />}
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
