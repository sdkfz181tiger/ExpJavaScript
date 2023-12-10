"use strict";

//==========
// Matter.js

window.onload = ()=>{
	const engine = createEngine();// Engine
	const render = createRender(engine, true);// Render
	const runner = createRunner(engine);// Runner
	const mouse  = createMouse(render);// Mouse

	// Floor
	const padX = 200;
	const obj1 = new MyFloor(engine, WIDTH/2-padX*2, HEIGHT/2, padX, 20, 0);
	const obj2 = new MyFloor(engine, WIDTH/2-padX*1, HEIGHT/2, padX, 20, 0);
	const obj3 = new MyFloor(engine, WIDTH/2-padX*0, HEIGHT/2, padX, 20, 0);
	const objs = [obj1, obj2, obj3];
	let nextX = WIDTH/2;
	let nextY = HEIGHT/2;
	for(let obj of objs) if(nextX < obj.maxX) nextX = obj.maxX;

	for(let i=0; i<2; i++){
		const x = WIDTH/2 + padX * (i+1);
		const angle = Math.PI * (Math.random() * 0.8 - 0.4) * 0.1;
		const obj = new MyFloor(engine, x, nextY, padX, 20, angle);
		objs.push(obj);
		if(nextX < obj.maxX) nextX = obj.maxX;
		nextY += Math.random() * 10 - 5;
	}

	// Car
	const myCar = new MyCar(engine, HEIGHT/2, HEIGHT/2-80, 80, 20, 25);
	window.addEventListener("mousedown", (e)=>{
		const vel = (e.clientX < WIDTH/2) ? -0.3:0.3;
		myCar.accel(vel);
	});
	//window.addEventListener("mouseup", (e)=>{myCar.break();});

	// Bounds
	Events.on(render, "beforeRender", ()=>{
		// Camera
		const shift = {x: myCar.centerX-WIDTH/2, y: myCar.centerY-HEIGHT*0.6};
		Bounds.shift(render.bounds, shift);
		Mouse.setOffset(mouse, render.bounds.min);

		if(nextX < myCar.centerX+WIDTH/2){
			nextX += padX;
			nextY += Math.random() * 10 - 5;
			const rdm = Math.random();
			if(rdm < 0.7){
				const angle = Math.PI * (Math.random() * 0.8 - 0.4) * 0.1;
				const obj = new MyFloor(engine, nextX-padX/2, nextY, padX, 20, angle);
				objs.push(obj);
			}else{
				const fromX = nextX - padX;
				const toX = fromX + padX;
				const obj = new MyBridge(engine, fromX, nextY, toX, nextY);
				objs.push(obj);
			}
		}

		// Objects
		for(let i=objs.length-1; 0<=i; i--){
			const obj = objs[i];
			if(obj.centerX < myCar.centerX-WIDTH){
				obj.removeAll();
				objs.splice(i, 1);
			}
		}
	});
}