console.log("custom.js");

/*
	About
		https://leafletjs.com/
	AccessToken
		https://account.mapbox.com/access-tokens/
*/

const ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const ACCESS_TOKEN = "pk.eyJ1Ijoic2RrZnoxODF0aWdlciIsImEiOiJja3FxNGU0cmcwdWFoMnhxaG5mcDYyaWwzIn0.acxWamqlCUkmAATOIUTlAQ";


window.onload = (e)=>{
	console.log("onload!!");

	// Position
	const ogaki = [35.366978775556916, 136.61782096901123];
	const busstop  = [35.36632694317184, 136.61690366920803];

	//==========
	// Mapbox
	let map = L.map("mapid").setView(ogaki, 16);

	// TileLayer
	L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
		attribution: ATTRIBUTION,// 著作権表記
		accessToken: ACCESS_TOKEN,// アクセストークン
		id: "mapbox/streets-v11",// マップの種類
		// tileSize: 512,// 1タイルの大きさ
		// maxZoom: 18,// マップのズーム
		// zoomOffset: -1
	}).addTo(map);

	// Marker
	L.marker(ogaki).addTo(map)
	.bindPopup("Hello OpenStreetMap!!").openPopup();

	// Circle
	let circle = L.circle(ogaki, {
		color: "red", fillColor: "#f03",
		fillOpacity: 0.2, radius: 100
	}).addTo(map);

	/*
	// Rectangle
	let rect = [
		[35.3824800, 136.6066900], 
		[35.3835110, 136.6079040]];
	L.rectangle(rect, {
		color: "#ff7800", weight: 1
	}).addTo(map);
	*/

	// Event
	let popup = L.popup();
	map.on("click", (e)=>{
		console.log(e.latlng);
		let str = e.latlng.lat + ", " + e.latlng.lng;
		popup.setLatLng(e.latlng).setContent(str).openOn(map);
	});
}