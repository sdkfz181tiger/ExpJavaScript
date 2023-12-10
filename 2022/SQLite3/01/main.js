console.log("main.js!!");

window.onload = (e)=>{
	console.log("onload!!");

	initSqlJs({
		locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
	}).then(async function(SQL) {
		let sqlFilePath = "./mydb.sqlite";
		const dataPromise = await fetch(sqlFilePath).then(res => res.arrayBuffer());
		const u8array = new Uint8Array(dataPromise);
		const db = new SQL.Database(new Uint8Array(u8array));
		let query = "SELECT * FROM users";
		let contents = db.exec(query);
		res = JSON.stringify(contents);
		console.log(contents);
	});
}