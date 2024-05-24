// import { useState } from "react"

const MyHello = ({myProps})=>{return(
	<div className="Disp">
		<div className="Disp-Greeting">Hello React!!</div>
	</div>
);}

const getClock = ()=>{
	return new Date().toLocaleTimeString("ja-JP", {timeZone: "UTC"});
}

export default MyHello;
