console.log("custom.js");

window.onload = ()=>{
	console.log("onload!!");

	let snd = new Howl({
		src: ["assets/sample_01.mp3"],
		loop: false,
		volume: 1.0,
		onplay: ()=>{
			console.log("onplay!!");
		},
		onstop: ()=>{
			console.log("onstop!!");
		},
		onpause: ()=>{
			console.log("onpause!!");
		},
		onend: ()=>{
			console.log("onend!!");
		}
	});

	// Button
	$("#btn_play").click(()=>{
		snd.play();
	});

	$("#btn_stop").click(()=>{
		snd.stop();
	});

	$("#btn_pause").click(()=>{
		snd.pause();
	});
	
	// Slider
	$("#ui_slider").slider({
		value: 0, min: 0, max: 100, step: 1,
		start: (e, ui)=>{
			snd.stop();
		},
		stop: (e, ui)=>{
			snd.seek(snd.duration() * (ui.value/100));
			snd.play();
		}
	});

	// Time
	setInterval(()=>{
		if(!snd.playing()) return;

		const str = "再生時間:" + snd.seek() + "/" + snd.duration();
		$("#dsp_time").text(str);

		const percent = Math.floor(snd.seek() / snd.duration() * 100);
		$("#ui_slider").slider("value", percent);
	}, 100);
}