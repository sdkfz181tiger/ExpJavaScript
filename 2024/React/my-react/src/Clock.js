import React from "react"
import logo from "./logo.svg";
import "./Clock.css";

class Clock extends React.Component{
  render(){
    return(
        <div className="Clock">
          <p className="Clock-View">Time:{(new Date()).toLocaleString()}</p>
        </div>
      );
  }
}

export default Clock;
