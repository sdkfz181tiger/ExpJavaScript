console.log("Hello, JavaScript!!");

// 動的計画法を利用してフィボナッチ数を計算する

// フィボナッチ数を記録する配列
const n = 45;
const numbers = new Array(n+1).fill(-1);
const result = calcFibonacci(n);
console.log("配列:", numbers);
console.log("フィボナッチ数[" + n + "]: " + result);

// n番目のフィボナッチ数を返す関数
function calcFibonacci(n){
	if(numbers[n] == -1){
		if(n <= 0){
			numbers[0] = 0;
		}else if(n == 1){
			numbers[1] = 1;
		}else{// 再起処理
			numbers[n] = calcFibonacci(n-1) + calcFibonacci(n-2);
		}
	}
	return numbers[n];// 配列から返す
}