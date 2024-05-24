"use strict"

const results = [
	"やせ",
	"標準",
	"軽度肥満",
	"重度肥満"
];

// Title
const MyTitle = ({myTitle})=>{return(
	<div>
		<h1>{myTitle}</h1>
	</div>
);}

// BMI Calc
const MyBMICalc = ({init, myResults})=>{

	const [form, setForm] = React.useState({// State
		cm: 170,
		kg: 60
	});
	const handleForm = e=>{
		setForm({...form, [e.target.name]: e.target.value});
	}

	const [result, setResult] = React.useState(init);// State
	const clickEvent =()=>{
		// Calc
		const bmi = Number(form.kg) / ((Number(form.cm) * 0.01)**2);
		let result = "---";
		if(bmi < 18.5) result = myResults[0];
		else if(bmi < 25.0) result = myResults[1];
		else if(bmi < 30.0) result = myResults[2];
		else result = myResults[3];
		setResult(result);// Result
	}
	return(
	<div>
		<p>
			身長(cm): <input id="cm" name="cm" type="text" 
				onChange={handleForm} value={form.cm}/>
		</p>
		<p>
			体重(kg): <input id="kg" name="kg" type="text" 
				onChange={handleForm} value={form.kg}/>
		</p>
		<p>
			<button onClick={clickEvent}>計算</button>
		</p>
		<p>結果: {result}</p>
	</div>
);}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyTitle myTitle="BMI Calc" />
		<MyBMICalc init="---" myResults={results} />
	</React.StrictMode>
);