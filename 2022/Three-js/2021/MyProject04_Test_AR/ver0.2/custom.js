console.log("Hello WebXR!!");

// Modules
import {WebXRButton} from './libs/threejs/util/webxr-button.js';
import {Scene} from './libs/threejs/render/scenes/scene.js';
import {Renderer, createWebGLContext} from './libs/threejs/render/core/renderer.js';
import {SkyboxNode} from './libs/threejs/render/nodes/skybox.js';
import {InlineViewerHelper} from './libs/threejs/util/inline-viewer-helper.js';
import {Gltf2Node} from './libs/threejs/render/nodes/gltf2.js';
import {QueryArgs} from './libs/threejs/util/query-args.js';

window.onload = (e)=>{
	console.log("Onload!!");

	// XR globals.
	let xrButton            = null;
	let xrImmersiveRefSpace = null;
	let inlineViewerHelper  = null;

	let isARAvailable       = false;
	let isVRAvailable       = false;
	let xrSessionString     = 'immersive-vr';

	// WebGL scene globals.
	let gl          = null;
	let renderer    = null;
	let scene       = new Scene();
	let solarSystem = new Gltf2Node({url: 'assets/gltf/space/space.gltf'});

	// The solar system is big (citation needed). Scale it down so that users
	// can move around the planets more easily.
	solarSystem.scale = [0.1, 0.1, 0.1];
	scene.addNode(solarSystem);
	// Still adding a skybox, but only for the benefit of the inline view.
	let skybox = new SkyboxNode({url: 'assets/textures/milky-way-4k.png'});
	scene.addNode(skybox);

	const MAX_ANCHORED_OBJECTS = 30;
	let anchoredObjects = [];

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
		document.querySelector('header').appendChild(xrButton.domElement);

		if(navigator.xr){
			navigator.xr.isSessionSupported('immersive-ar').then((supported)=>{
				isARAvailable = supported;
				xrButton.enabled = supported;
				if(!supported){
					navigator.xr.isSessionSupported('immersive-vr').then((supported)=>{
						isVRAvailable = supported;
						xrButton.enabled = supported;
					});
				}else{
					xrSessionString = 'immersive-ar';
				}
			});
			navigator.xr.requestSession('inline').then(onSessionStarted);
		}
	}

	function onRequestSession(){
		return navigator.xr.requestSession(xrSessionString, {requiredFeatures: ['anchors']}).then((session)=>{
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
		window.addEventListener('resize', onResize);
		onResize();
		renderer = new Renderer(gl);
		scene.setRenderer(renderer);
	}

	function onSessionStarted(session){
		session.addEventListener('end', onSessionEnded);
		session.addEventListener('select', onSelect);

		if(session.isImmersive && isARAvailable){
			skybox.visible = false;
		}

		initGL();

		// This and all future samples that visualize controllers will use this
		// convenience method to listen for changes to the active XRInputSources
		// and load the right meshes based on the profiles array.
		scene.inputRenderer.useProfileControllerMeshes(session);

		session.updateRenderState({baseLayer: new XRWebGLLayer(session, gl)});

		let refSpaceType = session.isImmersive ? 'local' : 'viewer';
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
		if(event.session.isImmersive){
			xrButton.setSession(null);
			skybox.visible = true;
		}
	}

	function addAnchoredObjectToScene(anchor){
		console.debug("Anchor created");
		anchor.context = {};

		let flower = new Gltf2Node({url: 'media/gltf/sunflower/sunflower.gltf'});
		scene.addNode(flower);
		anchor.context.sceneObject = flower;
		flower.anchor = anchor;
		anchoredObjects.push(flower);

		// For performance reasons if we add too many objects start
		// removing the oldest ones to keep the scene complexity
		// from growing too much.
		if(anchoredObjects.length > MAX_ANCHORED_OBJECTS){
			let objectToRemove = anchoredObjects.shift();
			scene.removeNode(objectToRemove);
			objectToRemove.anchor.delete();
		}
	}

	function onSelect(event){
		let frame = event.frame;
		let session = frame.session;
		let anchorPose = new XRRigidTransform();
		let inputSource = event.inputSource;

		// If the user is on a screen based device, place the anchor 1 meter in front of them.
		// Otherwise place the anchor at the location of the input device
		if(inputSource.targetRayMode == 'screen'){
			anchorPose = new XRRigidTransform(
				{x: 0, y: 0, z: -1},
				{x: 0, y: 0, z: 0, w: 1});
		}

		if(session.isImmersive){
			frame.createAnchor(anchorPose, inputSource.targetRaySpace).then((anchor)=>{
				addAnchoredObjectToScene(anchor);
			},(error)=>{
				console.error("Could not create anchor: " + error);
			});
		}
	}

	// Called every time a XRSession requests that a new frame be drawn.
	function onXRFrame(t, frame){
		let session = frame.session;
		let xrRefSpace = session.isImmersive ? xrImmersiveRefSpace:inlineViewerHelper.referenceSpace;
		let pose = frame.getViewerPose(xrRefSpace);

		// Update the position of all the anchored objects based on the currently reported positions of their anchors
		const tracked_anchors = frame.trackedAnchors;
		if(tracked_anchors){

			all_previous_anchors.forEach(anchor=>{
				if(!tracked_anchors.has(anchor)){
					scene.removeNode(anchor.sceneObject);
				}
			});

			tracked_anchors.forEach(anchor=>{
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
			all_previous_anchors.forEach(anchor=>{
				scene.removeNode(anchor.sceneObject);
			});
			all_previous_anchors = new Set();
		}

		// In this sample and most samples after it we'll use a helper function
		// to automatically add the right meshes for the session's input sources
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