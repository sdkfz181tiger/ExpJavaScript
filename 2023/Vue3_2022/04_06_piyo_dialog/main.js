console.log("main.js!!");

// X-Dialog
//    https://xxjapp.github.io/xdialog/readme.html
// Demo(こちらを参考に!!)
//    https://xxjapp.github.io/xdialog/

// 1, Vue.jsで扱うデータを用意する
const myData = {
	total: 0,
	msgPiyo: "今日はダイアログやで。。。",
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

			// X-Dialog
			xdialog.open({
				title: "ダイアログAやで!!",
				buttons: {
					ok: {
						text: "OK",
						style: "border-radius: 8px; background: orange;"
					}
				},
				body: "<p>ボタンが1つやで</p>",
				style: "width: 90%; height: auto;"
			});
		},
		clickB(){
			console.log("clickB!!");

			// X-Dialog
			xdialog.open({
				title: "ダイアログBやで!!",
				buttons: {
					ok: {
						text: "OK",
						style: "border-radius: 8px; background: orange;"
					},
					cancel: {
						text: "CANCEL",
						style: "border-radius: 8px; background: orange;"
					}
				},
				body: "<p>ボタンが2つやで</p>",
				style: "width: 90%; height: auto;"
			});
		},
		clickC(){
			console.log("clickC!!");

			// X-Dialog
			xdialog.open({
				title: "ダイアログCやで!!",
				buttons: {
					ok: {
						text: "GOOD",
						style: "border-radius: 8px; background: orange;"
					},
					cancel: {
						text: "BAD",
						style: "border-radius: 8px; background: orange;"
					}
				},
				body: "<p>今日の気分はどない?</p>",
				style: "width: 90%; height: auto;",
				onok: (param)=>{
					console.info("onok:", param);
					this.msgPiyo = "Goodやで!!";
				},
				oncancel: (param)=>{
					console.info("oncancel:", param);
					this.msgPiyo = "Badやで!!";
				}
			});
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する