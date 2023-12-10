console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	userAgent: navigator.userAgent,
	imgPiyo: "./images/piyo_smoke.png",
	msgPiyo: "今何時やろ。。。",
	clock: "00:00:00"
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		console.log(this.userAgent);
		this.tick();// 時計を更新する
	},
	methods:{
		tick(){
			console.log("tick!!");

			// 現在日時
			const dNow = new Date();
			let hour = dNow.getHours();
			let min  = dNow.getMinutes();
			let sec = dNow.getSeconds();

			// 表示を補正
			if(hour < 10) hour = "0" + hour;
			if(min < 10) min = "0" + min;
			if(sec < 10) sec = "0" + sec;

			// 文字列を組み立てる
			this.clock = hour + ":" + min + ":" + sec;

			// 1000ミリ秒後に...
			setTimeout(()=>{
				this.tick();// 時計を更新する
			}, 1000);
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する