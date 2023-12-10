console.log("Hello, JavaScript!!");

// TicTacTor(MinMax)

const MARK_N   = 0;// none
const MARK_O   = 1;// o
const MARK_X   = 2;// x
const SIZE     = 3;
const STRENGTH = 3;
const board = Array.from(new Array(SIZE), () => new Array(SIZE).fill(0));

let turn     = MARK_O;
const player = (Math.random()<0.5)?MARK_O:MARK_X;
const com    = nextTurn(player);
let cvsMng   = null;

window.onload = ()=>{

	// Canvas
	cvsMng = new CvsManager(480, 320, (r, c)=>{
		console.log("onClick:", r, c);
		if(turn != player) return;
		if(board[r][c] != MARK_N) return;
		if(isFinished(board)) return;// Finished
		board[r][c] = player;// Put
		consoleBoard(board);// Console
		cvsMng.drawBoard(board);// Draw
		turn = nextTurn(player);// Next
		showText(board);// Text
		if(!isFinished(board)) think(board);// Com
	});

	think(board);// Com
	consoleBoard(board);// Console
	cvsMng.drawBoard(board);// Draw
	showText(board);// Text
}

function showText(board){
	if(isWon(board, player)){
		cvsMng.drawText("You Won!!");
		return;
	}
	if(isWon(board, com)){
		cvsMng.drawText("You Lose...");
		return;
	}
	if(isFilled(board)){
		cvsMng.drawText("Even");
		return;
	}
	if(com == MARK_O){
		cvsMng.drawText("You: x");
	}else{
		cvsMng.drawText("You: o");
	}
}

function think(board){
	if(turn != com) return;
	if(isFilled(board)) return;

	// MinMax
	let bestScore = Infinity * -1;
	let choise = {r: -1, c: -1};
	for(let r=0; r<SIZE; r++){
		for(let c=0; c<SIZE; c++){
			if(board[r][c] != MARK_N) continue;
			board[r][c] = com;// Put
			const next = nextTurn(com);// Next
			const score = minmax(board, next, 0);
			if(bestScore < score){
				bestScore = score;
				choise.r = r;
				choise.c = c;
			}
			board[r][c] = MARK_N;// Reset
		}
	}
	// Choise
	console.log("Choise:", choise.r, choise.c);
	board[choise.r][choise.c] = com;// Put
	consoleBoard(board);// Console
	cvsMng.drawBoard(board);// Draw
	turn = nextTurn(com);// Next
	showText(board);// Text
}

function minmax(board, turn, depth){
	if(STRENGTH < depth) return 0;// Strength
	const point = 100 - depth;// Point
	// Win / Lose
	if(isWon(board, MARK_O)){
		return (MARK_O==com)?point:-point;
	}
	if(isWon(board, MARK_X)){
		return (MARK_X==com)?point:-point;
	}
	if(isFilled(board)) return 0;// Even

	// COM / Player
	if(turn == com){
		let bestScore = Infinity * -1;
		const next = nextTurn(turn);
		for(let r=0; r<SIZE; r++){
			for(let c=0; c<SIZE; c++){
				if(board[r][c] != MARK_N) continue;
				board[r][c] = turn;// COM
				const score = minmax(board, next, depth+1);
				bestScore = Math.max(bestScore, score);// Max
				board[r][c] = MARK_N;// Reset
			}
		}
		return bestScore;
	}else{
		let bestScore = Infinity;
		const next = nextTurn(turn);
		for(let r=0; r<SIZE; r++){
			for(let c=0; c<SIZE; c++){
				if(board[r][c] != MARK_N) continue;
				board[r][c] = turn;// Player
				const score = minmax(board, next, depth+1);
				bestScore = Math.min(bestScore, score);// Min
				board[r][c] = MARK_N;// Reset
			}
		}
		return bestScore;
	}
}

function isFinished(board){
	if(isWon(board, player)) return true;
	if(isWon(board, com)) return true;
	if(isFilled(board)) return true;
	return false;
}

