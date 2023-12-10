
const FILE_URL  = "./assets/sample_01.png";
const MODEL_URL = "./weights";

let img, canvas, context;

window.onload = (e)=>{
	console.log("onload!");
	loadModels();
}

async function loadModels(){
	console.log("loadModels");
	Promise.all([
		faceapi.loadSsdMobilenetv1Model(MODEL_URL),
		faceapi.loadFaceLandmarkModel(MODEL_URL),
		faceapi.loadFaceRecognitionModel(MODEL_URL)
	]).then(detectAllFaces);
}

async function detectAllFaces(){
	console.log("detectAllFaces");

	// Image
	img = await faceapi.fetchImage(FILE_URL);

	// Canvas, Context
	canvas = document.getElementById("myCanvas");
	canvas.width = img.width;
	canvas.height = img.height;
	context = canvas.getContext("2d");
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, 0, 0);

	const iSize = {width: img.width, height: img.height};
	const fData = await faceapi.detectAllFaces(img).withFaceLandmarks();
	const rData = await faceapi.resizeResults(fData, iSize);
	rData.forEach(data=>{drawResult(data);});
}

function drawResult(data){
	console.log("drawResult!!");

	const det = data.detection;
	const mrks = data.landmarks.positions;
	const box = det.box;

	context.fillStyle = "red";
	context.strokeStyle = "red";
	context.lineWidth = 4;
	context.strokeRect(box.x, box.y, box.width, box.height);

	drawLandmarks(mrks);
	drawNose(mrks);
	drawGrasses(mrks);
}

function drawLandmarks(mrks){
	for(let i=0; i<mrks.length; i++){
		let x = mrks[i].x;
		let y = mrks[i].y;
		context.fillRect(x, y, 2, 2);
		context.fillText(i, x, y, 18);
	}
}

function drawNose(mrks){
	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.beginPath();
	for(let i=27; i<35; i++){
		let fX = mrks[i].x;
		let fY = mrks[i].y;
		let tX = mrks[i+1].x;
		let tY = mrks[i+1].y;
		context.moveTo(fX, fY);
		context.lineTo(tX, tY);
	}
	context.stroke();
}

function drawGrasses(mrks){
	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.beginPath();
	context.moveTo(mrks[39].x, mrks[39].y);
	context.lineTo(mrks[42].x, mrks[42].y);
	context.stroke();
	// 左
	const lX = (mrks[39].x + mrks[36].x)/2;
	const lY = (mrks[41].y + mrks[38].y)/2;
	const lR = (mrks[39].x - mrks[36].x);
	context.beginPath();
	context.arc(lX, lY, lR, 0, Math.PI*2);
	context.stroke();
	// 右
	const rX = (mrks[45].x + mrks[42].x)/2;
	const rY = (mrks[46].y + mrks[43].y)/2;
	const rR = (mrks[45].x - mrks[42].x);
	context.beginPath();
	context.arc(rX, rY, rR, 0, Math.PI*2);
	context.stroke();
}