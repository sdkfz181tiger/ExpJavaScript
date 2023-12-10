console.log("Hello, JavaScript!!");

// パリティビットを使う(偶数パリティとする)

let str = "01001101";// 対象データ
console.log("対象データ", str);

// XORを演算する
let xor = str[0];
for(let i=1; i<str.length; i++){
	const num = parseInt(str[i]);// 数値に変換
	const bin = parseInt(num.toString(2));// 2bitに変換
	xor ^= bin;// XOR演算
}
console.log("xor:", xor);

// 先頭にパリティを付ける
if(xor == 0){
	console.log("偶数パリティです");
	str = "0" + str;// "0"を付ける(そのまま)
}else{
	console.log("奇数パリティです");
	str = "1" + str;// "1"を付ける(偶数になる様に)
}

console.log("送信データ:", str);