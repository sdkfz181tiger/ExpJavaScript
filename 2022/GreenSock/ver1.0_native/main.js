console.log("custom.js");

window.onload = ()=>{
	console.log("onload!!");

	gsap.to("#red", {
		x: 100,// x座標を100に
		duration: 1,// アニメーション実行時間
		delay: 1,// 待機時間
		ease: "power2.inOut",// イージング
		repeat: 2,// 繰り返し回数
		onStart: ()=>{// アニメーション開始時
			console.log("onStart!!");
		},
		onComplete: ()=>{// アニメーション終了時
			console.log("onComplete!!");
		}
	});
	gsap.to("#green", {x: 30, y: 30, duration: 2});
	gsap.to("#blue", {x: 100, rotationZ: 90, duration: 3});
}