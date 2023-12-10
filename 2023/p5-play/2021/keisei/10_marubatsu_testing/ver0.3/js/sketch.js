const FREE = 0;
const MARU = 1;// Player
const BATU = 2;// Com

const G_SIZE = 60;
const N = 3;

let msg = "Tick Tack Toe!!";
let board = Array.from(new Array(N), ()=>new Array(N).fill(0));
let turn = MARU;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(8);
	noSmooth();
	textSize(32);
}

function draw(){
	background(33);
	noStroke();
	fill(255);
	textAlign(CENTER, TOP);
	let notice = "Next:" + ((turn==MARU) ? "O":"X");
	text(notice, width/2, height/2 + N*G_SIZE*0.55);
	showBoard();
}

function mousePressed(){
	let sX = width/2 - N*G_SIZE/2;
	let sY = height/2 - N*G_SIZE/2;
	let r = floor((mouseY - sY) / G_SIZE);
	let c = floor((mouseX - sX) / G_SIZE);
	setMark(r, c);
}

function setMark(r, c){
	if(board[r][c] != FREE) return;
	board[r][c] = turn;
	turn = (turn==MARU) ? BATU:MARU;
	checkBoard();// Check
}

function checkBoard(){
	console.log("checkBoard:" + turn);
	let scores = {
		MARU: Array.from(new Array(N), ()=>new Array(N).fill(0)),
		BATU: Array.from(new Array(N), ()=>new Array(N).fill(0))
	}
	
	search(board, turn, 1);
	// console.log("Maru");
	// console.table(scores.MARU);
	// console.log("Batu");
	// console.table(scores.BATU);
	if(turn == BATU){
		let canditate = getCanditate(scores.MARU);
		if(canditate) setMark(canditate.r, canditate.c);
	}

	function search(arr, mark, depth){
		for(let r=0; r<N; r++){
			for(let c=0; c<N; c++){
				let copy = JSON.parse(JSON.stringify(arr));
				if(copy[r][c] != FREE) continue;
				copy[r][c] = mark;
				if(check(copy, mark)){
					if(mark == MARU) scores.MARU[r][c] += 10 - depth;
					if(mark == BATU) scores.BATU[r][c] += 10 - depth;
				}else{
					search(copy, (mark==MARU) ? BATU:MARU, depth+1);
				}
			}
		}
	}
}

function consoleArr(arr){
	let str = "";
	for(let line of arr) str += line.join(",") + "\r\n";
	console.log(str);
}

function check(arr, mark){
	loopH:
	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			if(arr[r][c] != mark) continue loopH;
		}
		return true;
	}

	loopV:
	for(let c=0; c<N; c++){
		for(let r=0; r<N; r++){
			if(arr[r][c] != mark) continue loopV;
		}
		return true;
	}
	
	let flgA = true;
	for(let a=0; a<N; a++){
		if(arr[a][a] != mark){
			flgA = false;
			break;
		}
	}
	if(flgA) return true;

	let flgB = true;
	for(let b=0; b<N; b++){
		if(arr[b][N-1-b] != mark){
			flgB = false;
			break;
		}
	}
	if(flgB) return true;
	
	return false;
}

function getCanditate(arr){
	let candis = [];
	if(arr.length <= 0) return null;
	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			if(arr[r][c] <= 0) continue;
			candis.push({r:r, c:c, score:arr[r][c]});
		}
	}
	candis.sort((a, b)=>a.score<b.score);
	let index = 0;
	for(let i=0; i<candis.length; i++){
		if(candis[i].score < candis[index].score) break;
		index = i;
	}
	candis.splice(index+1);
	const r = floor(random(candis.length));
	return candis[r];
}

function showBoard(){
	let sX = width/2 - N*G_SIZE/2;
	let sY = height/2 - N*G_SIZE/2;
	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			let x = sX + c * G_SIZE;
			let y = sY + r * G_SIZE;
			fill(100);
			stroke(33);
			strokeWeight(2);
			square(x, y, G_SIZE);
			showMark(x+G_SIZE/2, y+G_SIZE/2, board[r][c]);
		}
	}
}

function showMark(x, y, mark){
	noFill();
	stroke(255);
	strokeWeight(5);
	if(mark == MARU) circle(x, y, G_SIZE*0.6);
	if(mark == BATU){
		const len = G_SIZE*0.25;
		line(x-len, y-len, x+len, y+len);
		line(x+len, y-len, x-len, y+len);
	}
}