console.log("main.js!!");

const NG_WORDS = ["バカ", "馬鹿", "アホ", "阿呆"];

window.onload = ()=>{

	const utter = readySpeak((e)=>{
		console.log("Time:" + e.elapsedTime);
		setTimeout(()=>{rec.start();}, 500);
	});

	const rec = readyRecognition((text)=>{

		for(let word of NG_WORDS){
			if(text.includes(word)){
				const reply = word + "はお前だ。";
				startSpeak(utter, reply);
				addText(reply);
				return;
			}
		}

		startSpeak(utter, text);
		addText(text);
	});

	document.getElementById("btnStart").onclick = ()=>{
		rec.start();
	}

	document.getElementById("btnStop").onclick = ()=>{
		rec.stop();
	}
}

function readyRecognition(callback){

	const rec = new webkitSpeechRecognition();
	rec.continuous = true;
	rec.interimResults = false;
	rec.lang = "ja-JP";
	rec.onresult = (e)=>{
		for(let result of e.results){
			if(!result.isFinal) continue;
			rec.stop();
			callback(result[0].transcript);// Callback
		}
	}
	rec.onerror = (e)=>{
		if(e.error !== "no-speech") return;
		setTimeout(()=>{rec.start();}, 500);
	}
	return rec;
}

function readySpeak(callback){

	const utter = new SpeechSynthesisUtterance();
	const voices = window.speechSynthesis.getVoices();
	utter.voice  = voices[7]; // 7:Google 日本人 ja-JP
	utter.volume = 1.0; // 音量 min 0 ~ max 1
	utter.rate   = 0.5; // 速度 min 0.1 ~ max 10
	utter.pitch  = 1.0; // 音程 min 0 ~ max 2
	utter.lang   = "ja-JP";
	utter.text   = "何か言いましたか!?";
	utter.onend = callback;
	return utter;
}

function startSpeak(utter, text){
	utter.text = text;
	speechSynthesis.speak(utter);
}

function addText(str){
	const elem = document.createElement("li");
	elem.innerHTML = str;
	document.getElementById("txtResult").appendChild(elem);
}