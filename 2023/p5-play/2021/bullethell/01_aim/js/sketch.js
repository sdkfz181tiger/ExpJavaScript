/*
// 偏差射撃を行うサンプルプログラム
// 動作環境: p5.js
*/

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

let player;
let bullets = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	textAlign(CENTER);
	textSize(8);
	fill(255);

	player = new Sprite(random(width), random(height));
	player.vX = random(-5, 5);
	player.vY = random(-5, 5);

	setInterval(()=>{
		if(!isLooping()) return;

		const x = width / 2;
		const y = height / 2;
		const info = checkShot(x, y, 8, player);
		if(info == null) return;

		const blt = new Sprite(x, y);
		blt.vX = info.vX;
		blt.vY = info.vY;
		blt.time = info.time;
		bullets.push(blt);
	}, 100);
}

function draw() {
	background(33);

	player.update();
	if(player.x < 0) player.x = width;
	if(player.y < 0) player.y = height;
	if(width < player.x) player.x = 0;
	if(height < player.y) player.y = 0;

	for(let i=bullets.length-1; 0<=i; i--){
		const bullet = bullets[i];
		bullet.update();
		if(bullet.x < 0 || bullet.y < 0 || 
			width < bullet.x || height < bullet.y){
			bullets.splice(i, 1);
		}
	}
}

function mousePressed(){
	(isLooping())?noLoop():loop();
}

function checkShot(x, y, spd, tgt){

	const q = (x-tgt.x)/(y-tgt.y);
	const r = (tgt.vX-tgt.vY*q)/spd;
	const a = q**2+1;
	const b = 2*r*q;
	const c = r**2-1;
	const d = b**2-4*a*c;
	if(a == 0 || d < 0) return null;
	let time = -1;
	const sinA = (-b+sqrt(d))/(2*a);
	const cosA = sqrt(1-sinA**2);
	time = getTime(x, y, spd, tgt, sinA, cosA);
	if(0 < time) return {vX:spd*cosA, vY:spd*sinA, time: time};
	time = getTime(x, y, spd, tgt, sinA, cosA*-1);
	if(0 < time) return {vX:spd*cosA*-1, vY:spd*sinA, time: time};
	const sinB = (-b-sqrt(d))/(2*a);
	const cosB = sqrt(1-sinB**2);
	time = getTime(x, y, spd, tgt, sinB, cosB);
	if(0 < time) return {vX:spd*cosB, vY:spd*sinB, time: time};
	time = getTime(x, y, spd, tgt, sinB, cosB*-1);
	if(0 < time) return {vX:spd*cosB*-1, vY:spd*sinB, time: time};
	return null;
}

function getTime(x, y, spd, tgt, sin, cos){
	const dP = sqrt((x-tgt.x)**2+(y-tgt.y)**2);
	const dV = sqrt((spd*cos-tgt.vX)**2+(spd*sin-tgt.vY)**2);
	const time = dP / dV;
	const bX = floor(x+spd*cos*time);
	const bY = floor(y+spd*sin*time);
	const tX = floor(tgt.x+tgt.vX*time);
	const tY = floor(tgt.y+tgt.vY*time);
	if(bX != tX) return -1;
	if(bY != tY) return -1;
	return time;
}

class Sprite{

	constructor(x, y){
		this._x = x;
		this._y = y;
		this._vX = 0;
		this._vY = 0;
		this._time = -1;
	}

	set x(n){this._x = n;}
	set y(n){this._y = n;}
	get x(){return this._x;}
	get y(){return this._y;}

	set vX(n){this._vX = n;}
	set vY(n){this._vY = n;}
	get vX(){return this._vX;}
	get vY(){return this._vY;}

	set time(n){this._time = n;}
	get time(){return this._time;}

	update(){
		this._x += this._vX;
		this._y += this._vY;
		fill(255);
		circle(this._x, this._y, 5);
		if(--this._time < 0) return;
		text(floor(this._time), this._x, this._y);
	}
}