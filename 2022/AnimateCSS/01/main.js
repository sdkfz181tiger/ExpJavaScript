console.log("main.js!!");

$("#btnA").click(()=>{
	doAnimation("#my_target", "animate__bounce");// Bounce
});

$("#btnB").click(()=>{
	doAnimation("#my_target", "animate__flash");// Flash
});

$("#btnC").click(()=>{
	doAnimation("#my_target", "animate__pulse");// Pulse
});

$("#btnD").click(()=>{
	doAnimation("#my_target", "animate__rubberBand");// RubberBand
});

$("#btnE").click(()=>{
	doAnimation("#my_target", "animate__shakeX");// ShakeX
});

$("#btnF").click(()=>{
	doAnimation("#my_target", "animate__shakeY");// ShakeY
});

$("#btnG").click(()=>{
	doAnimation("#my_target", "animate__headShake");// HeadShake
});

$("#btnH").click(()=>{
	doAnimation("#my_target", "animate__swing");// Swing
});

$("#btnI").click(()=>{
	doAnimation("#my_target", "animate__tada");// Tada
});

$("#btnJ").click(()=>{
	doAnimation("#my_target", "animate__wobble");// Wobble
});

$("#btnK").click(()=>{
	doAnimation("#my_target", "animate__jello");// Jello
});

$("#btnL").click(()=>{
	doAnimation("#my_target", "animate__heartBeat");// HeartBeat
});

$("#btnM").click(()=>{
	doAnimation("#my_target", "animate__backInDown");// HeartBeat
});

$("#btnN").click(()=>{
	doAnimation("#my_target", "animate__jackInTheBox");// HeartBeat
});

$("#btnO").click(()=>{
	doAnimation("#my_target", "animate__rollIn");// HeartBeat
});

$("#btnP").click(()=>{
	doAnimation("#my_target", "animate__rollOut");// HeartBeat
});

// Animation
function doAnimation(id, type){
	const elem = $(id);
	elem.addClass("animate__animated");
	elem.addClass(type);
	elem.on("animationend", ()=>{
		elem.off("animationend");
		elem.removeAttr("class");
	});
}

