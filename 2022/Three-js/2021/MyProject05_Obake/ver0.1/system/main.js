console.log("Hello WebXR!!");

const W_WIDTH  = window.innerWidth; 
const W_HEIGHT = window.innerHeight;

const LEVEL_WAQI = [
	{aqi: 50,  title:"良い", color:"darkgreen"},
	{aqi: 100, title:"普通", color:"gold"},
	{aqi: 150, title:"敏感なグループにとって健康に悪い", color:"darkorange"},
	{aqi: 200, title:"健康に悪い", color:"darkred"},
	{aqi: 300, title:"極めて健康に悪い", color:"darkmagenta"},
	{aqi: 999, title:"危険", color:"darkslateblue"}
]

const URL_WAQI = "https://api.waqi.info/feed/";
const TOKEN    = "24ef55a69b8678bbb8d837550f82172b6e2d7b14";

const MODEL_MERCURY = "./assets/gltf/planets/mercury.gltf";
const MODEL_MARS    = "./assets/gltf/planets/mars.gltf";
const MODEL_SCALE   = [0.1, 0.1, 0.1];

// Modules
import {Gltf2Node} from "./libs/threejs/render/nodes/gltf2.js";
import {InlineViewerHelper} from "./libs/threejs/util/inline-viewer-helper.js";
import {QueryArgs} from "./libs/threejs/util/query-args.js";
import {Renderer, createWebGLContext} from "./libs/threejs/render/core/renderer.js";
import {Scene} from "./libs/threejs/render/scenes/scene.js";
import {SkyboxNode} from "./libs/threejs/render/nodes/skybox.js";
import {WebXRButton} from "./libs/threejs/util/webxr-button.js";

const XR_SESSION_STRING = "immersive-ar";// immersive-ar / immersive-vr

window.onload = (e)=>{
	appendLog("Onload");
	startGPS();// GPS
}

function startGPS(){
	appendLog("startGPS");
	if(!navigator.geolocation){
		appendLog("Geolocation is not supported");
		return;
	}
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

	function onSuccess(pos){
		const lat = pos.coords.latitude;
		const lng = pos.coords.longitude;
		startWAQI(lat, lng);// WAQI
	}

	function onError(error){
		appendLog("Error:" + error);
	}
}

function startWAQI(lat, lng){
	appendLog("startWAQI:" + lat + ", " + lng);

	const url = URL_WAQI + "geo:" + lat + ";" + lng + "/"; 
	const option = {responseType: "blob", params:{token: TOKEN}};
	axios.get(url, option).then(res=>{
		res.data.text().then(str=>{
			try{
				const json = JSON.parse(str);
				const city = json.data.city.name;
				const aqi  = json.data.aqi;
				const iaqi = json.data.iaqi;
				appendLog("CITY:" + city);
				appendLog("AQI:" + aqi);
				appendLog("pm10:" + iaqi.pm10.v);
				appendLog("pm25:" + iaqi.pm25.v);

				for(let level of LEVEL_WAQI){
					if(aqi < level.aqi){
						const msg = "空気質指数:" + aqi + "_" + level.title;
						showBanner(msg, level.color);
						break;
					}
				}
				startWebXR(aqi);
			}catch(err){
				appendLog("Error:" + err);
			};
		});
	}).catch(err=>{
		appendLog("Error:" + err);
	});
}

