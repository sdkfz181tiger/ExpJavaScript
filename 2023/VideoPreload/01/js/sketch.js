"use strict";

//==========
// Overlay

// Mov to Webm
// ffmpeg -i "hoge.mov" -c:v libvpx-vp9 hoge.webm
//
// 1, Preload
//	https://web.dev/i18n/ja/fast-playback-with-preload/
//  https://developer.mozilla.org/ja/docs/Web/HTML/Link_types/preload

const dir = "../assets/daido/"
let json = null;

// Window
window.onload = (e)=>{
	console.log("onload");

	// Preload
	const preLink = document.createElement("link");
	preLink.rel = "preload";
	preLink.as = "video";
	preLink.href = "../assets/sugusoko.webm";
	document.head.appendChild(preLink);

	// Axios
	const option = {responseType: "blob"};
	axios.get("./videoflow.json", option).then(res=>{
		// res.data.text().then(str=>{
		// 	json = JSON.parse(str);
		// 	createVideos(json.flows[json.first]);
		// });
	}).catch(err=>{
		console.log(err);
	});

	$("#btn_play").click(()=>{
		
	});
	$("#btn_stop").click(()=>{
		
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