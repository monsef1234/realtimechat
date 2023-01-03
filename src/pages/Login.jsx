import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import Section from "../components/Section/Section";
import { auth } from "../firebase.config";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const submitHandler = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };
  const changeHandler = (eo) => {
    const { name, value } = eo.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Helmet title={"Login"}>
      <Section name={"login"}>
        <h3 className="text-center">Wa3rin Chat 🤭</h3>
        <Form onSubmit={submitHandler} className="d-flex flex-column gap-3">
          <span className="text-center">Login</span>
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
          <button className="submitBtn">Sign in</button>
          <small className="note mx-3 d-block text-center">
            You don't have an account? <Link to="/register">Register</Link>
          </small>
        </Form>
      </Section>
    </Helmet>
  );
};

export default Login;
