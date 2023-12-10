const W_WIDTH  = window.innerWidth; // ブラウザの横サイズ
const W_HEIGHT = window.innerHeight;// ブラウザの縦サイズ
const W_ASPECT = window.innerWidth / window.innerHeight;// アスペクト比
const W_RATIO  = window.devicePixelRatio;// ドット比
let camera, scene, renderer, cube;// カメラ、シーン、レンダラー、立方体

window.onload = ()=>{
	// 1, カメラを作る
	camera = new THREE.PerspectiveCamera(50, W_ASPECT, 1, 1000);
	camera.position.set(0, 0, 600);
	// 2, シーンを作る
	scene = new THREE.Scene();
	// 3-1, ライトを作る1
	let dirLight = new THREE.DirectionalLight(0xffffff, 1);
	dirLight.position.set(5,3,5);// 光の向き
	scene.add(dirLight);
	// 3-2, ライトを作る2
	let ambLight = new THREE.AmbientLight(0x333333);
	scene.add(ambLight);
	// 4, レンダラーを作る
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(W_RATIO);// ピクセル比
	renderer.setSize(W_WIDTH, W_HEIGHT);
	// 5, HTMLに配置する
	let div = document.getElementById("three");
	div.appendChild(renderer.domElement);
	// 6, キューブを配置する
	let geometry = new THREE.BoxGeometry(200, 200, 200);
	let material = new THREE.MeshLambertMaterial({color: 0x00ddff});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	// 7, アニメーションの開始
	animate();
}

function animate(){
	cube.rotation.x += 0.002;// 立方体を回転
	cube.rotation.y += 0.002;
	cube.rotation.z += 0.002;
	renderer.render(scene, camera);// レンダリング
	requestAnimationFrame(animate);// 更新
}