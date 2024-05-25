"use strict"

const member = [
	{"name": "Nobunaga",  "age": 13},
	{"name": "Hideyoshi", "age": 12},
	{"name": "Ieyasu",    "age": 10}
];

// 1, MyLoopコンポーネント
const MyLoop = ({myArr})=>{return(
	<dl>
		{myArr.map(elem=><li>{elem.name}, {elem.age}</li>)}
	</dl>
);}

// 2, React.jsを起動する
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyLoop myArr={member}/>
	</React.StrictMode>
);

/*
// MyHelloコンポーネント
const MyHello = ()=>{return(
	<div>
		<h1>Hello, React with CDN!!</h1>
	</div>
);}

// MyTitleコンポーネント
const MyTitle = ({myMsg})=>{return(
	<div>
		<h1>{myMsg}</h1>
	</div>
);}

// MyGreetingコンポーネント
const MyGreeting = ({myName, myAge})=>{return(
	<div>
		<p>Hello, {myName}, {myAge}!!</p>
	</div>
);}

const member = [
	{"name": "Nobunaga",  "age": 13},
	{"name": "Hideyoshi", "age": 12},
	{"name": "Ieyasu",    "age": 10}
];

// MyLoopコンポーネント
const MyLoop = ({myArr})=>{return(
	<dl>
		{myArr.map(elem=>(<li>{elem.name}, {elem.age}</li>))}
	</dl>
);}

// MyCounterコンポーネント
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