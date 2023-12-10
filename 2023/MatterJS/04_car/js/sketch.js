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
			wireframes: true// Important!!
		}
	});
	Render.run(render);

	// Balls
	const radius = 10;
	const cols = 2;
	const rows = 2;
	const stack = Composites.stack(WIDTH/2-radius*cols, 0, cols, rows, 0, 0, (x, y)=>{
		return Bodies.circle(x, y, radius, 
			{restitution: 0.5, friction: 0.00001, density: 0.001});
	});
	Composite.add(engine.world, stack);

	// Matter-Wrap
	for(let body of stack.bodies){
		body.plugin.wrap = {
			min: {x: render.bounds.min.x, y: render.bounds.min.y},
			max: {x: render.bounds.max.x, y: render.bounds.max.y}
		};
	}

	// MyCar
	createCar(WIDTH/2, HEIGHT/2, 120, 40, 30);

	// Ground
	const ground = Bodies.rectangle(WIDTH/2, HEIGHT*0.8, WIDTH*0.9, 20, 
		{isStatic: true, angle: Math.PI * 0.01});
	Composite.add(engine.world, [ground]);

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

	// Car
	function createCar(x, y, w, h, wSize){

		const group = Body.nextGroup(true);
		const car = Composite.create({label: "Car"});
		const wOffX = w * 0.4;// Offset

		// Body
		const body = Bodies.rectangle(x, y, w, h, {
			collisionFilter: {group: group},
			chamfer: {radius: h*0.5},
			density: 0.0002
		});

		// Wheels
		const wLeft = Bodies.circle(x-wOffX, y, wSize, { 
			collisionFilter: {group: group},
			friction: 0.8
		});		
		const wRight = Bodies.circle(x+wOffX, y, wSize, { 
			collisionFilter: {group: group},
			friction: 0.8
		});

		// Joint
		const jLeft = Constraint.create({
			bodyA: wLeft,
			bodyB: body,
			pointB: {x: -wOffX, y: 0},
			stiffness: 1,
			length: 0
		});			
		const jRight = Constraint.create({
			bodyA: wRight,
			bodyB: body,
			pointB: {x: wOffX, y: 0},
			stiffness: 1,
			length: 0
		});

		// Controll
		window.addEventListener("mousedown", (e)=>{
			const vel = (e.clientX < WIDTH/2) ? -0.4:0.4;
			Body.setAngularVelocity(wLeft, vel);
		});
		window.addEventListener("mouseup", (e)=>{
			Body.setAngularVelocity(wLeft, 0.0);
		});

		// Matter-Wrap
		car.plugin.wrap = {
			min: {x: render.bounds.min.x, y: render.bounds.min.y},
			max: {x: render.bounds.max.x, y: render.bounds.max.y}
		};

		Composite.addBody(car, body);
		Composite.addBody(car, wLeft);
		Composite.addBody(car, wRight);
		Composite.addConstraint(car, jLeft);
		Composite.addConstraint(car, jRight);
		Composite.add(engine.world, car);
	}
}