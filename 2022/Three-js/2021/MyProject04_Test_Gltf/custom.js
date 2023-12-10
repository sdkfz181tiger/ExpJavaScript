// Modules
import * as THREE      from "./libs/threejs/build/three.module.js";
import {OrbitControls} from "./libs/threejs/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader}    from "./libs/threejs/examples/jsm/loaders/GLTFLoader.js";

const W_WIDTH  = window.innerWidth; 
const W_HEIGHT = window.innerHeight;
const W_ASPECT = window.innerWidth / window.innerHeight;
const W_RATIO  = window.devicePixelRatio;
let camera, scene, renderer, earth, moon;

let radius = W_WIDTH * 0.4;
let radian = 0;

window.onload = ()=>{
	// Camera
	camera = new THREE.PerspectiveCamera(50, W_ASPECT, 1, 1000);
	camera.position.set(0, 0, 50);
	scene = new THREE.Scene();
	// Light1
	let dirLight = new THREE.DirectionalLight(0xffffff, 1);
	dirLight.position.set(5,3,5);
	scene.add(dirLight);
	// Light2
	let ambLight = new THREE.AmbientLight(0x333333);
	scene.add(ambLight);
	// Renderer
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(W_RATIO);
	renderer.setSize(W_WIDTH, W_HEIGHT);
	// HTML
	let div = document.getElementById("three");
	div.appendChild(renderer.domElement);
	
	// Earth
	let eSize = W_WIDTH * 0.1;
	earth = createMesh(eSize, "./assets/textures/earth_tx.png");
	//scene.add(earth);
	// Moon
	let mSize = W_WIDTH * 0.02;
	moon = createMesh(mSize, "./assets/textures/moon_tx.png");
	//scene.add(moon);

	// Controls
	const controls = new OrbitControls(camera, div);
	// GLTF
	const gltfLoader = new GLTFLoader();
	const url = "./assets/gltf/space/space.gltf";
	gltfLoader.load(url, (gltf)=>{
		console.log(gltf.scene);
		const model = gltf.scene;
		model.scale.x = 0.4;
		model.scale.y = 0.4;
		model.scale.z = 0.4;
		scene.add(model);
	});

	// Animation
	animate();
}

function animate(){
	earth.rotation.y += 0.002;
	moon.rotation.y += 0.002;
	moon.position.x = radius * Math.cos(radian);
	moon.position.z = radius * Math.sin(radian);
	radian += 0.002;
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

function createMesh(r, path){
	let txLoader  = new THREE.TextureLoader();
	let normalMap = txLoader.load(path);
	let geometry = new THREE.SphereBufferGeometry(r, 30, 30);
	let material = new THREE.MeshPhongMaterial({
		color:0xffffff,
		map: normalMap
	});
	let mesh = new THREE.Mesh(geometry, material);
	return mesh;
}