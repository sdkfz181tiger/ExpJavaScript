console.log("main.js!!");

let chunks = [];// データを格納する配列

window.onload = ()=>{

	// 1-1, MediaDevicesが使えるかどうかを判定します
	if(!navigator.mediaDevices){
		console.log("Media Devices not supported!!");
		return;
	}

	// 1-2, MediaDevicesを起動します
	navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=>{
		readyMediaRecorder(stream);// Ready
	}).catch((err)=>{
		console.log("Error:" + err);// Error
	});
}

function readyMediaRecorder(stream){

	// 2-1, MediaRecorderを準備します
	let mediaRecorder = new MediaRecorder(stream);

	// 2-2, MediaRecorderの開始
	mediaRecorder.onstart = (e)=>{
		console.log("onstart!!");
	}

	// 2-3, MediaRecorderの停止
	mediaRecorder.onstop = (e)=>{
		console.log("onstop!!");
		// 4-1, Blob形式に変換する
		const blob = new Blob(chunks, {"type":"audio/ogg; codecs=opus"});
		const url = URL.createObjectURL(blob);
		chunks = [];// 配列を初期化
		// 4-2, Base64形式に変換する
		let reader = new FileReader();// Reader
		reader.readAsDataURL(blob);
		reader.onload = ()=>{playHowl(reader.result);};
	}

	// 2-4, MediaRecorderにデータを追加
	mediaRecorder.ondataavailable = (e)=>{
		console.log("ondataavailable!!");
		chunks.push(e.data);
    }

    // 2-5, MediaRecorderのエラー
    mediaRecorder.onerror = (e)=>{
		console.log("onerror:" + e);
	}

	// 3-1, スタートボタン
	document.getElementById("btnStart").onclick = ()=>{
		if(mediaRecorder.state == "recording") return;
		mediaRecorder.start();
		console.log("MediaRecorder:" + mediaRecorder.state);
	}

	// 3-2, ストップボタン
	document.getElementById("btnStop").onclick = ()=>{
		if(mediaRecorder.state == "inactive") return;
		mediaRecorder.stop();
		console.log("MediaRecorder:" + mediaRecorder.state);
	}
}

function playHowl(base64){
	console.log("playHowl:" + base64);
	// 5, Howlerを使って再生する
	let snd = new Howl({
		src: base64,
		loop: false,// 繰り返し 
		volume: 1.0,// 音量
		rate: 1.4,  // 再生速度
		onplay: ()=>{
			console.log("サウンド再生!!");
		},
		onstop: ()=>{
			console.log("サウンド停止!!");
		},
		onpause: ()=>{
			console.log("サウンド一時停止!!");
		},
		onend: ()=>{
			console.log("サウンド終了!!");
		}
	});
	snd.play();
}