import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useAuth from "../../custom-hooks/useAuth";
import { db } from "../../firebase.config";
import Users from "../Users/Users";
import "./SidebarBody.scss";
const SidebarBody = () => {
  const { currentUser } = useAuth();
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username.toLocaleLowerCase())
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === currentUser.uid) {
          setUser(null);
        } else {
          setUser(doc.data());
        }
      });
    } catch (error) {
      console.log("user not found!");
    }
  };
  const handleSelect = async (eo) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "useChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "useChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    setUser(null);
    setUserName("");
  };
  const keyHandler = (eo) => {
    eo.which === 13 && handleSearch();
  };
  return (
    <div className="asideBody">
      <div className="searchUser">
        <input
          onKeyDown={(eo) => keyHandler(eo)}
          className="w-100"
          type="text"
          name="user"
          id="user"
          placeholder="Find a user"
          onChange={(eo) => setUserName(eo.target.value)}
          value={username}
        />
        {user && (
          <div
            className="userBox  d-flex align-items-center"
            onClick={handleSelect}
          >
            <img src={user.photoURL} alt={user.displayName} />
            <div className="userInfo">
              <h5 className="text-capitalize">{user.displayName}</h5>
            </div>
          </div>
        )}
      </div>
      <Users />
    </div>
  );
};

export default SidebarBody;
