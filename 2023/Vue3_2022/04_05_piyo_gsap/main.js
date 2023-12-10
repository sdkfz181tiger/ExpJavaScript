console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	total: 0,
	msgPiyo: "アニメーションするで。。。",
	imgPiyo: "./images/piyo_smoke.png"
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
	},
	methods:{
		clickA(){
			console.log("clickA!!");
			const tlPiyo = gsap.timeline();
			tlPiyo.to("#l-piyo", {duration: 0.2, ease: "power1", y: -40});
			tlPiyo.to("#l-piyo", {duration: 0.4, ease: "bounce", y: 0});
		},
		clickB(){
			console.log("clickB!!");
			const tlPiyo = gsap.timeline({repeat: 1});
			tlPiyo.to("#l-piyo", {duration: 0.1, ease: "power1", x: -10});
			tlPiyo.to("#l-piyo", {duration: 0.1, ease: "power1", x: 0});
		},
		clickC(){
			console.log("clickC!!");
			const tlPiyo = gsap.timeline({repeat: 5});
			tlPiyo.to("#l-piyo", {duration: 0.1, ease: "power1", x: -10});
			tlPiyo.to("#l-piyo", {duration: 0.1, ease: "power1", x: 0});
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する