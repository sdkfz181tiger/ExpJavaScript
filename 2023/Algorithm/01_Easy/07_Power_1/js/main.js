console.log("Hello, JavaScript!!");

// べき乗計算を効率的に行う(再起処理)

const x = 3;
const n = 11;

let cnt = 0;// カウンタ

// 3の11乗を求める
const result = pow(3, 11);
console.log("結果:", result, "カウンタ:", cnt);

function pow(x, n){
	if(n == 1) return x;
	const tmp = pow(x, Math.floor(n/2));// n/2乗を再帰
	if(n%2 == 0){
		cnt += 1;
		return tmp * tmp;// 偶数の場合
	}else{
		cnt += 2;
		return tmp * tmp * x;// 奇数の場合
	}
}