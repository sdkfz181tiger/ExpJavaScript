import React from "react";
import logo from "../assets/logo.svg";
import "./MyHello.css";

const MyHello = ({myProps})=>{
  return(
    <div className="Disp">
      <div className="Disp-Greeting">Hello, {myProps.greeting}</div>
      <img className="Disp-Logo" src={logo}/>
      <div className="Disp-Clock">{getClock()}</div>
    </div>
  );
}

const getClock = ()=>{
  return new Date().toLocaleString("ja-JP", {timeZone: "UTC"});
}

export default MyHello;
