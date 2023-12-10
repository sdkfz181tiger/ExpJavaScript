// 調整用パラメータ(円の位置との距離です)
const DISTANCE_AUDIO = 10;// この距離(m)まで近づくと、サウンドが再生されます
const DISTANCE_VIDEO = 2; // この距離(m)まで近づくと、ビデオが再生されます

// 3DモデルのIDを設定します(モデルのon/offで利用します)
const ids  = ["#model-r", "#model-g", "#model-b"];
const objs = [];

let text   = null;

const B_X = 0;
const B_Y = 1.6;
const B_Z = -3;
const B_TOTAL = 30;
const B_PAD = 0.2;
const bars = [];

//==========
// A-Frame
// -> https://aframe.io/
// Introduction
// -> https://aframe.io/docs/1.2.0/introduction/#
// Examples(Hello Web VR)
// -> https://aframe.io/examples/showcase/helloworld/

console.log("Hello A-Frame!!");

// Log
AFRAME.registerComponent("log", {
	schema: {type: "string"},
	init: function(){
		//console.log(this.data);
	}
});

// Root
AFRAME.registerComponent("root", {
	init: function(){
		console.log("root!!");
	}
});

// Input Listener
AFRAME.registerComponent("input-listener", {
	init: function(){
		text = document.getElementById("my-text");
		text.setAttribute("value", "Hello World!!");

		// Right(A button)
		this.el.addEventListener("abuttondown", function(e){
			text.setAttribute("value", "Button A is pressed!!");
			this.emit("teleportstart");
		});
		this.el.addEventListener("abuttonup", function(e){
			text.setAttribute("value", "Button A is released!!");
			this.emit("teleportend");
			setTimeout(()=>{checkDistance();}, 200);
		});
		// Right(B button)
		this.el.addEventListener("bbuttondown", function(e){
			text.setAttribute("value", "Button B is pressed!!");
			hideEnvironment();// Hide
		});
		this.el.addEventListener("bbuttonup", function(e){
			text.setAttribute("value", "Button B is released!!");
			showEnvironment("checkerboard");// Show
			// Default position
			const cameraRig = document.getElementById("camera-rig").object3D;
			cameraRig.position.x = 0;
			cameraRig.position.z = 0;
			// Video
			stopVideo();
			// Audio
			stopAudio("audio-r");
			stopAudio("audio-g");
			stopAudio("audio-b");
			// Analyser
			pauseAnalyser("a-red", "ana-red");
			pauseAnalyser("a-green", "ana-green");
			pauseAnalyser("a-blue", "ana-blue");
		});
	}
});

// Video Loader
AFRAME.registerComponent("video-loader", {
	init: function(){
		console.log("video-loader:init");
	}
});

// Onload
window.onload = function(){
	console.log("onload");
	// All Objects
	for(let id of ids){
		objs.push(document.querySelector(id).object3D);
	}
}

// Environment
function showEnvironment(preset){
	document.getElementById("env").setAttribute("environment", "preset: " + preset + ";");
	for(let obj of objs) obj.visible = true;
	// Stage
	let floor = document.getElementById("ana-stg-floor");
	floor.setAttribute("visible", false);
	let ambient = document.getElementById("ana-stg-ambient");
	ambient.setAttribute("visible", false);
	let point = document.getElementById("ana-stg-point");
	point.setAttribute("visible", false);
}

function hideEnvironment(){
	document.getElementById("env").setAttribute("environment", "preset: none;");
	for(let obj of objs) obj.visible = false;
	// Stage
	let floor = document.getElementById("ana-stg-floor");
	floor.setAttribute("visible", true);
	let ambient = document.getElementById("ana-stg-ambient");
	ambient.setAttribute("visible", true);
	let point = document.getElementById("ana-stg-point");
	point.setAttribute("visible", true);
}

function checkDistance(){
	text.setAttribute("value", "checkDistance");

	//==========
	// Checking Audio
	if(isInside("#camera-rig", "#circle-r", DISTANCE_VIDEO, DISTANCE_AUDIO)){
		text.setAttribute("value", "Red");
		startAudio("audio-r");
	}else{
		stopAudio("audio-r");
	}

	if(isInside("#camera-rig", "#circle-g", DISTANCE_VIDEO, DISTANCE_AUDIO)){
		text.setAttribute("value", "Green");
		startAudio("audio-g");
	}else{
		stopAudio("audio-g");
	}

	if(isInside("#camera-rig", "#circle-b", DISTANCE_VIDEO, DISTANCE_AUDIO)){
		text.setAttribute("value", "Blue");
		startAudio("audio-b");
	}else{
		stopAudio("audio-b");
	}

	//==========
	// Checking Video
	if(isInside("#camera-rig", "#circle-r", 0, DISTANCE_VIDEO)){
		text.setAttribute("value", "Red");
		hideEnvironment();
		playVideo("#v-red");
		startAnalyser("a-red", "ana-red");// Analyser
		pauseAnalyser("a-green", "ana-green");
		pauseAnalyser("a-blue", "ana-blue");
		return;
	}

	if(isInside("#camera-rig", "#circle-g", 0, DISTANCE_VIDEO)){
		text.setAttribute("value", "Green");
		hideEnvironment();
		playVideo("#v-green");
		pauseAnalyser("a-red", "ana-red");// Analyser
		startAnalyser("a-green", "ana-green");
		pauseAnalyser("a-blue", "ana-blue");
		return;
	}

	if(isInside("#camera-rig", "#circle-b", 0, DISTANCE_VIDEO)){
		text.setAttribute("value", "Blue");
		hideEnvironment();
		playVideo("#v-blue");
		pauseAnalyser("a-red", "ana-red");// Analyser
		pauseAnalyser("a-green", "ana-green");
		startAnalyser("a-blue", "ana-blue");
		return;
	}

	text.setAttribute("value", "None");
	showEnvironment("checkerboard");
	// Video
	stopVideo();
}

function isInside(idA, idB, min, max){
	const objA  = document.querySelector(idA).object3D;
	const objB  = document.querySelector(idB).object3D;
	const distX = objA.position.x - objB.position.x;
	const distZ = objA.position.z - objB.position.z;
	const dist  = Math.sqrt(distX**2 + distZ**2);
	return min < dist && dist < max;
}

function playVideo(id){
	console.log("playVideo:" + id);
	const el = document.getElementById("v-sphere");
	el.setAttribute("src", id);
	setTimeout(()=>{
		el.setAttribute("visible", true);
		el.components.material.data.src.currentTime = 0;
		el.components.material.data.src.play();
	}, 100);
	
}

function stopVideo(){
	console.log("stopVideo");
	const el = document.getElementById("v-sphere");
	el.setAttribute("visible", false);
	el.components.material.data.src.pause();
}

function startAudio(id){
	let sound = document.getElementById(id).components.sound;
	sound.playSound();
}

function stopAudio(id){
	let sound = document.getElementById(id).components.sound;
	sound.stopSound();
}

function startAnalyser(idSound, idAna){
	let audio = document.getElementById(idSound);
	audio.play();
	let ana = document.getElementById(idAna);
	ana.setAttribute("visible", true);
	hideEnvironment();// Hide
}

function pauseAnalyser(idSound, idAna){
	let audio = document.getElementById(idSound);
	audio.pause();
	let ana = document.getElementById(idAna);
	ana.setAttribute("visible", false);
}