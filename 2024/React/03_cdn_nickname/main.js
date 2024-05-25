"use strict"

const namesA = [
	"普通の",
	"噂の",
	"伝説の"
];

const namesB = [
	"メタルスライム",
	"はぐれメタル",
	"メタルキング"
];

// MyTitle
const MyTitle = ({myMsg})=>{return(
	<div>
		<h1>{myMsg}</h1>
	</div>
);}

// MyNickname
const MyNickname = ({myMsg, myNamesA, myNamesB})=>{
	const [result, setResult] = React.useState(myMsg);// State
	const clickEvent = ()=>{
		const rdmA = Math.floor(Math.random()*myNamesA.length);
		const rdmB = Math.floor(Math.random()*myNamesB.length);
		setResult(myNamesA[rdmA] + myNamesB[rdmB]);
	}
	return(
	<div>
		<h2>ニックネームは{result}です!!</h2>
		<p><button onClick={clickEvent}>Click</button></p>
	</div>
);}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyTitle myMsg="Nickname Maker" />
		<MyNickname myMsg="---" myNamesA={namesA} myNamesB={namesB} />
	</React.StrictMode>
);