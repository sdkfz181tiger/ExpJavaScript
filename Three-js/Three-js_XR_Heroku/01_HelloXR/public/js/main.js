//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const ACT_STATES = ["Idle", "Walking", "Running", "Dance", "Death", "Sitting", "Standing"];
const ACT_EMOTES = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];

// Data
const models = {data:[
	{dir:"./models/gltf/RobotExpressive/", glb:"RobotExpressive.glb"}
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"test_1.mp3"},
	{dir:"./sounds/", mp3:"test_2.mp3"},
	{dir:"./sounds/", mp3:"test_3.mp3"},
	{dir:"./sounds/", mp3:"test_4.mp3"},
]};

const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"},
]};

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	let tm = null;

	// XRUtils
	THREE.WebXRUtils.getDisplays().then((displays)=>{
		// ThreeManager
		tm = new ThreeManager(displays);
		tm.loadModels(models, onReadyModels, onError);
		// tm.loadSounds(sounds, onReadySounds, onError);
		// tm.loadFonts(fonts,   onReadyFonts,  onError);

		// Raycaster
		tm.setRaycasterListener((intersects)=>{
			for(let target of intersects){
				console.log("distance:" + target.distance + "_" + target.object.name);
				// Reticle
				if(target.object.name == NAME_RETICLE){
					// Cube
					let geometry = new THREE.BoxGeometry(0.03, 0.03, 0.03);
					let material = new THREE.MeshNormalMaterial();
					let cube = new THREE.Mesh(geometry, material);
					cube.geometry.applyMatrix(
						new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-90)));
					cube.visible = true;
					cube.name = NAME_CUBE;
					tm.putOnTheReticle(cube);
				}
			}
		});

		function onReadyModels(){
			console.log("onReadyModels");
		}

		// Error
		function onError(error){
			console.log("Something went wrong...");
			console.log(error);
		}
	});
}