import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyHello from "./samples/MyHello";
import MyForLoop from "./samples/MyForLoop";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById('root'));

const arr = [
  {"name": "Taro"},
  {"name": "Jiro"},
  {"name": "Saburo"}
];

root.render(
  <React.StrictMode>
    <MyForLoop myArr={arr}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
