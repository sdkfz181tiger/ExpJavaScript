console.log("main.js!!");

window.onload = (e)=>{
	console.log("onload!!");

	// SortableJS
	const elem = document.getElementById("my_sortable");
	Sortable.create(elem, {
		animation: 150, handle: "li div", 
		onStart:  onStartEvent,  // 1, ドラッグ開始時
		onEnd:    onEndEvent,    // 2, ドラッグ終了時
		onChange: onChangeEvent, // 3, ドラッグ変化時
		onSort:   onSortEvent    // 4, 並び替え終了時
	});
}

function onStartEvent(e){
	console.log("onStart!!");
}

function onEndEvent(e){
	console.log("onEnd!!");
}

function onChangeEvent(e){
	console.log("onChange!!");
}

function onSortEvent(e){
	console.log("onSort!!");
	// 5, 並び替え後のエレメントを確認
	const items = e.target.querySelectorAll("li");
	for(let i=0; i<items.length; i++){
		console.log(items[i].getAttribute("id"));
	}
}
