console.log("Hello WebXR!!");

// Modules
import {Gltf2Node} from "./libs/threejs/render/nodes/gltf2.js";
import {InlineViewerHelper} from "./libs/threejs/util/inline-viewer-helper.js";
import {QueryArgs} from "./libs/threejs/util/query-args.js";
import {Renderer, createWebGLContext} from "./libs/threejs/render/core/renderer.js";
import {Scene} from "./libs/threejs/render/scenes/scene.js";
import {SkyboxNode} from "./libs/threejs/render/nodes/skybox.js";
import {WebXRButton} from "./libs/threejs/util/webxr-button.js";

const XR_SESSION_STRING = "immersive-ar";// immersive-vr

window.onload = (e)=>{
	console.log("Onload!!");

	// XR
	let xrButton            = null;
	let xrImmersiveRefSpace = null;
	let isXRAvailable       = false;

	// WebGL
	let gl                  = null;
	let renderer            = null;
	let scene               = new Scene();
	let solarSystem         = new Gltf2Node({url: "./assets/gltf/space/space.gltf"});
	solarSystem.scale       = [0.1, 0.1, 0.1];
	scene.addNode(solarSystem);

	// Set with all anchors tracked in a previous frame.
	let all_previous_anchors = new Set();

	function appendLog(str){
		let li = document.createElement("li");
		li.innerText = str;
		document.querySelector("#log").appendChild(li);
	}

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
		if(event.session.isImmersive) xrButton.setSession(null);
	}

	function initGL(){
		appendLog("initGL");

		if(gl) return;
		gl = createWebGLContext({xrCompatible: true});
		document.body.appendChild(gl.canvas);

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
	// Start the XR application.
	initXR();  
}