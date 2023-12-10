console.log("Hello, JavaScript!!");

// モンテカルロ法で円周率を計算する
//    1, 半径rの正円と、それに外接する正方形(1辺が2r)を描く
//    2, 描いた正方形の中にランダムに点を打っていく
//    3, 正円の内部に点が存在する確率は円周率に近い値となる
//    計算:
//       正円の内部に点が存在する確率をpとすると、
//       内側:外側の比から、
//          p : (1-p) = πr^2 : (2r)^2 - πr^2
//          4 * p = π
//       となるので、pについてモンテカルロ法で値を算出していく。

const C_SIZE = 320;// キャンバスの大きさ

// キャンバス,コンテキスト
let canvas, ctx;

window.onload = ()=>{
	console.log("onload");

	// Canvas
	canvas  = document.getElementById("canvas");
	canvas.width  = C_SIZE;
	canvas.height = C_SIZE;
	// Context
	ctx = canvas.getContext("2d");

	const result = montecalro();// モンテカルロ法
	console.log("result:", result);
	drawText("円周率:"+result, C_SIZE/2, C_SIZE/2);
}

function montecalro(){
	// 背景を描画する
	ctx.fillStyle = "silver";
	ctx.fillRect(0, 0, C_SIZE, C_SIZE);
	// 円を描画する
	drawCircle(0, 0, C_SIZE, "white");
	// 点を描画する
	const total = 1000;// 打つ点の総数
	let cnt = 0;
	const limit = C_SIZE**2;
	for(let i=0; i<total; i++){
		const x = Math.random()*C_SIZE;
		const y = Math.random()*C_SIZE;
		const d = x**2 + y**2;
		if(d < limit){
			drawCircle(x, y, 2, "red");
			cnt++;
		}else{
			drawCircle(x, y, 2, "blue");
		}
	}
	return (cnt / total) * 4;// "π / 4 = 確率"からπを求める
}

function drawCircle(x, y, r, color){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.arc(x, y, r, 0, Math.PI*2);
	ctx.closePath();
	ctx.fill();
}

function drawText(text, x, y){
	ctx.fillStyle = "black";
	ctx.font      = "24px Arial";
	ctx.textAlign = "center";
	ctx.fillText(text, x, y);
}