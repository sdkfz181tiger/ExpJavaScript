console.log("Utility");

class PriorityQueue{
	
	constructor(){
		this._nodes = [];
	}
	
	enqueue(node, prio=999){
		for(let i=0; i<this._nodes.length; i++){
			if(this._nodes[i].prio <= prio) continue;
			this._nodes.splice(i, 0, {node, prio});
			return;
		}
		this._nodes.push({node, prio});
	}
	
	dequeue(){return this._nodes.shift();}
	
	size(){return this._nodes.length;}
}