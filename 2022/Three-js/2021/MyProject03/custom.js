const W_WIDTH  = window.innerWidth; // ブラウザの横サイズ
const W_HEIGHT = window.innerHeight;// ブラウザの縦サイズ
const W_ASPECT = window.innerWidth / window.innerHeight;// アスペクト比
const W_RATIO  = window.devicePixelRatio;// ドット比
let camera, scene, renderer, earth, moon;// カメラ、シーン、レンダラー、地球、月

let radius = W_WIDTH * 0.4;// 半径
let radian = 0;// ラジアン

window.onload = ()=>{
	// カメラを作る
	camera = new THREE.PerspectiveCamera(50, W_ASPECT, 1, 1000);
	camera.position.set(0, 0, 600);
	// シーンを作る
	scene = new THREE.Scene();
	// ライトを作る1
	let dirLight = new THREE.DirectionalLight(0xffffff, 1);
	dirLight.position.set(5,3,5);// 光の向き
	scene.add(dirLight);
	// ライトを作る2
	let ambLight = new THREE.AmbientLight(0x333333);
	scene.add(ambLight);
	// レンダラーを作る
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(W_RATIO);// ピクセル比
	renderer.setSize(W_WIDTH, W_HEIGHT);
	// HTMLに配置する
	let div = document.getElementById("three");
	div.appendChild(renderer.domElement);
	// 地球を作る
	let eSize = W_WIDTH * 0.2;
	earth = createMesh(eSize, "./assets/earth_tx.png");
	scene.add(earth);
	// 月を作る
	let mSize = W_WIDTH * 0.04;
	moon = createMesh(mSize, "./assets/moon_tx.png");
	scene.add(moon);
	// アニメーションの開始
	animate();
}

function animate(){
	earth.rotation.y += 0.002;// 地球を回転させる
	moon.rotation.y += 0.002;// 月を回転させる
	moon.position.x = radius * Math.cos(radian);// 月を周回させる
	moon.position.z = radius * Math.sin(radian);
	radian += 0.002;// 角度に加算する
	renderer.render(scene, camera);// レンダリング
	requestAnimationFrame(animate);// 更新
}

function createMesh(r, path){
	// テクスチャ
	let txLoader  = new THREE.TextureLoader();
	let normalMap = txLoader.load(path);
	// ジオメトリ
	let geometry = new THREE.SphereBufferGeometry(r, 30, 30);
	// マテリアル
	let material = new THREE.MeshPhongMaterial({
		color:0xffffff,
		map: normalMap
	});
	// メッシュ
	let mesh = new THREE.Mesh(geometry, material);
	return mesh;
}