console.log("Hello, JavaScript!!");

// 逆ポーランド記法(基礎)_計算処理と一般式への変換

const pattern = /^([1-9]\d*|0)$/;

window.onload = ()=>{

	const str = "432*+2/";// 逆ポーランド記法
	const decoded = decodePoland(str);// 一般式に変換
	const result = executePoland(str);// 逆ポーランド記法を計算
	console.log("Decoded:" + decoded + " = " + result);
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