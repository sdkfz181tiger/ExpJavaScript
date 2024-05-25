"use strict"

// MyTitle
const MyTitle = ({myMsg})=>{return(
	<div>
		<h1>{myMsg}</h1>
	</div>
);}

// MyClock
const MyClock = ({myMsg})=>{
	const [clock, setClock] = React.useState(myMsg);// State
	setInterval(()=>setClock(getClock()), 500);// Interval
	return(
	<div>
		<h2>{clock}</h2>
	</div>
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
		<MyTitle myMsg="Clock"/>
		<MyClock myMsg="00:00:00"/>
	</React.StrictMode>
);