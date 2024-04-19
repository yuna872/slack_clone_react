// react, react-dom 불러오기 (node module system)
import React from "react";
import { render } from "react-dom";
import App from "@layouts/App";
import { BrowserRouter } from "react-router-dom";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // id가 root인 div 태그 안에 렌더링 하겠다라는 의미 (index.html)
  document.querySelector("#root")
);
