//==========
// ServiceWorker

const CACHE_VERSION = "cache_1.0.0";
const CACHE_FILES = [
	
];

// Place files that need to be executed offline 
// in the offline cache area.
// Check it out: Console -> Application -> Cache Storage
self.addEventListener("install", (e)=>{
	console.log("install", e);
	e.waitUntil(caches.open(CACHE_VERSION).then((cache)=>{
		return cache.addAll(CACHE_FILES);
	}));
});

// Delete caches that are not on the whitelist.
self.addEventListener("activate", (e)=>{
	console.log("activate", e);
	let cacheWhitelist = [CACHE_VERSION];
	e.waitUntil(caches.keys().then(function(keyList){
		return Promise.all(keyList.map(function(key){
			if(cacheWhitelist.indexOf(key) === -1){
				return caches.delete(key);}
			}));
		})
	);
});

// If there is data in the cache, 
// use it as it is, if not, request it.
self.addEventListener("fetch", (e)=>{
	e.respondWith(caches.match(e.request).then((res)=>{
		if(res) return res;
		return fetch(e.request);
	}));
});