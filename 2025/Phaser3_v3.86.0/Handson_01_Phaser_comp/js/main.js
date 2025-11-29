"use strict";

const D_WIDTH = 480;
const D_HEIGHT = 320;
let player;

// 1, Phaser3の設定データ
const config = {
	type: Phaser.AUTO,
	width: D_WIDTH,// ゲーム画面の横幅
	height: D_HEIGHT,// ゲーム画面の高さ
	antialias: false,// アンチエリアス
	scene: {
		preload: preload,// 素材の読み込み時の関数
		create: create,// 画面が作られた時の関数
		update: update// 連続実行される関数
	},
	fps: {
		target: 24,// 1秒間に24回update
		forceSetTimeOut: true
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,// デバッグモード
			gravity: {y: 300}// 重力の強さ
		}
	}
}

// 2, Phaser3オブジェクトを作る
let phaser = new Phaser.Game(config);

function preload(){
	console.log("preload!!");
	this.load.image("block", "./assets/block.png");
	this.load.image("coin", "./assets/coin.png");
	this.load.image("ground", "./assets/ground.png");
	this.load.image("pillar", "./assets/pillar.png");
	this.load.image("post", "./assets/post.png");
	this.load.image("sky", "./assets/sky.png");
	this.load.image("tanuki", "./assets/tanuki.png");
}

function create(){
	console.log("create!!");
	this.add.image(D_WIDTH/2, D_HEIGHT/2, "sky");// 画面の中心に表示します
	player = this.physics.add.sprite(240, 80, "tanuki");// プレイヤー

	// 障害物
	let staticGroup = this.physics.add.staticGroup();// 動かない物体をまとめる
	staticGroup.create(D_WIDTH/2, D_HEIGHT-32, "ground");// 地面
	staticGroup.create(240, 240, "block");// ブロック
	staticGroup.create(350, 230, "post");// ポスト
	staticGroup.create(400, 160, "pillar");// 電柱
	this.physics.add.collider(player, staticGroup);// 衝突処理を設定する

	// コイン
	let coinGroup = this.physics.add.group();// 動く物体をまとめる
	coinGroup.create(190, 0, "coin");// コイン1
	coinGroup.create(240, 0, "coin");// コイン2
	coinGroup.create(290, 0, "coin");// コイン3
	this.physics.add.collider(coinGroup, staticGroup);// 衝突処理を設定する

	// 衝突判定
	this.physics.add.overlap(player, coinGroup, (p, c)=>{
		c.destroy();// コインを消す
	}, null, this);
}

function update(){
	console.log("update!!");
	// キーボードの情報を取得
	let cursors = this.input.keyboard.createCursorKeys();
	if(cursors.up.isDown){
		//console.log("Up!!");
		player.setVelocityY(-200);// 上方向の速度を設定
	}else if(cursors.left.isDown){
		//console.log("Left");
		player.setVelocityX(-200);// 左方向の速度を設定
	}else if(cursors.right.isDown){
		//console.log("Right!!");
		player.setVelocityX(200);// 右方向の速度を設定
	}else{
		player.setVelocityX(0);// 横方向の速度を0
	}
}