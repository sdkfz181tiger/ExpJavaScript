console.log("main.js!!");

$(document).ready(()=>{
	console.log("Ready!!");

	// This is the most basic example (contains a single function call).
	// However, in cases when multiple recognition jobs are run,
	// calling Tesseract.recognize() each time is inefficient. 
	// See "basic-efficient.html" for a more efficient example. 

	const recognize = async ({target: {files}})=>{

		// Input to Canvas
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = async (e)=>{

			// Canvas
			const img = document.createElement("img");
			img.src = reader.result;
			img.onload = (e)=>{
				const cvs  = document.createElement("canvas");
				cvs.width  = img.width;
				cvs.height = img.height;
				const ctx  = cvs.getContext("2d");
				ctx.drawImage(img, 0, 0, img.width, img.height);
				const elem = document.getElementById("my_target");
				elem.appendChild(cvs);
			}

			// Tesseact
			const worker = await Tesseract.createWorker({
				corePath:   "./libs/tesseract-js-core/tesseract-core.wasm.js",
				workerPath: "./libs/tesseract-js/worker.min.js",
				//logger: m=>console.log(m),
			});
			await worker.loadLanguage("eng");
			await worker.initialize("eng");
			await worker.setParameters({
				tessedit_char_whitelist: "0123456789",
				tessedit_char_blacklist: "",
			});

			const tW    = img.width / 9;
			const tH    = img.height / 9;
			const pTop  = tH * 0.1;
			const pLeft = tW * 0.1;
			for(let r=0; r<9; r++){
				for(let c=0; c<9; c++){
					const left = c*tW + pLeft;
					const top  = r*tH + pTop;
					const w    = tW - pLeft*2;
					const h    = tH - pTop*2;
					const result = await worker.recognize(img, {
						rectangle: {
							top: left, left: top, width: w, height: h}
					});
					console.log("result:", r, c, result.data.text);

					// Test
					const crop = cropImage(img, left, top, w, h);
					const elem = document.getElementById("my_target");
					elem.appendChild(crop);
				}
			}
		}
	}

	// Uploader
	const elm = document.getElementById("uploader");
	elm.addEventListener("change", recognize);
});

function cropImage(img, x, y, w, h){
	const cvs  = document.createElement("canvas");
	cvs.width  = w;
	cvs.height = h;
	const ctx  = cvs.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height, -x, -y, img.width, img.height);
	return cvs;
}