"use strict"

const COLORS = ["#00A6FB", "#0582CA", "#006494"];
const WHITE  = "#EEEEEE";
const BLACK  = "#003554";

const rds = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); imageMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	frameRate(32);

	const max = floor(width / 30);
	for(let i=0; i<100; i++){
		const x   = random(width);
		const y   = random(height);
		const vX  = random(-0.2, 0.2);
		const vY  = random(1.4, 3.0);
		const len = max*random(0.4, 1.0);
		const rot = random(-10, 10);
		const rd  = new RainDrop(x, y, vX, vY, len, rot);
		rds.push(rd);
	}
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	stroke(WHITE); strokeWeight(1);
	for(let rd of rds) rd.update();
}

class RainDrop{

	constructor(x, y, vX, vY, len, rot){
		this._x   = x;
		this._y   = y;
		this._vX  = vX;
		this._vY  = vY;
		this._len = len;
		this._rot = rot;
		this._color = getColor(COLORS);
	}

	update(){
		this._x += this._vX;
		this._y += this._vY;
		if(height+this._len*2 < this._y){
			this._x = random(width);
			this._y = -this._len;
		}
		this.draw();
	}

	draw(){
		const len = this._len;
		const h   = len;
		const l   = -len / 2;
		const r   = len / 2;
		fill(this._color); noStroke();
		push();
		translate(this._x, this._y);
		rotate(this._rot);
		beginShape();
		vertex(l, 0);
		bezierVertex(l, -h/10, l, -h*0.3, 0, -h);
		bezierVertex(r, -h*0.3, r, -h/10, r, 0);
		endShape(CLOSE);
		arc(0, -1, len, len, 0, 180);
		fill(WHITE); noStroke();
		circle(-len*0.15, -len*0.1, len*0.2);
		circle(+len*0.15, -len*0.1, len*0.2);
		fill(BLACK);
		circle(-len*0.15, -len*0.1, len*0.1);
		circle(+len*0.15, -len*0.1, len*0.1);
		noFill(); stroke(WHITE); strokeWeight(len*0.06);
		arc(0, len*0.1, len*0.2, len*0.1, 10, 170);
		pop();
	}
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function getColorList(colors){
	const list = Array.from(colors);
	for(let i=list.length-1; 0<=i; i--){
		const rdm = floor(random(i));
		const tmp = list[rdm];
		list[rdm] = list[i];
		list[i] = tmp;
	}
	return list;
}