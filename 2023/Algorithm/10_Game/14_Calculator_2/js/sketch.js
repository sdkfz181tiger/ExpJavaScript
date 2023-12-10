"use strict";

//==========
// JavaScript

// Window
window.onload = (e)=>{

	// CalcManager
	const cMng = new CalcManager();
	
	// UI
	const btns = document.getElementsByTagName("button");
	for(let btn of btns){
		// Buttons
		btn.addEventListener("click", (e)=>{
			const disp = document.getElementById("disp");
			disp.textContent = cMng.put(e.target.textContent);
		});
	}
}