"use strict";

//==========
// JavaScript

// Window
window.onload = (e)=>{

	// Enigma
	const enigma = new Enigma();
	enigma.init(1, 2, 3);// Reset
	showInfo(enigma.getInfo());

	// UI
	const btns = document.getElementsByTagName("button");
	for(let btn of btns){
		// Buttons
		btn.addEventListener("click", (e)=>{

			const str = e.target.textContent;
			if(str == "Cl"){
				enigma.init(1, 2, 3);// Reset
				showInfo(enigma.getInfo());
				clearStr();
				return;
			}
			const enc = enigma.decode(str);
			showInfo(enigma.getInfo());
			showStr(str, enc);
			console.log("enigma:", str, "->", enc);
		});
	}
}

function clearStr(){
	document.getElementById("dispIn").textContent = "in:";
	document.getElementById("dispOut").textContent = "out:";
}

function showStr(strIn, strOut){
	document.getElementById("dispIn").textContent += strIn;
	document.getElementById("dispOut").textContent += strOut;
}

function showInfo(info){
	document.getElementById("info").textContent = info;
}