console.log("Hello WebXR!!");

// Modules
import {Gltf2Node} from "./libs/threejs/render/nodes/gltf2.js";
import {InlineViewerHelper} from "./libs/threejs/util/inline-viewer-helper.js";
import {QueryArgs} from "./libs/threejs/util/query-args.js";
import {Renderer, createWebGLContext} from "./libs/threejs/render/core/renderer.js";
import {Scene} from "./libs/threejs/render/scenes/scene.js";
import {SkyboxNode} from "./libs/threejs/render/nodes/skybox.js";
import {WebXRButton} from "./libs/threejs/util/webxr-button.js";

const XR_SESSION_STRING = "immersive-ar";// TODO: test immersive-vr

window.onload = (e)=>{
	appendLog("Onload");

	// Loading from JSON...
	const option = {responseType: "blob"};
	axios.get("./data.json", option).then(res=>{
		res.data.text().then(str=>{
			try{
				const json = JSON.parse(str);
				//startGPS(json.locations);// Start GPS!!
				startWebXR(json.locations[0]);// Test!!
			}catch(err){
				appendLog("Error:" + err);
			};
		});
	}).catch(err=>{
		appendLog("Error:" + err);
	});
}

function startGPS(locations){
	appendLog("startGPS");
	if(!navigator.geolocation){
		appendLog("Geolocation is not supported");
		return;
	}
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

	function onSuccess(pos){
		const lat = pos.coords.latitude;
		const lng = pos.coords.longitude;
		appendLog("Success:" + lat + ", " + lng);
		const nearest = selectData(lat, lng);// Nearest
		appendLog("Nearest:" + nearest.name + "_" + nearest.distance + "m_x" + nearest.total);
		startWebXR(nearest);// Start WebXR!!
	}

	function onError(error){
		appendLog("Error:" + error);
	}

	function selectData(lat, lng){
		appendLog("selectData");
		// Calc distance
		for(let location of locations){
			location.distance = calcDistance(lat, lng, location.lat, location.lng);
			appendLog("Location:" + location.name + "_" + location.distance + "m_x" + location.total);
		}
		// Sort
		locations.sort((a, b)=>{return a.distance > b.distance;});
		return locations[0];// Nearest
	}

	function calcDistance(lat1, lng1, lat2, lng2){
		const RADIUS_EARTH = 6371000;// Raius of the earth (meter)
		const DEG_TO_RAD = Math.PI/180;
		const dLat = DEG_TO_RAD * (lat2-lat1);
		const dLng = DEG_TO_RAD * (lng2-lng1);
		const a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) + 
			Math.cos(DEG_TO_RAD*lat1) * Math.cos(DEG_TO_RAD*lat2) * 
			Math.sin(dLng/2) * Math.sin(dLng/2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		return Math.floor(RADIUS_EARTH * c);
	}
}

function startWebXR(location){
	appendLog("startWebXR");

	// XR
	let xrButton            = null;
	let xrImmersiveRefSpace = null;
	let isXRAvailable       = false;

	// WebGL
	let gl                  = null;
	let renderer            = null;
	let scene               = new Scene();
	
	// GLTF
	let model               = new Gltf2Node({url: location.gltf});
	model.scale             = location.scale;
	scene.addNode(model);

	// TODO: 周囲に配置

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
		return navigator.xr.requestSession(XR_SESSION_STRING, {requiredFeatures: ["anchors"]}).then((session)=>{
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
			gl.canvas.width = gl.canvas.clientWidth * window.devicePixelRatio;
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
		session.requestAnimationFrame(onXRFrame);
		scene.drawXRFrame(frame, pose);
		scene.endFrame();
	}  
}

function appendLog(str){
	let elem = document.createElement("li");
	elem.innerText = str;
	document.querySelector("#log ul").appendChild(elem);
}