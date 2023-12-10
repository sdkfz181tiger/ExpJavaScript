console.log("Hello WebXR!!");

// Modules
import {WebXRButton} from "./libs/threejs/util/webxr-button.js";
import {Scene} from "./libs/threejs/render/scenes/scene.js";
import {Renderer, createWebGLContext} from "./libs/threejs/render/core/renderer.js";
import {SkyboxNode} from "./libs/threejs/render/nodes/skybox.js";
import {InlineViewerHelper} from "./libs/threejs/util/inline-viewer-helper.js";
import {Gltf2Node} from "./libs/threejs/render/nodes/gltf2.js";
import {QueryArgs} from "./libs/threejs/util/query-args.js";

window.onload = (e)=>{
	console.log("Onload!!");

	// XR globals.
	let xrButton            = null;
	let xrImmersiveRefSpace = null;
	let inlineViewerHelper  = null;

	let isARAvailable       = false;
	let isVRAvailable       = false;
	let xrSessionString     = "immersive-vr";

	// WebGL scene globals.
	let gl          = null;
	let renderer    = null;
	let scene       = new Scene();
	let solarSystem = new Gltf2Node({url: "./assets/gltf/space/space.gltf"});
	solarSystem.scale = [0.1, 0.1, 0.1];
	scene.addNode(solarSystem);

	// Set with all anchors tracked in a previous frame.
	let all_previous_anchors = new Set();

	function initXR(){

		xrButton = new WebXRButton({
			onRequestSession: onRequestSession,
			onEndSession: onEndSession,
			textEnterXRTitle: isARAvailable ? "START AR" : "START VR",
			textXRNotFoundTitle: isARAvailable ? "AR NOT FOUND" : "VR NOT FOUND",
			textExitXRTitle: isARAvailable ? "EXIT  AR" : "EXIT  VR",
		});
		document.querySelector("#wrapper").appendChild(xrButton.domElement);

		if(navigator.xr){
			navigator.xr.isSessionSupported("immersive-ar").then((supported)=>{
				isARAvailable = supported;
				xrButton.enabled = supported;
				if(!supported){
					navigator.xr.isSessionSupported("immersive-vr").then((supported)=>{
						isVRAvailable = supported;
						xrButton.enabled = supported;
					});
				}else{
					xrSessionString = "immersive-ar";
				}
			});
			navigator.xr.requestSession("inline").then(onSessionStarted);
		}
	}

	function onRequestSession(){
		return navigator.xr.requestSession(xrSessionString, {requiredFeatures: ["anchors"]}).then((session)=>{
			xrButton.setSession(session);
			session.isImmersive = true;
			onSessionStarted(session);
		});
	}

	function initGL(){
		if(gl)return;
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

	function onSessionStarted(session){
		session.addEventListener("end", onSessionEnded);

		initGL();

		// This and all future samples that visualize controllers will use this
		// convenience method to listen for changes to the active XRInputSources
		// and load the right meshes based on the profiles array.
		scene.inputRenderer.useProfileControllerMeshes(session);

		session.updateRenderState({baseLayer: new XRWebGLLayer(session, gl)});

		let refSpaceType = session.isImmersive ? "local" : "viewer";
		session.requestReferenceSpace(refSpaceType).then((refSpace)=>{
			if(session.isImmersive){
				xrImmersiveRefSpace = refSpace;
			}else{
				inlineViewerHelper = new InlineViewerHelper(gl.canvas, refSpace);
			}
			session.requestAnimationFrame(onXRFrame);
		});
	}

	function onEndSession(session){
		session.end();
	}

	function onSessionEnded(event){
		if(event.session.isImmersive) xrButton.setSession(null);
	}

	// Called every time a XRSession requests that a new frame be drawn.
	function onXRFrame(t, frame){
		let session = frame.session;
		let xrRefSpace = session.isImmersive ? xrImmersiveRefSpace:inlineViewerHelper.referenceSpace;
		let pose = frame.getViewerPose(xrRefSpace);

		// Update the position of all the anchored objects based on the currently reported positions of their anchors
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