"use strict"

console.log("utility.js");

function drawGCV(x, y, len, cnt){
	if(len < 5) return;
	const colors = getColorList(COLORS);

	push();
	translate(x, y);
	rotate(cnt*90);
	circle(0, 0, 5);
	//fill(colors[0]);
	square(0, 0, len);
	//fill(colors[1]);
	beginShape();
	dotArc(0, len, len, 270, 90, true);
	vertex(0, len);
	endShape(CLOSE);
	pop();

	const num  = sqrt(len**2 + (len/2)**2);
	const nRad = len/2 - len + num;
	const nRot = cnt*90 + 45;
	const nX = x + sqrt(len**2 + len**2) * cos(nRot);
	const nY = y + sqrt(len**2 + len**2) * sin(nRot);
	drawGCV(nX, nY, nRad, cnt+1);
}

function drawGCH(x, y, len, cnt){
	if(len < 5) return;
	const colors = getColorList(COLORS);

	push();
	translate(x, y);
	rotate(cnt*-90);
	circle(0, 0, 5);
	//fill(colors[0]);
	square(0, 0, len);
	//fill(colors[1]);
	beginShape();
	dotArc(len, 0, len, 180, 90, false);
	vertex(len, 0);
	endShape(CLOSE);
	pop();

	const num  = sqrt(len**2 + (len/2)**2);
	const nRad = len/2 - len + num;
	const nRot = cnt*-90 + 45;
	const nX = x + sqrt(len**2 + len**2) * cos(nRot);
	const nY = y + sqrt(len**2 + len**2) * sin(nRot);
	drawGCH(nX, nY, nRad, cnt+1);
}

function dotArc(x, y, rad, from, progress, clockwise=true){
	for(let i=0; i<=progress; i+=3){
		const d = clockwise ? from+i:from-i;
		vertex(x+rad*cos(d), y+rad*sin(d));
	}
}