console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	imgPiyo: "./images/piyo_smoke.png",
	msgPiyo: "3分はかるで...",
	timer: "00:00",
	sndAlarm01: null,
	sndAlarm01: null,
	sndPiyo: null
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");

		// Howler(ピッポ)
		this.sndAlarm01 = new Howl({
			src: "./sounds/alarm01.mp3",
			loop: false,
			volume: 1.0
		});

		// Howler(ポーン)
		this.sndAlarm02 = new Howl({
			src: "./sounds/alarm02.mp3",
			loop: false,
			volume: 1.0
		});

		// Howler(ぴよぴよ)
		this.sndPiyo = new Howl({
			src: "./sounds/piyopiyo.mp3",
			loop: false,
			volume: 1.0
		});
	},
	methods:{
		start(){
			console.log("start!!");
			this.msgPiyo = "スタートやで...";

			this.sndAlarm01.play();// Test
		},
		stop(){
			console.log("stop!!");
			this.msgPiyo = "ストップやで...";

			this.sndAlarm02.play();// Test
		},
		reset(){
			console.log("reset!!");
			this.msgPiyo = "リセットやで...";

			this.sndPiyo.play();// Test
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する