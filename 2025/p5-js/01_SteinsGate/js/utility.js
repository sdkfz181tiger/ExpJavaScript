// UnitA
function drawUnitA(x, y, size){
	const deg = random(360);
	for(let i=0; i<8; i++){
		drawUnitALine(x, y, size*0.7, deg+8*i);
	}
	circle(x, y, size*0.7);
	circle(x, y, size*0.9);
	circle(x, y, size*1.0);
}

function drawUnitALine(x, y, size, deg){
	const rad = deg * DEG_TO_RAD;
	const aX = x + cos(rad) * size / 2;
	const aY = y + sin(rad) * size / 2;
	const bX = x + cos(rad+PI) * size / 2;
	const bY = y + sin(rad+PI) * size / 2;
	line(aX, aY, bX, bY);
}

// UnitB
function drawUnitB(x, y, size){
	circle(x, y, size);
	drawUnitBLine(x, y, size * 2, -90);
	drawUnitBLine(x, y, size * 1.5, 0);
	drawUnitBLine(x, y, size * 1.2, 135);
}

function drawUnitBLine(x, y, size, deg){
	const rad = deg * DEG_TO_RAD;
	const aX = x + cos(rad) * size;
	const aY = y + sin(rad) * size;
	circle(aX, aY, size / 20);
	line(x, y, aX, aY);
}

// UnitC
function drawUnitC(x, y, size){

	circle(x, y, size);
	arc(x, y, size*2, size*2, 0, PI/2);

	const aX = x + cos(0) * size * 1.2;
	const aY = y + sin(0) * size * 1.2;
	line(x, y, aX, aY);
	const bX = x + cos(PI/2) * size * 1.2;
	const bY = y + sin(PI/2) * size * 1.2;
	line(x, y, bX, bY);

	const rad = random(PI);
	const cX = x + cos(rad) * size;
	const cY = y + sin(rad) * size;
	line(x, y, cX, cY);
	circle(cX, cY, size * 0.1);
}