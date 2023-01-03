import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase.config";
import Message from "../Message/Message";
import "./Messages.scss";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chatId } = useSelector((state) => state.chat);
  useEffect(() => {
    const getDoc = () => {
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    };
    chatId && getDoc();
  }, [chatId]);
  return (
    <div className="messages">
      {messages.length > 0 &&
        messages
          .sort((a, b) => b.date - a.date)
          .map((m) => {
            return <Message message={m} key={m.id} />;
          })}
    </div>
  );
};

export default Messages;
