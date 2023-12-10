console.log("Hello, JavaScript!!");

// 小町算

const OP_SPACE = 0;
const OP_ADD   = 1;
const OP_SUB   = 2;
const OP_MUL   = 3;
const OP_DIV   = 4;

window.onload = ()=>{

	createExpression([]);
}

function createExpression(arr){

	// 演算子が揃った状態でチェック
	if(7 < arr.length){
		checkExpression(arr);
		return;
	}

	// 演算子5種を追加する
	for(let i=0; i<5; i++){
		arr.push(i);
		createExpression(arr);
		arr.pop();
	}
}

function checkExpression(arr){
	//console.log("checkExpression:", arr);

	// 数式を構築
	const exps1 = [];
	for(let i=0; i<arr.length; i++){
		exps1.push(i+1);
		exps1.push(arr[i]);
	}
	exps1.push(arr.length+1);

	const exps2 = jointArr(exps1);// 空白を連結
	//console.log("小町算1:", exps2);
	const exps3 = calcArr(exps2, true);// 掛け算、割り算
	//console.log("小町算2:", exps3);
	const exps4 = calcArr(exps3, false);// 足し算、引き算
	//console.log("小町算3:", exps4);

	if(exps4[0] == 100) showResult(arr);
}

function jointArr(arr){
	// 空白だった場合は連結
	const output = [];
	for(let i=0; i<arr.length; i++){
		if(i%2 == 0){
			output.push(arr[i]);
			continue;
		}
		const op = arr[i];
		if(op != OP_SPACE){
			output.push(arr[i]);
		}else{
			const last = output[output.length-1];// Last
			const str = last + String(arr[i+1]);// Joint
			output[output.length-1] = Number(str);
			i++;
		}
	}
	return output;
}

function calcArr(arr, flg){
	// 計算を実行
	const output = [];
	for(let i=0; i<arr.length; i++){
		if(i%2 == 0){
			output.push(arr[i]);
			continue;
		}
		const op = arr[i];
		if(flg){
			// 掛け算、割り算を実行
			if(op == OP_MUL || op == OP_DIV){
				last = output[output.length-1];// Last
				if(op == OP_MUL) last *= arr[i+1];
				if(op == OP_DIV) last /= arr[i+1];
				output[output.length-1] = last;
				i++;
			}else{
				output.push(arr[i]);
			}
		}else{
			// 足し算、引き算を実行
			if(op == OP_ADD || op == OP_SUB){
				last = output[output.length-1];// Last
				if(op == OP_ADD) last += arr[i+1];
				if(op == OP_SUB) last -= arr[i+1];
				output[output.length-1] = last;
				i++;
			}else{
				output.push(arr[i]);
			}
		}
	}
	return output;
}

function showResult(arr){
	let str = "";
	for(let i=0; i<arr.length; i++){
		str += i + 1;
		const op = arr[i];
		if(op == OP_SPACE) str += "";
		if(op == OP_ADD) str += "+";
		if(op == OP_SUB) str += "-";
		if(op == OP_MUL) str += "*";
		if(op == OP_DIV) str += "/";
	}
	str += "9";

	const test = eval(str);
	if(test == 100){
		console.log("小町算:", str, " = ", test);
	}
}