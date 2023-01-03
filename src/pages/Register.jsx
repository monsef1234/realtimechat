import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import Section from "../components/Section/Section";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import addImg from "../assets/addAvatar.png";
import "../styles/Register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase.config";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    password: "",
    file: null,
  });
  const changeHandler = (eo) => {
    const name = eo.target.name;
    const value =
      eo.target.name === "file" ? eo.target.files[0] : eo.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const submitHandler = async (eo) => {
    eo.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const storageRef = ref(storage, `profileImages/${userData.displayName}`);
      const uploadTask = uploadBytesResumable(storageRef, userData.file);
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
            await updateProfile(user.user, {
              displayName: userData.displayName.toLowerCase(),
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.user.uid), {
              uid: user.user.uid,
              displayName: userData.displayName.toLowerCase(),
              email: userData.email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "useChats", user.user.uid), {});
          });
        }
      );
      navigate("/login");
    } catch (error) {}
  };
  return (
    <Helmet title={"Register"}>
      <Section name={"register"}>
        <h3 className="text-center">Wa3rin Chat 🤭</h3>
        <Form onSubmit={submitHandler} className="d-flex flex-column gap-3">
          <span className="text-center">Register</span>
          <FormGroup>
            <input
              onChange={changeHandler}
              className="w-100 p-1"
              type="text"
              name="displayName"
              id="displayName"
              placeholder="username"
              autoComplete="off"
            />
          </FormGroup>
          <FormGroup>
            <input
              onChange={changeHandler}
              className="w-100 p-1"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              autoComplete="off"
            />
          </FormGroup>
          <FormGroup>
            <input
              onChange={changeHandler}
              className="w-100 p-1"
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="file" className="d-flex gap-2 align-items-center">
              <img src={addImg} alt="image" />
              <p className="mb-0">Add an avatar</p>
            </label>
            <input
              onChange={changeHandler}
              style={{ display: "none" }}
              className="w-100 p-1"
              type="file"
              name="file"
              id="file"
              required
            />
          </FormGroup>
          <button className="submitBtn">Sign in</button>
          <small className="notice mx-3 d-block text-center">
            You already have an account? <Link to="/login">Login</Link>
          </small>
        </Form>
      </Section>
    </Helmet>
  );
};

export default Register;
