"use strict"

const member = [
	{"name": "Jack"},
	{"name": "Queen"},
	{"name": "King"}
];

// Basic
const MyHello = ()=>{return(
	<div>
		<h1>Hello, React with CDN!!</h1>
	</div>
);}

// Props
const MyGreeting = ({myName})=>{return(
	<div>
		<p>Hello, {myName}!!</p>
	</div>
);}

const MyLoop = ({myArr})=>{return(
	<dl>
		{myArr.map(elem=>(<li>{elem.name}</li>))}
	</dl>
);}

// State
const MyCounter = ({init})=>{
	const [counter, setCount] = React.useState(init);// State
	const clickEvent = ()=>setCount(counter + 1);// Event
	return(
	<div>
		<div>Counter:{counter}</div>
		<button onClick={clickEvent}>Click</button>
	</div>
);}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyHello/>
		<MyGreeting myName="Taro"/>
		<MyLoop myArr={member}/>
		<MyCounter init={0}/>
	</React.StrictMode>
);