import { useState } from "react"
import logo from "../assets/logo.svg";
import "./MyStyle.css";

const MyCounter = ({myProps})=>{
  // Initialize
  const [count, setCount] = useState(myProps.default);// State
  const clickEvent = ()=> setCount(count + 1);// Click
  return(
    <div className="Disp">
      <div className="Disp-Greeting">Hello, {count}</div>
      <img className="Disp-Logo" src={logo}/>
      <div className="Disp-Clock">{getClock()}</div>
      <button onClick={clickEvent}>Click</button>
    </div>
  );
}

const getClock = ()=>{
  return new Date().toLocaleTimeString("ja-JP", {timeZone: "UTC"});
}

export default MyCounter;
