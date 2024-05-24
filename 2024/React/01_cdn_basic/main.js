"use strict"

// Helloコンポーネント
const MyHello = ()=>{return(
	<div>
		<h1>Hello, React with CDN!!</h1>
	</div>
);}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyHello/>
	</React.StrictMode>
);

/*
const member = [
	{"name": "Jiro",   "age": 13},
	{"name": "Saburo", "age": 12},
	{"name": "Shiro",  "age": 10}
];

// Hello
const MyHello = ()=>{return(
	<div>
		<h1>Hello, React with CDN!!</h1>
	</div>
);}

// Props1
const MyTitle = ({myMsg})=>{return(
	<div>
		<h1>{myMsg}</h1>
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
const MyCounter = ({myCnt})=>{
	const [counter, setCount] = React.useState(myCnt);// State
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
		<MyTitle myMsg="Basic"/>
		<MyGreeting myName="Taro" myAge={14}/>
		<MyLoop myArr={member}/>
		<MyCounter myCnt={0}/>
	</React.StrictMode>
);
*/