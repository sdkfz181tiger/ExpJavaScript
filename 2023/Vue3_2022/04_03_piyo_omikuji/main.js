console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	msgPiyo: "おみくじやで!!",
	imgPiyo: "./images/piyo_smoke.png",
	kujis: [
		"大吉やで!!",
		"中吉やで!!",
		"凶やで!!",
		"大凶やで!!"
	]
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
		getOmikuji(){

			// おみくじを確定
			const index = Math.floor(Math.random() * this.kujis.length);
			this.msgPiyo = this.kujis[index];

			// TODO1: おみくじの結果によってサウンドを再生させる事
			
			// TODO2: おみくじの結果によって画像を表示させる事
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する