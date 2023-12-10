console.log("Hello, JavaScript!!");

// 逆ポーランド記法(応用)_10パズルソルバー

const pattern = /^([1-9]\d*|0)$/;
const ops = "+-*/";// 演算子

window.onload = ()=>{

	const ptns = factorial("7348", "");
	for(let ptn of ptns){
		//console.log("ptn:", ptn);
		for(let op1 of ops){
			for(let op2 of ops){
				for(let op3 of ops){
					check10(ptn[0] + ptn[1] + ptn[2] + ptn[3] + op1 + op2 + op3);// xxxxoooのパタン
					check10(ptn[0] + ptn[1] + ptn[2] + op1 + ptn[3] + op2 + op3);// xxxoxooのパタン
					check10(ptn[0] + ptn[1] + ptn[2] + op1 + op2 + ptn[3] + op3);// xxxooxoのパタン
					check10(ptn[0] + ptn[1] + op1 + ptn[2] + ptn[3] + op2 + op3);// xxoxxooのパタン
					check10(ptn[0] + ptn[1] + op1 + ptn[2] + op2 + ptn[3] + op3);// xxoxoxoのパタン
				}
			}
		}
	}
}

function check10(exp){
	const result = executePoland(exp);
	if(result != 10) return false;
	const decoded = decodePoland(exp);
	if(eval(decoded) != 10) return false;
	console.log("Found:", exp, " -> ", decoded, "=", result);
	return true;
}

// パターン文字列を取得する
function factorial(input, output, ptns=new Set()){
	if(input.length <= 0){
		ptns.add(output);
		return;
	}
	for(let i=0; i<input.length; i++){
		let picked = input[i];// 選択する文字
		let str = "";// 未選択の文字列
		for(let s=0; s<input.length; s++){
			if(i!=s) str += input[s];
		}
		factorial(str, output+picked, ptns);
	}
	return ptns;
}

// 逆ポーランド記法を計算する
function executePoland(str){

	const arr = [];// 計算用配列
	for(let s of str){
		// 数値か演算子か
		if(pattern.test(s)){
			arr.push(Number(s));// 数値を格納する
			continue;
		}
		// 2つの数値を取り出す
		const second = arr.pop();
		const first  = arr.pop();
		// 四則演算の実行
		if(s == "+") arr.push(first + second);
		if(s == "-") arr.push(first - second);
		if(s == "*") arr.push(first * second);
		if(s == "/") arr.push(first / second);
	}
	return arr.pop();// 計算結果
}

// 逆ポーランド記法を一般式に変換する
function decodePoland(str){

	const arr = [];// 復元用配列
	for(let s of str){
		// 数値か演算子か
		if(pattern.test(s)){
			arr.push(s.toString());// 数値を格納する
			continue;
		}
		// 2つの数値を取り出す
		let second = arr.pop();
		let first  = arr.pop();
		// *, /の優先順位が高いので、計算式前後に()をつける
		if(s == "*" || s == "/" || s == "-"){
			if(1 < first.length) first = "(" + first + ")";
			if(1 < second.length) second = "(" + second + ")";
		}
		// 演算子を元に復元した計算式を配列の末尾に追加
		if(s == "+") arr.push(first + "+" + second);
		if(s == "-") arr.push(first + "-" + second);
		if(s == "*") arr.push(first + "*" + second);
		if(s == "/") arr.push(first + "/" + second);
	}
	return arr.pop();
}