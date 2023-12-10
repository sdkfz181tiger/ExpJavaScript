console.log("main.js!!");

const btnA = document.querySelector("#btn_a");
const tooltipA = document.querySelector("#tooltip_a");

const popperInstance = Popper.createPopper(btnA, tooltipA, {
	modifiers: [{
		name: "offset",
		options: {offset: [0, 8]},
	}]
});