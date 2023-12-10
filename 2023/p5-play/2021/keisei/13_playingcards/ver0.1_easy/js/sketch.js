
const DIR = "./assets/";

const PAD_X = 36*2;

let anCard;
let seOK, seNG;
let cards;
let selected = null;
let judgeFlg = false;

function preload(){
	let ssCard = loadSpriteSheet(DIR + "s_card_4.png", 35, 47, 5);
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
	for(let i=1; i<5; i++){
		createCard(width/2, height/2, i);
		createCard(width/2, height/2, i);
	}

	let total = cards.length;
	for(let i=0; i<total-1; i++){
		let rdm = floor(random(i+1, cards.length));
		let tmp = cards[i];
		cards[i] = cards[rdm];
		cards[rdm] = tmp;
	}

	let startX = width/2 - PAD_X*(total-1)/2;
	for(let i=0; i<cards.length; i++){
		cards[i].position.x = startX + i * PAD_X;
		cards[i].position.y = height/2;
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
	if(selected == target) return;

	if(judgeFlg) return;
	judgeFlg = true;

	target.animation.changeFrame(target.num);
	if(selected == null){
		selected = target;
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
