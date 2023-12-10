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

	// Chain
	createChain(WIDTH*0.25, 20, 20, 30, 4);
	createChain(WIDTH*0.5, 20, 20, 30, 6);
	createChain(WIDTH*0.75, 20, 20, 30, 8);

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