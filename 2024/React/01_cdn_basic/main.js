"use strict"

const member = [
	{"name": "Jack",  "age": 18},
	{"name": "Queen", "age": 32},
	{"name": "King",  "age": 40}
];

// Basic
const MyHello = ()=>{return(
	<div>
		<h1>Hello, React with CDN!!</h1>
	</div>
);}

// Props1
const MyTitle = ({init})=>{return(
	<div>
		<h1>{init}</h1>
	</div>
);}

// Props2
const MyGreeting = ({myName, myAge})=>{return(
	<div>
		<p>Hello, {myName}, {myAge}!!</p>
	</div>
);}

// Props3
const MyLoop = ({myArr})=>{return(
	<dl>
		{myArr.map(elem=>(<li>{elem.name}, {elem.age}</li>))}
	</dl>
);}

// State
const MyCounter = ({init})=>{
	const [counter, setCount] = React.useState(init);// State
	const clickEvent = ()=>setCount(counter + 1);// Event
	return(
	<div>
		<p>Counter:{counter}</p>
		<p><button onClick={clickEvent}>Click</button></p>
	</div>
);}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyHello/>
		<MyTitle init="Basic"/>
		<MyGreeting myName="Taro" myAge={20}/>
		<MyLoop myArr={member}/>
		<MyCounter init={0}/>
	</React.StrictMode>
);