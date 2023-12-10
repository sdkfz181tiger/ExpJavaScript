"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("black");

	noFill();
	stroke("darkgreen");
	strokeWeight(5);

	angleMode(DEGREES);

	let rad = 80;// 菱形の大きさ
	let padX = rad * cos(30) * 2;
	let padY = rad * sin(30) * 3;
	let rows = height / padY + 1;
	let cols = width / padX + 1;

	// rows回繰り返す処理
	for(let r=0; r<rows; r++){
		// cols回繰り返す処理
		for(let c=-5; c<cols; c++){
			let x = c * padX + r * padX / 2;
			let y = r * padY;
			if(c%2 == 0){
				drawCubeA(x, y, rad);
			}else{
				drawCubeB(x, y, rad);
			}
		}
	}
}

// 菱形を描く関数
function drawRhombus(x, y, r, d, c){
	fill(c);
	beginShape();
	vertex(x, y);
	for(let i=0; i<3; i++){
		let pX = x + cos(d+i*60-60) * r;
		let pY = y + sin(d+i*60-60) * r;
		vertex(pX, pY);
	}
	endShape(CLOSE);
}

// 立方体Aを描く関数
function drawCubeA(x, y, r){

	drawRhombus(x, y, r, 270, "darkorange");
	drawRhombus(x, y, r, 30, "green");
	drawRhombus(x, y, r, 150, "green");
}

// 立方体Bを描く関数
function drawCubeB(x, y, r){

	drawRhombus(x, y, r, 270, "darkgreen");
	drawRhombus(x, y, r, 30, "orange");
	drawRhombus(x, y, r, 150, "orange");
	drawRhombus(x+cos(30)*r, y+sin(30)*r, r*0.66, 210, "darkorange");
	drawRhombus(x+cos(30)*r, y+sin(30)*r, r*0.33, 210, "orangered");
	drawRhombus(x+cos(150)*r, y+sin(150)*r, r*0.66, 330, "darkorange");
	drawRhombus(x+cos(150)*r, y+sin(150)*r, r*0.33, 330, "orangered");
}