import { useState } from "react"
import logo from "../assets/logo.svg";
import "./MyStyle.css";

const MyCounter = ({myProps})=>{
  // Initialize
  const [counter, setCount] = useState(myProps.default);// State
  const clickEvent = ()=>setCount(counter + 1);// Click
  return(
    <div className="Disp">
      <div className="Disp-Greeting">Counter:{counter}</div>
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
