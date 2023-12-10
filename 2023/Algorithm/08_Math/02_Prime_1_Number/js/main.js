console.log("Hello, JavaScript!!");

// 素数判定関数

const NUM_MAX = 50;

for(let n=2; n<=NUM_MAX; n++){
	if(isPrime2(n)) console.log(n + "は素数です!!");
}

// 純粋な判定(2~nまで全てを調べる)
function isPrime1(n){
	for(let i=2; i<n; i++){
		if(n%i == 0) return false;
	}
	return true;
}

// 効率的な判定(2~√nまでを調べる)
function isPrime2(n){
	for(let i=2; i**2<=n; i++){
		if(n%i == 0) return false;
	}
	return true;
}