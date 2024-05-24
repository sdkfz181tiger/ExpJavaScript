"use strict"

// Title
const MyTitle = ({init})=>{return(
	<div>
		<h1>{init}</h1>
	</div>
);}

// Clock
const MyClock = ({init})=>{
	const [clock, setClock] = React.useState(init);// State
	setInterval(()=>{setClock(getClock());}, 500);// Interval
	return(
	<div>{clock}</div>
);}

const getClock = ()=>{
	const date = new Date();
	let h = date.getHours();
	let m = date.getMinutes();
	let s = date.getSeconds();

	if(h < 10) h = "0" + h;
	if(m < 10) m = "0" + m;
	if(s < 10) s = "0" + s;
	return(h + ":" + m + ":" + s);
}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyTitle init="Clock"/>
		<MyClock init="00:00:00"/>
	</React.StrictMode>
);