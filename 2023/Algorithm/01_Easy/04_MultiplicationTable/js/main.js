console.log("Hello, JavaScript!!");

// 九九表を作る

//==========
// for文を使う
for(var r=1; r<=9; r++){
	for(var c=1; c<=9; c++){
		var result = r * c;
		console.log("[" + r + " x " + c + "]の答えは " + result + "です。");
	}
}

//==========
// 2次元配列に格納する
var data = [];
for(var r=1; r<=9; r++){
	var arr = [];
	data.push(arr);
	for(var c=1; c<=9; c++){
		var result = r * c;
		arr.push(result);
	}
}

console.log("配列を表示します");
console.log(data);

console.log("特定の計算結果を表示します");
console.log(data[0][0]);// 1 x 1
console.log(data[1][1]);// 2 x 2
console.log(data[3][3]);// 3 x 3
