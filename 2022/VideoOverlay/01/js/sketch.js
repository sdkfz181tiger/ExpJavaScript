"use strict";

//==========
// Overlay

// Mov to Webm
// ffmpeg -i "hoge.mov" -c:v libvpx-vp9 hoge.webm
//
// 1, 映像がオーバーレイされる順序はvideoflow.jsonに保存
// 2, 動画遷移のロジックはlogic.jsに集約

const dir = "../assets/daido/"
let json = null;

// Window
window.onload = (e)=>{
	console.log("onload");

	// Axios
	const option = {responseType: "blob"};
	axios.get("./videoflow.json", option).then(res=>{
		res.data.text().then(str=>{
			json = JSON.parse(str);
			createVideos(json.flows[json.first]);
		});
	}).catch(err=>{
		console.log(err);
	});

	$("#btn_play").click(()=>{
		playVideos();
	});
	$("#btn_stop").click(()=>{
		pauseVideos();
	});
}

const createVideos = (flow)=>{
	console.log("createVideos:", flow.comment, flow.wait);

	const myPlayer = $("#my_player");
	myPlayer.empty();// Empty
	for(let file of flow.files){
		const tagVideo = $("<video>");// Video
		tagVideo.attr("loop", file.loop);// Loop
		tagVideo.attr("autoplay", true);// Auto
		const tagSource = $("<source>");// Source
		tagSource.attr("type", "video/webm");
		tagSource.attr("src", dir + file.name);
		tagVideo.append(tagSource);
		myPlayer.append(tagVideo);
	}
	if(0 < flow.wait) setTimeout(()=>{
		console.log("next:", flow.next);
		createVideos(json.flows[flow.next]);
	}, flow.wait);
}

const playVideos = ()=>{
	console.log("playVideos");

	const videos = $("#my_player video");
	for(let video of videos){
		video.play();
		video.volume = 0.5;
	}
}

const pauseVideos = ()=>{
	console.log("pauseVideos");

	const videos = $("#my_player video");
	for(let video of videos){
		video.pause();
		video.volume = 0.5;
	}
}