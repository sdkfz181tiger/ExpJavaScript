
const DIR = "./assets/";

const COLS  = 13;
const ROWS  = 52 / COLS;
const PAD_X = 36*2;
const PAD_Y = 48*2;

let anCard;
let seOK, seNG;
let cards;
let selected = null;
let judgeFlg = false;

function preload(){
	let ssCard = loadSpriteSheet(DIR + "s_card.png", 35, 47, 56);
	anCard = loadAnimation(ssCard);
	seOK = loadSound(DIR + "se_ok.mp3");
	seNG = loadSound(DIR + "se_ng.mp3");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	frameRate(32);
	angleMode(DEGREES);

	cards = new Group();
	for(let i=0; i<56; i++){
		if(i%14==0) continue;
		createCard(width/2, height/2, i);
	}
	for(let i=0; i<cards.length-1; i++){
		let rdm = floor(random(i+1, cards.length));
		let tmp = cards[i];
		cards[i] = cards[rdm];
		cards[rdm] = tmp;
	}

	let startX = width/2 - PAD_X*(COLS-1)/2;
	let startY = height/2 - PAD_Y*(ROWS-1)/2;
	for(let i=0; i<cards.length; i++){
		if(cards[i].num%14 == 0) continue;
		let x = startX + (i%COLS) * PAD_X;
		let y = startY + floor(i/COLS) * PAD_Y;
		cards[i].position.x = x;
		cards[i].position.y = y;
	}
}

function createCard(x, y, n){
	let card = createSprite(x, y);
	card.addAnimation("card", anCard);
	card.animation.changeFrame(0);
	card.animation.stop();
	card.scale = 2;
	card.num = n;
	card.onMousePressed = (target)=>{
		judgeCards(target);
	}
	cards.add(card);
}

function draw(){
	background(33);
	drawSprites();// Sprites
}

function judgeCards(target){
	//console.log("judgeCards:", target);
	if(selected == target) return;

	if(judgeFlg) return;
	judgeFlg = true;

	target.animation.changeFrame(target.num);
	if(selected == null){
		selected = target;
		judgeFlg = false;
		return;
	}
	if(selected == target){
		selected = null;
		judgeFlg = false;
		return;
	}

	if(selected.num%14 != target.num%14){
		seNG.play();// Sound
		setTimeout(()=>{closeCards(target);}, 800);
		return;
	}

	seOK.play();// Sound
	setTimeout(()=>{removeCards(target);}, 800);
}

function closeCards(target){
	judgeFlg = false;
	target.animation.changeFrame(0);
	selected.animation.changeFrame(0);
	selected = null;
}

function removeCards(target){
	judgeFlg = false;
	target.remove();
	selected.remove();
	selected = null;
}

function calcDistance(){
	let dX = marker.position.x - tongue.position.x;
	let dY = marker.position.y - tongue.position.y;
	return sqrt(dX*dX + dY*dY);
}
