import React from "react";
import "./ConversationHeader.scss";
import { useSelector } from "react-redux";
const ConversationHeader = () => {
  const { user } = useSelector((state) => state.chat);
  return (
    <div className="conversationHeader d-flex align-items-center">
      <h4 className="receiverName text-capitalize">{user?.displayName}</h4>
    </div>
  );
};

export default ConversationHeader;
