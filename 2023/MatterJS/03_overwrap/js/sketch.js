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
	const cols = 5;
	const rows = 2;
	const stack = Composites.stack(WIDTH/2-radius*cols, 0, cols, rows, 0, 0, (x, y)=>{
		return Bodies.circle(x, y, radius, 
			{restitution: 0.5, friction: 0.00001, density: 0.001});
	});
	Composite.add(engine.world, stack);

	// Matter-Wrap
	for(let i=0; i<stack.bodies.length; i++){
		stack.bodies[i].plugin.wrap = {
			min: { x: render.bounds.min.x, y: render.bounds.min.y },
			max: { x: render.bounds.max.x, y: render.bounds.max.y }
		};
	}

	// Ground
	const ground = Bodies.rectangle(WIDTH/2, HEIGHT*0.8, WIDTH*0.8, 20, 
		{isStatic: true, angle: Math.PI * 0.03});
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
}