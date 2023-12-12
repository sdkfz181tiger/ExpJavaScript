// フルーツの種類
const FRUITS_TYPE = [
		{"radius": 10, "color":"orange"},
		{"radius": 20, "color":"yellow"},
		{"radius": 30, "color":"green"},
		{"radius": 40, "color":"blue"},
		{"radius": 50, "color":"indigo"},
		{"radius": 60, "color":"violet"},
		{"radius": 70, "color":"red"}
	]

const START_LINE_Y = 30;
const WALL_W = 24;

let cvs;// キャンバス

let wallGroup;// 壁グループ
let fruitsGroup;// フルーツグループ

let next = null;// 次のボール

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);
	world.gravity.y = 18;// 重力
	frameRate(60);// フレームレート

	wallGroup = new Group();// 壁グループ
	fruitsGroup = new Group();// フルーツグループ

	// 壁を作る
	createWalls();

	// 最初フルーツ
	next = createNext(width/2, 30);

	// フルーツグループ同士の衝突
	fruitsGroup.collides(fruitsGroup, (a, b)=>{
		if(a.index != b.index) return;
		if(FRUITS_TYPE.length-1 < a.index) return;
		a.life = 1;
		b.life = 1;
		const x = (a.x + b.x) / 2;
		const y = (a.y + b.y) / 2;
		createFruits(x, y, a.index+1);
	});
}

function draw(){
	background("silver");// 背景色

	// 次のフルーツ
	if(next != null){
		const minX = next.radius;
		const maxX = width - next.radius;
		if(minX < mouseX && mouseX < maxX){
			next.x = mouseX;
		}else{
			next.x = width / 2;
		}
		next.y = START_LINE_Y;
		next.vel.x = 0;
		next.vel.y = 0;
	}

	renderStats();// ステータス
}

function createWalls(){

	const wallB = new wallGroup.Sprite(width/2, height);
	wallB.width = width;
	wallB.height = 24;
	wallB.color = "gray";
	wallB.collider = "static"

	const wallL = new wallGroup.Sprite(0, height/2);
	wallL.width = WALL_W;
	wallL.height = height;
	wallL.color = "gray";
	wallL.collider = "static"

	const wallR = new wallGroup.Sprite(width, height/2);
	wallR.width = WALL_W;
	wallR.height = height;
	wallR.color = "gray";
	wallR.collider = "static"
}

function mouseClicked() {
	console.log("mouseClicked:", mouseX, mouseY);

	// 次のフルーツを準備する
	if(next == null) return;
	next = null;

	setTimeout(()=>{
		next = createNext(width/2, 30);// Next
	}, 500);
}

function createNext(x, y){
	const index = floor(random() * 2);
	return createFruits(x, y, index);
}

function createFruits(x, y, index){
	const type = FRUITS_TYPE[index];
	const spr = new fruitsGroup.Sprite(x, y);
	spr.index = index;
	spr.radius = type.radius;
	spr.color = type.color;
	spr.collider = "dynamic";
	return spr;
}