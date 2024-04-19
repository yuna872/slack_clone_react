import React from "react";
import Login from "@pages/Login/Index";
import SignUp from "@pages/SignUp/Index";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Main}/>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={SignUp} />
    </Routes>
  );
};

const Main = () => {
  return <>메인페이지</>;
};

export default App;
