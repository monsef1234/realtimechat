import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layouts from "./components/Layouts/Layouts";
import useAuth from "./custom-hooks/useAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { currentUser } = useAuth();
  const ProtectedRouter = () => {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <div
      style={{ margin: "5rem auto" }}
      className="container d-flex align-items-center justify-content-center"
    >
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="/*" element={<ProtectedRouter />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
