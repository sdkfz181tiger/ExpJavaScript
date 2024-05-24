"use strict"

// import MyHello from "./components/MyHello";

const arr = [
	{"name": "Taro"},
	{"name": "Jiro"},
	{"name": "Saburo"}
];

const App = ()=>{return(
	<div>
		<h1>My React App with CDN</h1>
	</div>
)}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);