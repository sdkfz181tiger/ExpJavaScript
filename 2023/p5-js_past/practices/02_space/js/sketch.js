
const DIR = "./assets/";

let imgCat, imgFood;
let cat, food;

function preload(){
	imgCat = loadImage(DIR + "i_cat_space.png");
	imgFood = loadImage(DIR + "i_cat_food.png");
}

function setup(){
	createCanvas(320, 320);
	frameRate(8);
	angleMode(DEGREES);
	noSmooth();
	background(33);
	// Cat
	cat = createSprite(width/2, height/2);
	cat.addImage(imgCat);
	cat.scale = 1.5;

	food = createSprite(random(width), random(height));
	food.addImage(imgFood);
	food.scale = 1.5;
}

function draw(){
	background(33);

	cat.position.x += random(-2, 2);
	cat.position.y += random(-2, 2);
	cat.rotation += random(-1, 1);

	food.position.x += random(-2, 2);
	food.position.y += random(-2, 2);
	food.rotation += random(-1, 1);

	drawStars();
	drawSprites();
}

function drawStars(cX, cY){
	noStroke();
	fill(255);
	for(let i=0; i<30; i++){
		let x = random(width);
		let y = random(height);
		let size = random(2, 4);
		square(x, y, size);
	}
}