
const C_WIDTH  = 360;
const C_HEIGHT = 360;
const G_SIZE   = 20;
const A_SIZE   = 60;

function setup(){
	createCanvas(C_WIDTH, C_HEIGHT);
	angleMode(DEGREES);
	noLoop();
	noSmooth();
}

function draw(){
	background(0);
	drawGrid();
}

function mousePressed(){

	const cX = C_WIDTH / 2;
	const cY = C_HEIGHT / 2 - 120;
	drawArc(cX, cY);
}

function drawArc(cX, cY){
	noStroke();
	strokeWeight(0);
	fill(255);

	circle(cX, cY, 8);// From

	let fX = cX;
	const fY = cY
	const tX = mouseX;
	const tY = mouseY;

	stroke(255);
	strokeWeight(2);
	noFill();
	if(tX-cX < 0){
		arc(cX+A_SIZE/2, cY, A_SIZE, A_SIZE, 180, 360);
		fX += A_SIZE;
	}else{
		arc(cX-A_SIZE/2, cY, A_SIZE, A_SIZE, 180, 360);
		fX -= A_SIZE;
	}
	
	drawSin(fX, fY, tX, tY);
}

function drawSin(fX, fY, tX, tY){
	noStroke();
	strokeWeight(0);
	fill(255);

	circle(fX, fY, 6);// From
	circle(tX, tY, 6);// To

	const oY = tY + (tY - fY) / 2;
	const cR = 270 / (oY - fY);
	const rR = (fX - tX) / 2;

	const sY = (oY - fY) / 3;
	for(let i=sY; i<C_WIDTH; i++){
		const rad = i * Math.PI / 180;
		const x = fX + rR * Math.sin(rad * cR) - rR;
		const y = fY + i - sY;
		circle(x, y, 2);
	}
}

function drawGrid(){
	stroke(66);
	strokeWeight(2);
	noFill();

	const rows = C_HEIGHT / G_SIZE;
	const cols = C_WIDTH / G_SIZE;
	for(let r=1; r<rows; r++){
		const y = Math.floor(r*G_SIZE);
		line(0, y, C_WIDTH, y);
		for(let c=1; c<cols; c++){
			const x = Math.floor(c*G_SIZE);
			line(x, 0, x, C_HEIGHT);
		}
	}
}