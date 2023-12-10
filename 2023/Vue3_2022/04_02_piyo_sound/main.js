console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	imgPiyo: "./images/piyo_smoke.png",
	msgPiyo: "思う存分鳴らしや...",
	snd01: null,
	snd02: null,
	snd03: null
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");

		// Howler
		this.snd01 = new Howl({
			src: "./sounds/btn01.mp3",
			loop: false,
			volume: 1.0
		});

		this.snd02 = new Howl({
			src: "./sounds/btn02.mp3",
			loop: false,
			volume: 1.0
		});

		this.snd03 = new Howl({
			src: "./sounds/btn03.mp3",
			loop: false,
			volume: 1.0
		});
	},
	methods:{
		clickBtn1(){
			console.log("clickBtn1");
			this.msgPiyo = "よっ!!";
			this.snd01.play();// 音源再生
		},
		clickBtn2(){
			console.log("clickBtn2");
			this.msgPiyo = "ほっ!!";
			this.snd02.play();// 音源再生
		},
		clickBtn3(){
			console.log("clickBtn3");
			this.msgPiyo = "はっ!!";
			this.snd03.play();// 音源再生
		},
	}
});
app.mount("#app");// 3, Vue.jsを起動する