function startWebXR(aqi){
	appendLog("startWebXR");

	// XR
	let xrButton            = null;
	let xrImmersiveRefSpace = null;
	let isXRAvailable       = false;

	// WebGL
	let gl                  = null;
	let renderer            = null;
	let scene               = new Scene();
	scene.enableStats(false);// Show/Hide
	
	// GLTF
	const total   = aqi * 2;// Total
	const RADIUS  = 7;
	const PAD_DEG = 45;
	for(let i=0; i<total; i++){
		
		const degH  = Math.random() * (PAD_DEG*2) - PAD_DEG - 90;
		const degV  = Math.random() * (PAD_DEG*2) - PAD_DEG;
		const radH  = degH * Math.PI / 180;
		const radV  = degV * Math.PI / 180;
		const x     = RADIUS * Math.cos(radH);
		const y     = RADIUS * Math.sin(radV);
		const z     = RADIUS * Math.sin(radH);
		const url   = (Math.random()<0.5) ? MODEL_MERCURY:MODEL_MARS;
		const model = new Gltf2Node({url: url});
		model.scale = MODEL_SCALE;
		model.translation = [x, y, z];
		scene.addNode(model);
	}

	// Set with all anchors tracked in a previous frame.
	let all_previous_anchors = new Set();

	initXR();// Start the XR application.

	function initXR(){
		appendLog("initXR");

		// Button
		xrButton = new WebXRButton({
			onRequestSession: onRequestSession,
			onEndSession: onEndSession,
			textXRNotFoundTitle: "XR NOT FOUND",
			textEnterXRTitle: "START XR",
			textExitXRTitle: "EXIT  XR"
		});
		document.querySelector("#inner").appendChild(xrButton.domElement);

		if(navigator.xr){
			navigator.xr.isSessionSupported(XR_SESSION_STRING).then((supported)=>{
				isXRAvailable = supported;
				xrButton.enabled = supported;
				appendLog("isXRAvailable:" + supported);
			});

			navigator.xr.requestSession("inline").then(onSessionStarted);
		}
	}

	function onRequestSession(){
		appendLog("onRequestSession");
		return navigator.xr.requestSession(XR_SESSION_STRING, {
			requiredFeatures: ["anchors"],
			optionalFeatures: ["dom-overlay"],
			requiredFeatures: ["local"],
			domOverlay: {root: document.getElementById("xrview")}
		}).then((session)=>{
			session.isImmersive = true;
			xrButton.setSession(session);
			onSessionStarted(session);
		});
	}

	function onSessionStarted(session){
		appendLog("onSessionStarted");
		session.addEventListener("end", onSessionEnded);

		if(session.isImmersive) initGL();

		// This and all future samples that visualize controllers will use this
		// convenience method to listen for changes to the active XRInputSources
		// and load the right meshes based on the profiles array.
		scene.inputRenderer.useProfileControllerMeshes(session);

		session.updateRenderState({baseLayer: new XRWebGLLayer(session, gl)});

		session.requestReferenceSpace("local").then((refSpace)=>{
			if(session.isImmersive) xrImmersiveRefSpace = refSpace;
			session.requestAnimationFrame(onXRFrame);
		});
	}

	function onEndSession(session){
		appendLog("onEndSession");
		session.end();
	}

	function onSessionEnded(event){
		appendLog("onSessionEnded");
		document.querySelector("#xrview").innerHTML = "";
		if(event.session.isImmersive) xrButton.setSession(null);
	}

	function initGL(){
		appendLog("initGL");

		if(gl) return;
		gl = createWebGLContext({xrCompatible: true});
		document.querySelector("#xrview").appendChild(gl.canvas);

		function onResize(){
			gl.canvas.width  = gl.canvas.clientWidth  * window.devicePixelRatio;
			gl.canvas.height = gl.canvas.clientHeight * window.devicePixelRatio;
		}
		window.addEventListener("resize", onResize);
		onResize();

		renderer = new Renderer(gl);
		scene.setRenderer(renderer);
	}

	// Called every time a XRSession requests that a new frame be drawn.
	function onXRFrame(t, frame){
		let session = frame.session;
		let xrRefSpace = xrImmersiveRefSpace;
		let pose = frame.getViewerPose(xrRefSpace);

		const tracked_anchors = frame.trackedAnchors;
		if(tracked_anchors){

			all_previous_anchors.forEach((anchor)=>{
				if(!tracked_anchors.has(anchor)){
					scene.removeNode(anchor.sceneObject);
				}
			});

			tracked_anchors.forEach((anchor)=>{
				const anchorPose = frame.getPose(anchor.anchorSpace, xrRefSpace);
				if(anchorPose){
					anchor.context.sceneObject.matrix = anchorPose.transform.matrix;
					anchor.context.sceneObject.visible = true;
				}else{
					anchor.context.sceneObject.visible = false;
				}
			});
			all_previous_anchors = tracked_anchors;

		}else{
			all_previous_anchors.forEach((anchor)=>{
				scene.removeNode(anchor.sceneObject);
			});
			all_previous_anchors = new Set();
		}

		// In this sample and most samples after it we"ll use a helper function
		// to automatically add the right meshes for the session"s input sources
		// each frame. This also does simple hit detection to position the
		// cursors correctly on the surface of selectable nodes.
		scene.updateInputSources(frame, xrRefSpace);
		scene.startFrame();
		scene.drawXRFrame(frame, pose);
		scene.endFrame();
		session.requestAnimationFrame(onXRFrame);
	}  
}

function appendLog(str){
	const elem = document.createElement("li");
	elem.innerText = str;
	document.querySelector("#log ul").appendChild(elem);
}

function showBanner(str, color){
	const elem = document.createElement("div");
	elem.innerText = str;
	elem.style.backgroundColor = color;
	elem.setAttribute("id", "banner");
	document.getElementById("xrview").appendChild(elem);
}