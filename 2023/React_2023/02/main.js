"use strict"

console.log("main.js");

// Component
const App = ()=>{
	return (<h1>Hello, React!!</h1>);
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
