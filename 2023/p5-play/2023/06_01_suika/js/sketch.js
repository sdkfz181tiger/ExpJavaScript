
const START_LINE_Y = 30;
const WALL_W = 24;

let cvs;// キャンバス

let wallGroup;// 壁グループ
let ballGroup;// ボールグループ

let next = null;// 次のボール

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);
	world.gravity.y = 18;// 重力
	frameRate(60);// フレームレート

	ballGroup = new Group();// ボールグループ
	wallGroup = new Group();// 壁グループ

	createWalls();
	next = createBall(width/2, 30);
}

function draw(){
	background("silver");// 背景色

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

function mouseClicked() {
	console.log("mouseClicked:", mouseX, mouseY);

	if(next == null) return;
	next = null;

	setTimeout(()=>{
		next = createBall(width/2, 30);// Next
	}, 500);
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

function createBall(x, y){
	const ball = new ballGroup.Sprite(x, y);
	ball.radius = random(8, 24);
	ball.color = "white";
	ball.collider = "dynamic";
	return ball;
}