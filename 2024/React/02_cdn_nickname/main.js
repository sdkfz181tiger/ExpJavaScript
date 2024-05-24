"use strict"

const names = [
	"メタルスライム",
	"はぐれメタル",
	"メタルキング"
];

// Title
const MyTitle = ({myTitle})=>{return(
	<div>
		<h1>{myTitle}</h1>
	</div>
);}

// Nickname Maker
const MyNickname = ({init, myNames})=>{
	const [result, setResult] = React.useState(init);// State
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
		<MyTitle myTitle="Nickname Maker" />
		<MyNickname init="---" myNames={names} />
	</React.StrictMode>
);