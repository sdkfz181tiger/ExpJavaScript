"use strict"

const ROWS = 6;
const COLS = 6;
const W_MAX = 640;
const ALPHABETS = ["A", "B", "C", "D", "E", "F"];

const images = [];
const myMarkers = [];
let gSize, cX, cY, sX, sY, eX, eY;

function preload(){
	console.log("preload");
	// Images
	for(let cell of BOMB_TYPE){
		images.push(loadImage(cell["src"]));
	}
}

function setup(){
	// Canvas
	const pSize = windowWidth*0.9 < W_MAX ? windowWidth*0.9:W_MAX;
	const canvas = createCanvas(pSize, pSize);
	canvas.parent("my-canvas");

	// Grid, Center
	gSize = width / (COLS+1);
	cX = width / 2;
	cY = height / 2;
	sX = gSize / 2;
	sY = gSize / 2;
	eX = width - gSize / 2;
	eY = height - gSize / 2;

	// MissionNum
	let missionNum = "ミッション番号:";

	// Matrix 9x9
	const matrix9x9 = Array.from(new Array(9), ()=>new Array(9).fill(0));
	const offsets = [[0, 0], [0, 3], [3, 0], [3, 3]];
	for(let offset of offsets){
		const offR = offset[0];
		const offC = offset[1];
		const rdm = floor(matrix3x3s.length * random());
		const matrix3x3 = matrix3x3s[rdm];
		console.log(rdm);
		missionNum += (rdm < 10)?"0"+rdm:rdm;
		for(let r=0; r<3; r++){
			for(let c=0; c<3; c++){
				matrix9x9[r+offR][c+offC] = matrix3x3[r][c];
			}
		}
	}
	$("#mission_num").text(missionNum);

	// MyMarker
	for(let r=0; r<ROWS; r++){
		const y = floor(sX + r * gSize);
		for(let c=0; c<COLS; c++){
			const x = floor(sY + c * gSize);
			const type = matrix9x9[r][c];// Matrix
			const myMarker = new MyMarker(x, y, gSize, type, images[type]);
			myMarkers.push(myMarker);
		}
	}

	// Info
	let cntBlack = 0;
	let cntRed = 0;
	let cntGreen = 0;
	let cntBlue = 0;
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			const type = matrix9x9[r][c];
			if(type == 1) cntBlack++;
			if(type == 2) cntRed++;
			if(type == 3) cntGreen++;
			if(type == 4) cntBlue++;
		}
	}
	$("#info_bomb_black").text(cntBlack);
	$("#info_bomb_red").text(cntRed);
	$("#info_bomb_green").text(cntGreen);
	$("#info_bomb_blue").text(cntBlue);
}

function draw(){
	background("whitesmoke");

	noStroke();
	fill("whitesmoke");
	smooth();
	square(0, 0, width, width*0.02);

	// MyMarker
	for(let myMarker of myMarkers) myMarker.draw();

	// Grid
	stroke("black");
	strokeWeight(1);
	noFill();
	noSmooth();
	for(let r=1; r<ROWS; r++){
		const y = floor(sX + r * gSize);
		line(sX, y, eX, y);
		for(let c=1; c<COLS; c++){
			const x = floor(sY + c * gSize);
			line(x, sY, x, eY);
		}
	}

	// Numbers, Alphabets
	noStroke();
	fill("black");
	textAlign(CENTER, CENTER);
	textSize(gSize * 0.4);
	for(let r=0; r<ROWS; r++){
		const y = gSize * (r + 1);
		text(r+1, gSize / 4, y);
	}
	for(let c=0; c<COLS; c++){
		const x = gSize * (c + 1);
		text(ALPHABETS[c], x, gSize / 4);
	}
}

function mousePressed(){
	console.log("mousePressed");
	if(0 < xdialog.dialogs.length) return;// Important
	if(isMobile()) return;
	// MyMarker, MyBtn
	for(let myMarker of myMarkers){
		if(myMarker.click(mouseX, mouseY)) break;
	}
}

function touchStarted(){
	console.log("touchStarted");
	if(0 < xdialog.dialogs.length) return;// Important
	if(!isMobile()) return;

	// MyMarker, MyBtn
	for(let myMarker of myMarkers){
		if(myMarker.click(mouseX, mouseY)) break;
	}
}

function isMobile(){
	const details = navigator.userAgent;
	const regexp = /android|iphone|kindle|ipad/i;
	const result = regexp.test(details);
	return regexp.test(details);
}

// Controller
$(document).ready(()=>{

	$("#btn-reset").on("touchstart click", (e)=>{
		resetAll();
		return false;
	});

	$("#btn-answer").on("touchstart click", (e)=>{
		showAnswer();
		return false;
	});

	$("#btn-search").on("touchstart click", (e)=>{
		searchMarkers();
		return false;
	});
});

function resetAll(){
	console.log("resetAll");
	for(let myMarker of myMarkers) myMarker.reset();
}

function showAnswer(){
	console.log("showAnswer");

	// Dialog
	const styleOK = "border-radius: 8px; background: blue;";
	const styleCancel = "border-radius: 8px; background: gray;";
	xdialog.open({
		title: "答えを確認する",
		buttons: {
			ok: {text: "確認する", style: styleOK},
			cancel: {text: "キャンセル", style: styleCancel}
		},
		body: "<p>答えを確認しますか!?</p>",
		style: "width: 90%; height: auto;",
		onok: (param)=>{
			console.info("OK!!");
			for(let myMarker of myMarkers) myMarker.showBomb();
		},
		oncancel: (param)=>{
			console.info("Cancel!!");
		}
	});
}

function searchMarkers(){
	console.log("searchMarkers");

	// Count
	let cntBlack = 0;
	let cntRed = 0;
	let cntGreen = 0;
	let cntBlue = 0;
	let activeFlg = false;
	for(let myMarker of myMarkers){
		if(!myMarker.isActive()) continue;
		activeFlg = true;
		const type = myMarker.getType();
		if(type <= 0) continue;
		if(type == 1) cntBlack++;
		if(type == 2) cntRed++;
		if(type == 3) cntGreen++;
		if(type == 4) cntBlue++;
	}
	let body = "<p>探索エリアを選択してください</p>";
	if(activeFlg){
		if(cntBlack <= 0 && cntRed <= 0 && cntGreen <=0 && cntBlue <= 0){
			body = "<p>選択したエリアには爆弾はありません</p>";
		}else{
			body = "<p>選択したエリアに爆弾があります!!<br/>";
			if(0<cntBlack) body += "<img src='./images/bomb_black.png'/>黒色の爆弾が<strong>" + cntBlack + "</strong>個<br/>";
			if(0<cntRed) body += "<img src='./images/bomb_red.png'/>赤色の爆弾が<strong>" + cntRed + "</strong>個<br/>";
			if(0<cntGreen) body += "<img src='./images/bomb_green.png'/>緑色の爆弾が<strong>" + cntGreen + "</strong>個<br/>";
			if(0<cntBlue) body += "<img src='./images/bomb_blue.png'/>青色の爆弾が<strong>" + cntBlue + "</strong>個<br/>";
		}
	}

	// Dialog
	const styleOK = "border-radius: 8px; background: blue;";
	const styleCancel = "border-radius: 8px; background: gray;";
	xdialog.open({
		title: "爆弾リスト",
		buttons: {
			cancel: {text: "閉じる", style: styleCancel}
		},
		body: body,
		style: "width: 90%; height: auto;",
		oncancel: (param)=>{
			console.info("Cancel!!");
			resetAll();// Reset
		}
	});
}