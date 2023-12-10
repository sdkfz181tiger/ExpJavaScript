"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("palevioletred");

	noFill();
	stroke("darkmagenta");
	strokeWeight(5);

	angleMode(DEGREES);

	let rad = 80;// ユニットの大きさ
	let padX = rad * cos(30) * 2;// ユニットの横間隔
	let padY = rad * sin(30) * 3;// ユニットの縦間隔
	let rows = height / padY;
	let cols = width / padX;

	// rows回繰り返す処理
	for(let r=0; r<rows; r++){
		// cols回繰り返す処理
		for(let c=0; c<cols; c++){
			let x = c * padX;
			let y = r * padY;
			if(r%2 == 0) x += padX / 2;// 偶数行の時は半分ずらす
			drawUnit(x, y, rad);// ユニットを描く処理
		}
	}
}

// ユニットを描く処理
function drawUnit(x, y, r){

	// 六角形を描画する
	beginShape();// 描画開始
	let a = 360 / 6;// 60度
	for(let i=0; i<6; i++){
		let pX = x + cos(i*a+30) * r;
		let pY = y + sin(i*a+30) * r;
		vertex(pX, pY);// 頂点の指定
	}
	endShape(CLOSE);// 描画終了

	// 正三角形を描画する
	beginShape();// 描画開始
	let b = 360 / 3;// 120度
	for(let i=0; i<3; i++){
		let pX = x + cos(i*b-90) * r;
		let pY = y + sin(i*b-90) * r;
		vertex(pX, pY);// 頂点の指定
		line(x, y, pX, pY);// 中心から線を引く
	}
	endShape(CLOSE);// 描画終了
}