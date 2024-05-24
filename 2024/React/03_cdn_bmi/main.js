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

// BMI Calc
const MyBMICalc = ({init})=>{
	const [result, setResult] = React.useState(init);// State
	const clickEvent =()=>{
		console.log("Click!!");
		setResult("Hogehoge");
	}
	return(
	<div>
		<p>身長(cm): <input name="cm" type="text" value="170"/></p>
		<p>体重(kg): <input name="kg" type="text" value="60"/></p>
		<p><button onClick={clickEvent}>計算</button></p>
		<p>結果: {result}</p>
	</div>
);}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyTitle myTitle="BMI Calc" />
		<MyBMICalc init="---" />
	</React.StrictMode>
);