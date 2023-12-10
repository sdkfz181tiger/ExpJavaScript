console.log("Hello utility.js!!");

let iReimus, iMarisas, iBkg;
let vReimu, vMarisa, vStart, vOver;

let gameFlg = false;
let player = null
let enemyGroup = null;

function preload(){

	iReimus = [];
	for(let i=0; i<14; i++){
		const path = "./assets/reimu_";
		const file = String(i+1).padStart(2, "0") + ".png";
		console.log(path + file);
		const img = loadImage(path + file);
		iReimus.push(img);
	}

	iMarisas = [];
	for(let i=0; i<14; i++){
		const path = "./assets/marisa_";
		const file = String(i+1).padStart(2, "0") + ".png";
		console.log(path + file);
		const img = loadImage(path + file);
		iMarisas.push(img);
	}

	iBkg    = loadImage("./assets/bkg.png");
	vReimu  = loadSound("./assets/v_reimu.mp3");
	vMarisa = loadSound("./assets/v_marisa.mp3");
	vStart  = loadSound("./assets/v_start.mp3");
	vOver   = loadSound("./assets/v_over.mp3");
}

function outside(spr){
	if(spr.position.x < 0) spr.position.x = width;
	if(width < spr.position.x) spr.position.x = 0;
	if(spr.position.y < 0) spr.position.y = height;
	if(height < spr.position.y) spr.position.y = 0;
}

function createBkg(){
	const bkg = createSprite(width/2, height/2);
	bkg.addImage(iBkg);
	bkg.scale = width / bkg.width;
}

function createReimu(x, y){
	const rdm = floor(random() * iReimus.length);
	player = createSprite(x, y);
	player.addImage(iReimus[rdm]);
	player.scale = 1;
	player.debug = true;
}

function drawScore(){
	if(!enemyGroup) return;
	fill(255);
	textAlign(CENTER, TOP);
	textSize(40);
	text(enemyGroup.length, width/2, 20);
}
