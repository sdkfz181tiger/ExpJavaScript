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

	// Chain
	createChain(WIDTH*0.2, 20, 20, 30, 8);
	createChain(WIDTH*0.8, 20, 20, 30, 8);

	// Floor
	const floorX = WIDTH/2;
	const radius = 100;
	const floor = Bodies.rectangle(floorX, HEIGHT-80, 180, 40, 
			{isStatic: true, chamfer: 10});
	// Move
	let counter = -0.5;
	Events.on(engine, "beforeUpdate", (e)=>{
		counter += 0.002;
		if(counter < 0) return;
		const px = floorX + radius * Math.sin(counter);
		Body.setVelocity(floor, {x: px - floor.position.x, y: 0});// Important
		Body.setPosition(floor, {x: px, y: floor.position.y});
	});

	const total = 6;
	const w = 46;
	const h = 39;
	const stack = Composites.stack(WIDTH/2-w/2, HEIGHT/2-total*h, 1, total, 0, 0, (x, y)=>{
		return Bodies.rectangle(x, y, w, h, {
			slop: 0.5, friction: 1, frictionStatic: Infinity,
			render: {
				strokeStyle: "#ffffff",
				sprite: {texture: "./images/u_reimu.png"}
			}
		});
	});
	Composite.add(engine.world, [floor, stack]);

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

	// Chain
	function createChain(x, y, w, h, total){
		// Group
		const group = Body.nextGroup(true);
		// Compsites (x, y, cols, rows, cols_gap, rows_gap)
		const stack = Composites.stack(x-w/2, y, 1, total, 0, 5, (x, y)=>{
			return Bodies.rectangle(x, y, w, h, {collisionFilter: {group: group}});
		});
		// Chain
		Composites.chain(stack, 0, 0.5, 0, -0.5,
			{stiffness: 0.5, length: 5, render: {type: "line"}});
		// Compsite
		Composite.add(stack, Constraint.create({
			bodyA: null,
			bodyB: stack.bodies[0],
			pointA: {x: stack.bodies[0].position.x, y: stack.bodies[0].position.y-h/2},
			pointB: {x: 0, y: -h/2},
			stiffness: 0.1
		}));
		Composite.add(engine.world, [stack]);
	}
}