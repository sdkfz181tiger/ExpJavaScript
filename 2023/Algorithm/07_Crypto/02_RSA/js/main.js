console.log("Hello, JavaScript!!");

// RSA暗号を使ってみる
// 大きな素数による素因数分解が困難であることを安全性の根拠としている

// 1, 素数を2つ用意する
const p = 11;
const q = 19;
console.log("素数p:", p, " 素数q:", q);

// 2, nをもとめる
const n = p * q;
console.log("公開鍵n:", n);

// 3, オイラーのφ関数をもとめる
//    φ(p*q) = (p-1) * (q-1)
const φ = (p-1) * (q-1);
console.log("非公開φ:", φ);

// 4, 1<e<nとなるeで、φ(n)と互いに素な数を選ぶ
const e = getPublicKey(n);
console.log("公開鍵e:", e);

// 5, ed≡1(mod φ(n))をみたす整数dをもとめる
//    ユークリッド互除法を利用すると良いらしい
const d = getPrivateKey(e, φ);
console.log("秘密鍵d:", d);

//==========
// テスト(1 ~ n未満まで、暗号化->復号化を試してみる)
let completeFlg = true;
for(let i=1; i<n; i++){
	const msg = i;// n未満の整数
	const crp = (BigInt(msg)**BigInt(e)) % BigInt(n);// 暗号化
	const dec = (BigInt(crp)**BigInt(d)) % BigInt(n);// 複合化
	const result = (msg == dec) ? "o" : "x";
	if(!result) completeFlg = false;
	console.log("原文:", msg, "暗号:", crp, "復号:", Number(dec), "結果:", result);
}
if(completeFlg){
	console.log("Checking SUCCESS");
}else{
	console.log("Checking ERROR");
}

// 公開鍵を作る関数(単純に素数でOK)
//    1<e<nとなるeで、φ(n)と互いに素な数を選ぶ
function getPublicKey(n){
	const MAX   = n;
	const LIMIT = Math.sqrt(MAX);
	const siev  = new Array(MAX).fill(true);
	for(let i=2; i<=LIMIT; i++){
		for(let n=i+1; n<=MAX; n++){
			if(n%i == 0) siev[n] = false;
		}
	}
	const primes = [];
	for(let i=2; i<siev.length; i++){
		if(siev[i]) primes.push(i);
	}
	const rdm = Math.floor(Math.random()*primes.length);
	return primes[rdm];
}

// 秘密鍵を作る関数
//    ed≡1(mod φ(n)) をみたす整数dをもとめる関数
function getPrivateKey(e, φ){
	let n3 = e; 
	let m3 = φ;
	let x1 = 1;
	let y1 = 0;
	let x2 = 0;
	let y2 = 1;
	let m1, x3, y3;
	while((n3 % m3) != 0){
		m1 = n3 % m3
		x3 = x2;
		y3 = y2;
		x2 = x1 - x2 * Math.floor(n3 / m3);
		y2 = y1 - y2 * Math.floor(n3 / m3);
		x1 = x3;
		y1 = y3;
		n3 = m3;
		m3 = m1;
	}
	if(x2 > 0) return x2;
	return x2 + φ;
}