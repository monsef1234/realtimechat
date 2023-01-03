import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useAuth from "../../custom-hooks/useAuth";
import { db } from "../../firebase.config";
import User from "../User/User";

const Users = () => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState(null);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "useChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser && getChats();
  }, [currentUser]);
  return (
    <div className="usersContainer">
      {chats &&
        Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => {
            return <User key={chat[0]} chat={chat} currentUser={currentUser} />;
          })}
    </div>
  );
};

export default Users;
