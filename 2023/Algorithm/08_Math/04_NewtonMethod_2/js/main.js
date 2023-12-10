console.log("Hello, JavaScript!!");

// ニュートン法で近似値を算出する(JSXグラフで描く)

// 関数: f(x) = (x^2)/2 - 5
const f = x => (x**2)/2 - 5;

// 導関数: f'(x) = x
const fd = x => x;

const threshould = 0.0001;// 閾値

window.onload = ()=>{

	// JSXGraph
	const jsx = JXG.JSXGraph.initBoard("jxgbox", 
		{axis: true, boundingbox: [-5, 50, 10, -10]});
	jsx.create("functiongraph", [f], "blue");

	let a = 9;// 適当な値で良い(解のいずれかに近づく)

	for(let i=0; i<3; i++){
		drawLine(jsx, a);// 接線を描く
		const b = a - f(a) / fd(a);// 漸化式で近似値を算出
		const diff = Math.abs(b - a);// aとbの距離を算出
		a = b;// 近似値を更新(近づける)
		console.log("i:" + i, "diff:" + diff);
		if(diff < threshould) break;// 閾値以下であれば中止
	}
	console.log("a:" + a);
}

function drawLine(jsx, t){
	jsx.create("point", [t, f(t)], "red");
	jsx.create("functiongraph", [x=>fd(t)*(x-t)+f(t)], "blue");
}