function isWon(board, turn){

	// Row
	for(let r=0; r<SIZE; r++){
		let flg = true;
		for(let c=0; c<SIZE; c++){
			if(board[r][c] != turn) flg = false;
		}
		if(flg) return true;
	}
	// Col
	for(let c=0; c<SIZE; c++){
		let flg = true;
		for(let r=0; r<SIZE; r++){
			if(board[r][c] != turn) flg = false;
		}
		if(flg) return true;
	}
	// LT -> RB
	let flgLT = true;
	for(let i=0; i<SIZE; i++){
		if(board[i][i] != turn) flgLT = false;
	}
	if(flgLT) return true;
	// RT -> LB
	let flgRT = true;
	for(let i=0; i<SIZE; i++){
		if(board[i][SIZE-1-i] != turn) flgRT = false;
	}
	if(flgRT) return true;

	return false;
}

function nextTurn(turn){
	return (turn==MARK_O) ? MARK_X:MARK_O;
}

function isFilled(board){
	for(let r=0; r<SIZE; r++){
		for(let c=0; c<SIZE; c++){
			if(board[r][c] == MARK_N) return false;
		}
	}
	return true;
}

function consoleBoard(board){
	let line = "";
	for(let r=0; r<SIZE; r++){
		for(let c=0; c<SIZE; c++){
			if(board[r][c] == MARK_N) line += "_";
			if(board[r][c] == MARK_O){
				line += "o";
			}
			if(board[r][c] == MARK_X){
				line += "x";
			}
			if(c < SIZE-1) line += " ";
		}
		line += "\n";
	}
	console.log(line);
}

//==========
// CvsManager

class CvsManager{

	constructor(w, h, onClick){
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		document.body.appendChild(canvas);
		this._ctx = canvas.getContext("2d");
		this._w   = w;
		this._h   = h;
		this._s   = Math.floor((w<h)?w/(SIZE+1):h/(SIZE+1));
		this._sX  = Math.floor(this._w / 2 - this._s * SIZE / 2);
		this._sY  = Math.floor(this._h / 2 - this._s * SIZE / 2);
		this.clearCanvas();
		this.drawGrid();
		canvas.addEventListener("click", (e)=>{
			const r = Math.floor((e.clientY - this._sY) / this._s);
			const c = Math.floor((e.clientX - this._sX) / this._s);
			if(r<0 || SIZE<=r) return;
			if(c<0 || SIZE<=c) return;
			onClick(r, c);
		});
	}

	drawBoard(board){
		this.clearCanvas();
		this.drawGrid();
		for(let r=0; r<SIZE; r++){
			for(let c=0; c<SIZE; c++){
				if(board[r][c] == MARK_O){
					this.drawCircle(r, c);
				}
				if(board[r][c] == MARK_X){
					this.drawCross(r, c);
				}
			}
		}
	}

	clearCanvas(){
		this._ctx.fillStyle = "silver";
		this._ctx.fillRect(0, 0, this._w, this._h);
	}

	drawGrid(){
		this._ctx.fillStyle = "white";
		for(let r=0; r<SIZE; r++){
			for(let c=0; c<SIZE; c++){
				const x = this._sX + this._s * c + 2;
				const y = this._sY + this._s * r + 2;
				this._ctx.fillRect(x, y, this._s-2, this._s-2);
			}
		}
	}

	drawCircle(r, c){
		const x = this._sX + this._s/2 + this._s*c;
		const y = this._sY + this._s/2 + this._s*r;
		const s = this._s / 3;
		this._ctx.strokeStyle = "darkblue";
		this._ctx.lineWidth = 8;
		this._ctx.beginPath();
		this._ctx.arc(x, y, s, 0, Math.PI*2);
		this._ctx.stroke();
	}

	drawCross(r, c){
		const x = this._sX + this._s/2 + this._s*c;
		const y = this._sY + this._s/2 + this._s*r;
		const s = this._s / 3;
		this._ctx.strokeStyle = "darkred";
		this._ctx.lineWidth = 8;
		this._ctx.beginPath();
		this._ctx.moveTo(x, y);
		this._ctx.lineTo(x+s, y-s);
		this._ctx.moveTo(x, y);
		this._ctx.lineTo(x+s, y+s);
		this._ctx.moveTo(x, y);
		this._ctx.lineTo(x-s, y+s);
		this._ctx.moveTo(x, y);
		this._ctx.lineTo(x-s, y-s);
		this._ctx.stroke();
	}

	drawText(msg){
		this._ctx.fillStyle = "black";
		this._ctx.textAlign = "center";
		this._ctx.font = "22px Arial";
		this._ctx.fillText(msg, this._w/2, 28);
	}
}
