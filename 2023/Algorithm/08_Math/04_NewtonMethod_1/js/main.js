console.log("Hello, JavaScript!!");

// ニュートン法で近似値を算出する

// 関数: f(x) = x^2 - 25 (解は-5,5である)
const f = x => x**2.0 - 25.0;

// 導関数: f'(x) = 2x
const fd = x => 2.0 * x;

const threshould = 0.0001;// 閾値

window.onload = ()=>{

	let a = 100;// 適当な値で良い(解のいずれかに近づく)
	for(let i=0; i<10; i++){
		const b = a - f(a) / fd(a);// 漸化式で近似値を算出
		const diff = Math.abs(b - a);// aとbの距離を算出
		a = b;// 近似値を更新(近づける)
		console.log("i:" + i, "diff:" + diff);
		if(diff < threshould) break;// 閾値以下であれば中止
	}
	console.log("a:" + a);
}