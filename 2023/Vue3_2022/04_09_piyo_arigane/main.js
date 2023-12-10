console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	total: 0,
	msgPiyo: "好きなだけ持っていきや。。。",
	imgPiyo: "./images/piyo_smoke.png",
	imgCoin: "",
	indexCoin: -1,
	images: [
		"./images/coin_1.png",
		"./images/coin_5.png",
		"./images/coin_10.png",
		"./images/coin_50.png",
		"./images/coin_100.png",
		"./images/coin_500.png"
	],
	prices: [
		1,
		5,
		10,
		50,
		100,
		500
	]
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		this.nextCoin();// 次のコイン
	},
	methods:{
		nextCoin(){
			// コインを確定
			this.indexCoin = Math.floor(Math.random() * this.images.length);
			this.imgCoin = this.images[this.indexCoin];
		},
		getCoin(){
			console.log("getCoin!!");

			let rdm = Math.random();
			if(rdm < 0.1){
				this.msgPiyo = "全部もらってくで!!";
				this.total = 0;
				this.imgPiyo = "./images/piyo_laugh.png";
			}else{
				this.msgPiyo = "取るんかい。。。!?"
				this.total += this.prices[this.indexCoin];
				this.imgPiyo = "./images/piyo_smoke.png";
			}
			this.nextCoin();// 次のコイン
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する