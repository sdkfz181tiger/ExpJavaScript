console.log("Hello, JavaScript!!");

// べき乗計算を効率的に行う(バイナリ法)

let x = 3;
let n = 11;

let cnt = 0;// カウンタ

// 3の11乗を求める
let result = 1;
while(n != 0){
	if(n%2 == 1){// 1だった場合はxを掛ける
		cnt++;
		result *= x;
	}
	cnt++;
	n = Math.floor(n / 2);// 2で割る
	x *= x;
}

console.log("結果:", result, "カウンタ:", cnt);