import { useState } from "react"
import logo from "../assets/logo.svg";
import "./MyStyle.css";

const MyForLoop = ({myArr})=>{
  // Initialize
  //const [counter, setCount] = useState(myProps.default);// State
  //const clickEvent = ()=>setCount(counter + 1);// Click
  return(
    <dl>
      {
        myArr.map(elem=>(<li>{elem.name}</li>))
      }
    </dl>
  );
}

const getClock = ()=>{
  return new Date().toLocaleTimeString("ja-JP", {timeZone: "UTC"});
}

export default MyForLoop;
