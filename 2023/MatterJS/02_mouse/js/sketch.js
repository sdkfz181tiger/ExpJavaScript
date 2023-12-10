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

	// Box, Ball, Ground
	const box = Bodies.rectangle(WIDTH/2-80, 0, 80, 80,
		{restitution: 0.8, friction: 0.1, angle: Common.random(0, 360)});
	const ball = Bodies.circle(WIDTH/2+80, 0, 40, 
		{restitution: 0.8, friction: 0.1, angle: Common.random(0, 360)});
	const ground = Bodies.rectangle(WIDTH/2, HEIGHT, WIDTH, 50, {isStatic: true});

	// Add all of the bodies to the world
	Composite.add(engine.world, [box, ball, ground]);

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
}