import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import Conversation from "../components/Conversation/Conversation";
import Helmet from "../components/Helmet/Helmet";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../custom-hooks/useAuth";
import { auth } from "../firebase.config";
import "../styles/Home.scss";
const Home = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };
  const { currentUser } = useAuth();
  return (
    <Helmet title={"Home"}>
      <section className="home w-100 rounded">
        <Container className="p-0 d-flex h-100">
          <Sidebar logoutHandler={logoutHandler} currentUser={currentUser} />
          <Conversation />
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
