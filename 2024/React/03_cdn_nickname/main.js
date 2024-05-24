"use strict"

const names = [
	"メタルスライム",
	"はぐれメタル",
	"メタルキング"
];

// Title
const MyTitle = ({myMsg})=>{return(
	<div>
		<h1>{myMsg}</h1>
	</div>
);}

// Nickname Maker
const MyNickname = ({myMsg, myNames})=>{
	const [result, setResult] = React.useState(myMsg);// State
	const clickEvent = ()=>{
		const rdm = Math.floor(Math.random()*myNames.length);
		setResult(myNames[rdm]);
	}
	return(
	<div>
		<p>あなたのニックネームは:{result}です!!</p>
		<p><button onClick={clickEvent}>Click</button></p>
	</div>
);}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyTitle myMsg="Nickname Maker" />
		<MyNickname myMsg="---" myNames={names} />
	</React.StrictMode>
);