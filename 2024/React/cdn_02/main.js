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

// Props
const MyGreeting = ({myName, myAge})=>{return(
	<div>
		<p>Hello, {myName}, {myAge}!!</p>
	</div>
);}

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
		<div>Counter:{counter}</div>
		<button onClick={clickEvent}>Click</button>
	</div>
);}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyHello/>
		<MyGreeting myName="Taro" myAge="20"/>
		<MyLoop myArr={member}/>
		<MyCounter init={0}/>
	</React.StrictMode>
);