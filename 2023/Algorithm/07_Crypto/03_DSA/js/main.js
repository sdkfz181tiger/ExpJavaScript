console.log("Hello, JavaScript!!");

// DSA署名を使ってみる
// 離散対数問題と呼ばれる数学上の問題を安全性の根拠としている

// 1, 素数を3つ用意する
const p = 23n;
const q = 11n;// qは、p-1で割り切れる数
const g = 2n; // g^q mod pが、1になる様な数
console.log("素数p:", p, " 素数q:", q);

// 2, 秘密鍵を用意する
const d = 3n;
console.log("秘密鍵d:", d);

// 3, 公開鍵を用意する
const n = g**d % q;
console.log("公開鍵n:", n);

// 4, 署名対象のデータをHash値に変換
const msg = "Digital Signature Algorithm!!";
sha256(msg).then((hash)=>{
	console.log("Hash値:", hash)

	// iかwがnullの場合、kを再生成
	while(true){

		// 5, 署名値を用意する(r, sを検証側に送信する)
		const k = (BigInt(Math.floor(Math.random()*100))*(q-1n)+1n)/100n;// 1からq-1までの乱数
		const r = ((g**k)%p) % q;// 署名値r
		const i = modInv(k, q);// 逆元
		if(i == null) continue;// nullの時はkを再生成
		const s = (i * (hash + d * r)) % q;// 秘密鍵dを元にしてsを生成

		// 6, 署名を検証する(r, sを元にして署名を検証する)
		const w = modInv(s, q);// 逆元
		if(w == null) continue;// nullの時はkを再生成
		const u1 = (hash * w) % q;
		const u2 = (r * w) % q;
		const v = ((g**u1) * (n**u2)%p) % q;// 公開鍵nを使って検証値vを生成
		console.log("乱数k:", k, "署名値r:", r, "検証値v:", v);

		// 7, 署名値と検証値の一致を確認
		if(r == v){
			console.log("署名が一致しました!!");
		}else{
			console.log("署名が一致しません...");
		}

		break;
	}
});

// Hash値を計算する関数
async function sha256(msg){
	const uint8 = new TextEncoder().encode(msg);
	const buf = await crypto.subtle.digest("SHA-256", uint8);
	const arr = Array.from(new Uint8Array(buf));
	const hex = arr.map(b => b.toString(16).padStart(2, "0")).join("");
	return BigInt(parseInt(hex, 16));
}

// 逆元を求める関数
function modInv(a, m){
	const [g, x] = extGcd(a, m);
	if(g !== 1n) return null;
	return (x%m+m) % m;
}

// 拡張ユークリッド互助法
function extGcd(a, b){
	if(b === 0n) return [a, 1n, 0n];
	const [g, x, y] = extGcd(b, a%b);
	return [g, y, x - BigInt(a/b) * y];
}