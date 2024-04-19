import React from "react";
import { Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";

const LogIn = loadable(() => import("@pages/LogIn"));
const SignUp = loadable(() => import("@pages/SignUp"));

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Main} />
      <Route path="/login" Component={LogIn} />
      <Route path="/signup" Component={SignUp} />
    </Routes>
  );
};

const Main = () => {
  return <>메인페이지</>;
};

export default App;
