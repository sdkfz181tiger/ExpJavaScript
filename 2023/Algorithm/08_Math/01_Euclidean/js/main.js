console.log("Hello, JavaScript!!");

// ユークリッドの互除法

let numA = 1071;
let numB = 1029;

let result = calc(numA, numB);
console.log(result);

function calc(a, b){

	while(true){
		let q = Math.floor(a / b);
		let r = a % b;
		console.log(a + " / " + b + " = " + q + " ..." + r);
		if(r == 0) return b;
		a = b;
		b = r;
	}
	return -1;
}