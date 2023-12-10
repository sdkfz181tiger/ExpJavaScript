"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("silver");

	noFill();// 塗りなし
	stroke("white");// 線の色
	strokeWeight(5);// 線の太さ

	//==========
	// 縦、横、斜め

	stroke("red");
	// 5回繰り返す処理(0,1,2,3,4)
	for(let i=0; i<5; i++){
		let x = i * 50;// // x座標(0,50,100,150,200)
		square(x, 0, 50);
	}

	stroke("green");
	// 5回繰り返す処理(0,1,2,3,4)
	for(let i=0; i<5; i++){
		let y = i * 50;// // x座標(0,50,100,150,200)
		square(0, y, 50);
	}

	stroke("blue");
	// 5回繰り返す処理(0,1,2,3,4)
	for(let i=0; i<5; i++){
		let x = i * 50;// // x座標(0,50,100,150,200)
		let y = i * 50;// // x座標(0,50,100,150,200)
		square(x, y, 50);
	}

	//==========
	// キャンバス中央から右上、左下、右下

	stroke("red")
	// 5回繰り返す処理(0,1,2,3,4)
	for(let i=0; i<5; i++){
		let x = width/2 + i * 50;// // x座標(0,50,100,150,200)
		let y = height/2 + i * 50;// // x座標(0,50,100,150,200)
		square(x, y, 50);
	}

	//==========
	// キャンバス右上から、左下から、右下から

	stroke("red")
	// 5回繰り返す処理(0,1,2,3,4)
	for(let i=0; i<5; i++){
		let x = width - i * 50;// // x座標(0,50,100,150,200)
		let y = i * 50;// // x座標(0,50,100,150,200)
		square(x, y, 50);
	}
}