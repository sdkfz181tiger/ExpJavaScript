"use strict"

const labels = [
	{"limit": 18.5, "label": "やせ"},
	{"limit": 25.0, "label": "標準"},
	{"limit": 30.0, "label": "軽度肥満"},
	{"limit": 99.9, "label": "重度肥満"}
];

// MyTitle
const MyTitle = ({myMsg})=>{return(
	<div>
		<h1>{myMsg}</h1>
	</div>
);}

// MyBmiCalc
const MyBmiCalc = ({myMsg, myLabels})=>{

	const [form, setForm] = React.useState({// State
		cm: 170, kg: 60
	});
	const handleForm = e=>{
		setForm({...form, [e.target.name]: e.target.value});
	}

	const [result, setResult] = React.useState(myMsg);// State
	const clickEvent = ()=>{
		// Calc
		const bmi = Number(form.kg) / ((Number(form.cm)*0.01)**2);
		let result = "Error";
		for(let myLabel of myLabels){
			if(bmi < myLabel.limit){
				result = myLabel.label;
				break;
			}
		}
		setResult(result);// Result
	}
	return(
	<div>
		<p>
			身長(cm): <input name="cm" type="number" 
				onChange={handleForm} value={form.cm}/>
		</p>
		<p>
			体重(kg): <input name="kg" type="number" 
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
		<MyTitle myMsg="BMI Calc" />
		<MyBmiCalc myMsg="---" myLabels={labels} />
	</React.StrictMode>
);