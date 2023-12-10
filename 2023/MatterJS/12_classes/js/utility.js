"use strict";

//==========
// Utility

// Canvas
const WIDTH  = 640;
const HEIGHT = 480;

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

// Plugins
Matter.use("matter-wrap");// Matter-Wrap

function createEngine(){
	return Engine.create();
}

function createRender(engine, flg=true){
	const render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: WIDTH, height: HEIGHT,
			showAngleIndicator: flg,
			showCollisions: flg,
			showDebug: flg,
			showIds: flg,
			showVelocity: flg,
			hasBounds: true,
			wireframes: true// Important!!
		}
	});
	Render.run(render);
	return render;
}

function createRunner(engine){
	const runner = Runner.create();
	Runner.run(runner, engine);
	return runner;
}

function createMouse(render){
	const mouse = Mouse.create(render.canvas);
	render.mouse = mouse;
	return mouse;
}

// Car
class MyCar{

	constructor(engine, x, y, w, h, wSize){
		this._engine = engine;
		this._car = Composite.create({label: "Car"});

		const group = Body.nextGroup(true);
		const wOffX = w * 0.4;// Offset

		// Body
		this._body = Bodies.rectangle(x, y, w, h, {
			collisionFilter: {group: group},
			chamfer: {radius: h*0.5}, density: 0.0002
		});

		// Wheels
		this._wLeft = Bodies.circle(x-wOffX, y, wSize, { 
			collisionFilter: {group: group}, friction: 0.6
		});		
		this._wRight = Bodies.circle(x+wOffX, y, wSize, { 
			collisionFilter: {group: group}, friction: 0.6
		});

		// Joint
		const jLeft = Constraint.create({
			bodyA: this._wLeft, bodyB: this._body,
			pointB: {x: -wOffX, y: 0},
			stiffness: 1, length: 0
		});			
		const jRight = Constraint.create({
			bodyA: this._wRight, bodyB: this._body,
			pointB: {x: wOffX, y: 0},
			stiffness: 1, length: 0
		});

		Composite.addBody(this._car, this._body);
		Composite.addBody(this._car, this._wLeft);
		Composite.addBody(this._car, this._wRight);
		Composite.addConstraint(this._car, jLeft);
		Composite.addConstraint(this._car, jRight);
		Composite.add(this._engine.world, this._car);
	}

	get centerX(){return this._body.position.x;}
	get centerY(){return this._body.position.y;}
	get body(){return this._body;}
	get wLeft(){return this._wLeft;}
	get wRight(){return this._wRight;}

	accel(vel){
		Body.setAngularVelocity(this._wLeft, vel);
	}

	break(){
		Body.setAngularVelocity(this._wLeft, 0);
	}

	removeAll(){
		Composite.remove(this._engine.world, this._car);
	}
}

// Floor
class MyFloor{

	constructor(engine, x, y, w, h, angle){
		this._engine = engine;
		this._floor = Bodies.rectangle(x, y, w, h,
			{isStatic: true, chamfer: 0, angle: angle});
		Composite.add(engine.world, [this._floor]);
	}

	get centerX(){return this._floor.position.x;}
	get centerY(){return this._floor.position.y;}
	get minX(){return this._floor.bounds.min.x;}
	get maxX(){return this._floor.bounds.max.x;}

	removeAll(){
		Composite.remove(this._engine.world, this._floor);
	}
}

// Bridge
class MyBridge{

	constructor(engine, lX, lY, rX, rY, total=5, length=0){
		this._engine = engine;
		this._lX = lX;
		this._lY = lY;
		this._rX = rX;
		this._rY = rY;

		const w = (rX - lX) / total;
		const h = 20;
		const group = Body.nextGroup(true);
		// Compsites (x, y, cols, rows, cols_gap, rows_gap)
		this._stack = Composites.stack(lX, lY-h/2, total, 1, 0, 0, (x, y)=>{
			return Bodies.rectangle(x, y, w, h, 
				{friction: 0.8, collisionFilter: {group: group}, chamfer: {radius: h*0.5}});
		});
		// Chain
		Composites.chain(this._stack, 0.5, 0, -0.5, 0,
			{stiffness: 1.0, length: length, render: {type: "line"}});
		// Composite
		const first = 0;
		const last = this._stack.bodies.length - 1;
		Composite.add(this._stack, Constraint.create({
			bodyA: null,
			bodyB: this._stack.bodies[first],
			pointA: {x: this._stack.bodies[first].position.x-w/2, y: this._stack.bodies[first].position.y},
			pointB: {x: -w/2, y: 0},
			stiffness: 0.8
		}));
		Composite.add(this._stack, Constraint.create({
			bodyA: null,
			bodyB: this._stack.bodies[last],
			pointA: {x: this._stack.bodies[last].position.x+w/2, y: this._stack.bodies[last].position.y},
			pointB: {x: w/2, y: 0},
			stiffness: 0.8
		}));
		Composite.add(engine.world, [this._stack]);
	}

	get centerX(){return (this._lX+this._rX)/2;}
	get centerY(){return (this._lY+this._rY)/2;}

	removeAll(){
		Composite.remove(this._engine.world, this._stack);
	}
}