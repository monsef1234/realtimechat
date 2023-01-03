import React from "react";
import ConversationHeader from "../ConversationHeader/ConversationHeader";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";
import "./Conversation.scss";
const Conversation = () => {
  return (
    <section className="conversation">
      <ConversationHeader />
      <Messages />
      <MessageInput />
    </section>
  );
};

export default Conversation;
