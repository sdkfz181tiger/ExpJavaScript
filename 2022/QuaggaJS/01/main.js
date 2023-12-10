console.log("main.js!!");

$(document).ready(()=>{
	console.log("Ready!!");
});

$("#my_start").click(()=>{
	console.log("Start!!");

	// Quagga
	Quagga.init({
		inputStream: {
			name : "Live",
			type : "LiveStream",
			target: document.getElementById("my_quagga")
		},
		decoder: {
			readers: ["ean_reader"]
		}
	}, err=>{
		if(err){
			console.log(err);
			return;
		}
		console.log("Initialization finished!!");
		Quagga.start();
	});

	Quagga.onProcessed(result=>{
		if(result == null) return;
		if(typeof(result) != "object") return;
		if(result.boxes == undefined) return;
		const ctx = Quagga.canvas.ctx.overlay;
		const canvas = Quagga.canvas.dom.overlay;
		ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));
		Quagga.ImageDebug.drawPath(result.box, 
			{x: 0, y: 1}, ctx, {color: "blue", lineWidth: 5});
	});

	Quagga.onDetected(result=>{
		console.log(result.codeResult.code);
		$("#my_result").text(result.codeResult.code);
		$("#my_barcode div").barcode(result.codeResult.code, "ean13");
	});
});

$("#my_stop").click(()=>{
	console.log("Stop!!");
	Quagga.stop();
});