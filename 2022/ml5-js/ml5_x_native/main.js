console.log("Hello p5.js!!");

let img, classifier;

window.onload = (e)=>{
	console.log("onload!!");

	img = document.getElementById("my_image");
	
	classifier = ml5.imageClassifier("MobileNet", modelReady);
}

function modelReady(){

	classifier.classify(img, (err, results) => {
		console.log(results);
	});
}