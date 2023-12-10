"use strict";

//==========
// Matter.js

// Canvas
const WIDTH  = 480;
const HEIGHT = 320;

// Modules
const Engine     = Matter.Engine;
const Render     = Matter.Render;
const Runner     = Matter.Runner;
const Body       = Matter.Body;
const Bodies     = Matter.Bodies;
const Bounds     = Matter.Bounds;
const Common     = Matter.Common;
const Composite  = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const Events     = Matter.Events;
const Mouse      = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

window.onload = ()=>{
	
	// Plugins
	Matter.use("matter-wrap");// Matter-Wrap

	// Engine
	const engine = Engine.create();

	// Renderer
	const render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: WIDTH, height: HEIGHT,
			showAngleIndicator: true,
			showCollisions: true,
			showDebug: false,
			showIds: true,
			showVelocity: true,
			hasBounds: true,
			wireframes: false// Important!!
		}
	});
	Render.run(render);

	// Floor
	const floorW = 280;
	const floorL = Bodies.rectangle(0, HEIGHT/2, floorW, 20,
			{isStatic: true, chamfer: 0, angle: Math.PI*0.0});
	const floorR = Bodies.rectangle(WIDTH, HEIGHT/2, floorW, 20,
			{isStatic: true, chamfer: 0, angle: Math.PI*0.0});
	Composite.add(engine.world, [floorL, floorR]);

	// Bridge
	const bridgeW = WIDTH-floorW;
	createBridge(floorW/2, HEIGHT/2, WIDTH-floorW/2, HEIGHT/2, 5);

	// Car
	createCar(0, HEIGHT/2-80, 80, 20, 20);

	// Mouse
	const mouse = Mouse.create(render.canvas);
	render.mouse = mouse;

	// MouseConstraint
	const mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {visible: false}
		}
	});
	Composite.add(engine.world, mouseConstraint);

	// Runner
	const runner = Runner.create();
	Runner.run(runner, engine);

	// Bridge
	function createBridge(lX, lY, rX, rY, total){
		const w = (rX - lX) / total;
		const h = 20;
		// Group
		const group = Body.nextGroup(true);
		// Compsites (x, y, cols, rows, cols_gap, rows_gap)
		const stack = Composites.stack(lX, lY-h/2, total, 1, 0, 0, (x, y)=>{
			return Bodies.rectangle(x, y, w, h, 
				{friction: 1.0, collisionFilter: {group: group}, chamfer: {radius: h*0.5}});
		});
		// Chain
		Composites.chain(stack, 0.5, 0, -0.5, 0,
			{stiffness: 1.0, length: 1, render: {type: "line"}});
		// Composite
		const first = 0;
		const last = stack.bodies.length - 1;
		Composite.add(stack, Constraint.create({
			bodyA: null,
			bodyB: stack.bodies[first],
			pointA: {x: stack.bodies[first].position.x-w/2, y: stack.bodies[first].position.y},
			pointB: {x: -w/2, y: 0},
			stiffness: 0.8
		}));
		Composite.add(stack, Constraint.create({
			bodyA: null,
			bodyB: stack.bodies[last],
			pointA: {x: stack.bodies[last].position.x+w/2, y: stack.bodies[last].position.y},
			pointB: {x: w/2, y: 0},
			stiffness: 0.8
		}));
		Composite.add(engine.world, [stack]);
	}

	// Car
	function createCar(x, y, w, h, wSize){

		const group = Body.nextGroup(true);
		const car = Composite.create({label: "Car"});
		const wOffX = w * 0.4;// Offset

		// Body
		const body = Bodies.rectangle(x, y, w, h, {
			collisionFilter: {group: group},
			chamfer: {radius: h*0.5},
			density: 0.0002,
			render: {
				strokeStyle: "#ffffff",
				sprite: {texture: "./images/u_marisa.png"}
			}
		});

		// Wheels
		const wLeft = Bodies.circle(x-wOffX, y, wSize, { 
			collisionFilter: {group: group},
			friction: 1.0,
			render: {
				strokeStyle: "#ffffff",
				sprite: {texture: "./images/u_reimu.png"}
			}
		});		
		const wRight = Bodies.circle(x+wOffX, y, wSize, { 
			collisionFilter: {group: group},
			friction: 1.0,
			render: {
				strokeStyle: "#ffffff",
				sprite: {texture: "./images/u_reimu.png"}
			}
		});

		// Joint
		const jLeft = Constraint.create({
			bodyB: body,
			pointB: {x: -wOffX, y: 0},
			bodyA: wLeft,
			stiffness: 1,
			length: 0
		});			
		const jRight = Constraint.create({
			bodyB: body,
			pointB: {x: wOffX, y: 0},
			bodyA: wRight,
			stiffness: 1,
			length: 0
		});

		// Controll
		window.addEventListener("mousedown", (e)=>{
			const vel = (e.clientX < WIDTH/2) ? -0.6:0.6;
			Body.setAngularVelocity(wLeft, vel);
		});
		window.addEventListener("mouseup", (e)=>{
			Body.setAngularVelocity(wLeft, 0.0);
		});

		// Bounds
		Events.on(render, "beforeRender", ()=>{
			const shift = {x: body.position.x-WIDTH/2, y: body.position.y-HEIGHT/2};
			Bounds.shift(render.bounds, shift);
			Mouse.setOffset(mouse, render.bounds.min);
		});

		Composite.addBody(car, body);
		Composite.addBody(car, wLeft);
		Composite.addBody(car, wRight);
		Composite.addConstraint(car, jLeft);
		Composite.addConstraint(car, jRight);
		Composite.add(engine.world, car);
	}
}