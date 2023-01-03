import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import attach from "../../assets/attach.png";
import img from "../../assets/img.png";
import useAuth from "../../custom-hooks/useAuth";
import "./MessageInput.scss";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const { chatId } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.chat);
  const handleSend = async (eo) => {
    eo.preventDefault();
    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "useChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "useChats", user.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setFile(null);
  };
  return (
    <div className="messageInput p-2">
      <Form className="d-flex gap-2 align-items-center" onSubmit={handleSend}>
        <FormGroup className="w-100">
          <input
            onChange={(eo) => setText(eo.target.value)}
            type="text"
            name="text"
            id="text"
            placeholder="Write a message"
            className="w-100 hi"
            value={text}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="img">
            <img src={img} alt="addImage" />
          </label>
          <input
            onChange={(eo) => setFile(eo.target.files[0])}
            style={{ display: "none" }}
            type="file"
            name="img"
            id="img"
          />
        </FormGroup>
        <button type="submit">Send</button>
      </Form>
    </div>
  );
};

export default MessageInput;
