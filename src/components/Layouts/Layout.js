import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import LoginForm from "../LoginForm/LoginForm";
import Navigation from "../../components/Layouts/Navigation";
import RiseLoader from "react-spinners/RiseLoader";

const Layout = ({ children }) => {
  const { user, loading } = useUserContext();
  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  };


  if (loading) {
    return (
      <RiseLoader color="green" loading={loading} cssOverride={override} />
    );
  }
  return !loading &&  user && user.success === 1 ? <Navigation>{children}</Navigation> : <LoginForm />;
};

export default Layout;
