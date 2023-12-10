"use strict"

const COLORS = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"];
const WHITE  = "#FFFFFF";
const BLACK  = "#000000";
const YELLOW = "#FFFF00";
const BLUE   = "#0000FF";

const enemyW  = 60;
const enemies = [];
let corpsW;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	frameRate(24);
	noSmooth();

	noFill();
	stroke(WHITE); strokeWeight(1); strokeCap(PROJECT);

	// Enemies
	const pX = enemyW * 1.2;
	const pY = enemyW * 1.1;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	corpsW = cols*pX;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pX;
			let y = r * pY;
			if(r%2==0) x += pX/2;
			const vX = (r%2==0) ? 1.5:1;
			const enemy = new MyEnemy(x, y, vX, enemyW);
			enemies.push(enemy);
		}
	}
}

function draw(){
	background(BLACK);

	for(let enemy of enemies){
		enemy.draw();
		if(enemy.isHit(mouseX, mouseY)) enemy.dead();
	}

	fill(YELLOW);
	noStroke();
	arc(mouseX, mouseY, 80, 80, 30, 330);
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}

class MyEnemy{

	constructor(x, y, vX, dia){
		this._x     = x;
		this._y     = y;
		this._vX    = vX;
		this._dia   = dia;
		this._col   = getColor();
		this._eyeL  = {x:-dia*0.22, y:-dia*0.12};
		this._eyeR  = {x: dia*0.22, y:-dia*0.12};
		this._ijike = (random() < 0.2);
		this._dead  = false;
		if(this._ijike) this._col = BLUE;
	}

	isHit(x, y){
		const dX = x - this._x;
		const dY = y - this._y;
		if(x < this._x - this._dia) return false;
		if(y < this._y - this._dia) return false;
		if(this._x + this._dia < x) return false;
		if(this._y + this._dia < y) return false;
		this.dead();// Dead
		return false;
	}

	dead(){
		if(!this._ijike) return;
		if(this._dead) return;
		this._dead = true;
	}

	draw(){

		this._x += this._vX;
		if(corpsW - enemyW/2 < this._x){
			this._x -= corpsW;
			this._dead = false;// Alive
		}

		if(this._dead) return;

		fill(this._col);
		stroke(this._col); strokeWeight(2);

		push();
		translate(this._x, this._y);

		const rad = this._dia / 2;
		arc(0, 0, this._dia, this._dia, 180, 360);
		rect(-rad, 0, this._dia, rad/2);
		triangle(0, rad/2, -rad, rad/2, -rad, rad);
		triangle(0, rad/2, rad, rad/2, rad, rad);
		triangle(-rad/2, rad/2, 0, rad, rad/2, rad/2);

		fill(WHITE);
		if(this._ijike==false){
			noStroke();
			ellipse(this._eyeL.x, this._eyeL.y, rad*0.6, rad*0.7);
			ellipse(this._eyeR.x, this._eyeR.y, rad*0.6, rad*0.7);

			fill(BLACK);
			const frmLx = this._x + this._eyeL.x;
			const frmLy = this._y + this._eyeL.y;
			const aimLd = atan2(mouseY-frmLy, mouseX-frmLx);
			const aimLx = this._eyeL.x + rad*0.18 * cos(aimLd);
			const aimLy = this._eyeL.y + rad*0.18 * sin(aimLd);
			circle(aimLx, aimLy, rad*0.3);

			const frmRx = this._x + this._eyeR.x;
			const frmRy = this._y + this._eyeR.y;
			const aimRd = atan2(mouseY-frmRy, mouseX-frmRx);
			const aimRx = this._eyeR.x + rad*0.15 * cos(aimRd);
			const aimRy = this._eyeR.y + rad*0.15 * sin(aimRd);
			circle(aimRx, aimRy, rad*0.3);
		}else{
			noStroke();
			circle(this._eyeL.x, this._eyeL.y, rad*0.4);
			circle(this._eyeR.x, this._eyeR.y, rad*0.4);

			noFill();
			stroke(WHITE); strokeWeight(rad*0.12);

			const uY = rad*0.25;
			const mS = rad*0.15;
			beginShape();
			vertex(-mS*4, uY+mS);
			vertex(-mS*3, uY);
			vertex(-mS*2, uY+mS);
			vertex(-mS*1, uY);
			vertex(-mS*0, uY+mS);
			vertex(mS*1,  uY);
			vertex(mS*2,  uY+mS);
			vertex(mS*3,  uY);
			vertex(mS*4,  uY+mS);
			endShape();
		}
		pop();
	}
}