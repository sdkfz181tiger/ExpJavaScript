// javascript-lp-solver

/*
	Install(Local)
		https://docs.npmjs.com/downloading-and-installing-packages-locally
			$npm install javascript-lp-solver

	Install(Global)
		https://docs.npmjs.com/downloading-and-installing-packages-globally
			$npm install -g javascript-lp-solver

	Uninstall
		$npm uninstall javascript-lp-solver

	Check
		$npm list
		$npm list -g
*/

console.log("Hello javascript-lp-solver!!");

// Localでやるとき
//const solver = require("./node_modules/javascript-lp-solver/src/solver");

// Globalでやるとき
const solver = require("/usr/local/lib/node_modules/javascript-lp-solver/src/solver");

const model = {
	"optimize": "capacity",
	"opType": "max",
	"constraints": {
		"plane": {"max": 44},
		"person": {"max": 512},
		"cost": {"max": 300000}
	},
	"variables": {
		"brit": {
			"capacity": 20000,
			"plane": 1,
			"person": 8,
			"cost": 5000
		},
		"yank": {
			"capacity": 30000,
			"plane": 1,
			"person": 16,
			"cost": 9000
		}
	},
};

const results = solver.Solve(model);
console.log(results);