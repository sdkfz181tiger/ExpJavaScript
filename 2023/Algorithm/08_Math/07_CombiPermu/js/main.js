console.log("Hello, JavaScript!!");

// 与えられた文字列の組み合わせと順列を出力する

const combi = [];// 組み合わせ
console.log("= Combinations =");
combinations("ABCD", "", 3);
console.log("Combinations:", combi);

const permu = [];// 順列
console.log("= Permutations =");
patterns("ABCD", "", 3);
console.log("Patterns:", permu);

// 組み合わせ
function combinations(input, output, limit){
	if(limit <= output.length){
		//console.log("結果:", output);
		combi.push(output);
		return;
	}
	if(input.length <= 0) return;
	const front = input[0];// 先頭の文字
	const back = input.slice(1);// 以降の文字列
	combinations(back, output+front, limit);// 選択した場合
	combinations(back, output, limit);// 選択しなかった場合
}

// 順列
function patterns(input, output, limit){
	if(limit <= output.length){
		//console.log("結果:", output);
		factorial(output, "");
		return;
	}
	if(input.length <= 0) return;
	const front = input[0];// 先頭の文字
	const back = input.slice(1);// 以降の文字列
	patterns(back, output+front, limit);// 選択した場合
	patterns(back, output, limit);// 選択しなかった場合
}

// 階乗
function factorial(input, output){
	if(input.length <= 0){
		//console.log("結果:", output);
		permu.push(output);
		return;
	}
	for(let i=0; i<input.length; i++){
		let picked = input[i];// 選択する文字
		let str = "";// 未選択の文字列
		for(let s=0; s<input.length; s++){
			if(i!=s) str += input[s];
		}
		factorial(str, output+picked);
	}
}