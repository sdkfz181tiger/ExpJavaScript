"use strict";

const D_WIDTH  = 480;
const D_HEIGHT = 320;
const FONT = {fontFamily: "MisakiGothic"};

let sndDamage, sndHit, sndShot;
let scoreNum, scoreTxt;
let player;

const config = {
	type: Phaser.AUTO,
	width: D_WIDTH, 
	height: D_HEIGHT,
	pixelArt: true,// Important!!
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
			gravity: {x: 0, y: 600}
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
}

const phaser = new Phaser.Game(config);

function preload(){
	console.log("preload!!");

	// Load image
	this.load.image("sky",          "assets/bkg_sky.png");
	this.load.image("mountain",     "assets/bkg_mountain.png");
	this.load.image("ground_16x12", "assets/ground_16x12.png");
	this.load.image("ground_32x12", "assets/ground_32x12.png");
	this.load.image("ground_48x12", "assets/ground_48x12.png");
	this.load.image("food_01",      "assets/food_01.png");
	this.load.image("food_02",      "assets/food_02.png");
	this.load.image("food_03",      "assets/food_03.png");

	// Load spriteSheet
	this.load.spritesheet("ninja", "assets/ninja_n_01.png",
		{frameWidth: 16, frameHeight: 16});

	// Load audio
	this.load.audio("damage", ["sounds/damage.mp3"]);
	this.load.audio("hit",    ["sounds/hit.mp3"]);
	this.load.audio("shot",   ["sounds/shot.mp3"]);
}

function create(){
	console.log("create!!");

	// Background
	createBackground(this, 2, "sky", 0.1);
	createBackground(this, 3, "mountain", 0.5);

	// Sound
	sndDamage = this.sound.add("damage");
	sndHit = this.sound.add("hit");
	sndShot = this.sound.add("shot");

	// Text
	scoreNum = 0;
	scoreTxt = this.add.text(D_WIDTH/2, 32, "*", FONT).setFontSize(32).setOrigin(0.5);
	scoreTxt.setScrollFactor(0);// Fix
	scoreTxt.setText("SCORE:" + scoreNum);

	// Ground
	const staticGroup = this.physics.add.staticGroup();
	staticGroup.create(240-160, 320-100, "ground_32x12");
	staticGroup.create(240,     320-60,  "ground_48x12");
	staticGroup.create(240+180, 320-200, "ground_48x12");
	staticGroup.children.iterate((child)=>{
		child.setScale(2).refreshBody();
	});

	// Player
	player = this.physics.add.sprite(D_WIDTH/2, D_HEIGHT/2, "ninja");
	player.setBounce(0.1);
	player.setScale(3);
	player.body.setSize(player.width*0.5, player.height*1.0);
	player.refreshBody();
	//player.setCollideWorldBounds(true);

	// Animation
	this.anims.create({
		key: "front", frameRate: 10, repeat: 1,
		frames: this.anims.generateFrameNumbers("ninja", {start: 0, end: 4}),
	});
	this.anims.create({
		key: "right", frameRate: 10, repeat: -1,
		frames: this.anims.generateFrameNumbers("ninja", {start: 11, end: 14}),
	});
	this.anims.create({
		key: "left", frameRate: 10, repeat: -1,
		frames: this.anims.generateFrameNumbers("ninja", {start: 15, end: 19}),
	});
	player.anims.play("front", true);// Default

	// Foods
	const foods01 = this.physics.add.group({
		key: "food_01", repeat: 5,
		setXY: {x: 0, y: 0, stepX: 96}});
	foods01.children.iterate((child)=>{
		child.setScale(2).refreshBody();
	});

	const foods02 = this.physics.add.group({
		key: "food_02", repeat: 5,
		setXY: {x: 32, y: 0, stepX: 96}});
	foods02.children.iterate((child)=>{
		child.setScale(2).refreshBody();
	});

	const foods03 = this.physics.add.group({
		key: "food_03", repeat: 5,
		setXY: {x: 64, y: 0, stepX: 96}});
	foods03.children.iterate((child)=>{
		child.setScale(2).refreshBody();
	});

	// Bounce: Player x StaticGroup
	this.physics.add.collider(player, staticGroup);

	// Bounce: Foods x StaticGroup
	this.physics.add.collider(foods01, staticGroup);
	this.physics.add.collider(foods02, staticGroup);
	this.physics.add.collider(foods03, staticGroup);

	// Overwrap: Player x Balls
	this.physics.add.overlap(player, foods01, overlap, null, this);
	this.physics.add.overlap(player, foods02, overlap, null, this);
	this.physics.add.overlap(player, foods03, overlap, null, this);

	// Bounds, Follow
	this.cameras.main.setBounds(0, 0, D_WIDTH*2, D_HEIGHT);
	this.cameras.main.startFollow(player);
}

function update(){

	// Cursors
	const cursors = this.input.keyboard.createCursorKeys();

	if(cursors.up.isDown){
		player.setVelocityY(-200);
	}else if(cursors.left.isDown){
		player.setVelocityX(-100);
		player.anims.play("left", true);
	}else if(cursors.right.isDown){
		player.setVelocityX(+100);
		player.anims.play("right", true);
	}else{
		player.setVelocityX(0);
		player.anims.play("front");
	}
}

function overlap(player, tgt){
	tgt.destroy();// Destroy
	sndShot.play();// Sound
	scoreNum += 100;// Score
	scoreTxt.setText("SCORE:" + scoreNum);
}

function createBackground(scene, cnt, texture, factor){
	let offX = 0;
	for(let i=0; i<cnt; i++){
		const img = scene.add.image(offX, scene.scale.height, texture)
					.setOrigin(0, 1).setScrollFactor(factor);
		offX += img.width;
	}
}
