console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	dImg: "",
	dImages: [
		"images/01.png",
		"images/02.png",
		"images/03.png",
		"images/04.png",
		"images/05.png",
		"images/06.png",
		"images/07.png",
		"images/08.png",
		"images/09.png",
		"images/10.png",
		"images/11.png",
		"images/12.png"
	]
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		this.shuffle();
	},
	methods:{
		shuffle(){
			console.log("shuffle!!");
			const rdm = Math.random() * this.dImages.length;
			const index = Math.floor(rdm);
			this.dImg = this.dImages[index];
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する