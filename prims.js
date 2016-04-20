// Represents an edge from source to sink with capacity

var fs = require('fs');



var Edge = function(source, sink, capacity) {
    this.source = source;
    this.sink = sink;
    this.capacity = capacity;
};

// Main class to manage the network
var Graph = function() {
    this.edges = {};
    this.nodes = [];
    this.nodeMap = {};
    
    // Add a node to the graph
    this.addNode = function(node) {
        this.nodes.push(node);
        this.nodeMap[node] = this.nodes.length-1;
        this.edges[node] = [];
    };

    // Add an edge from source to sink with capacity
    this.addEdge = function(source, sink, capacity) {
        // Create the two edges = one being the reverse of the other    
        this.edges[source].push(new Edge(source, sink, capacity));
        this.edges[sink].push(new Edge(sink, source, capacity));
    };
    
    // Does edge from source to sink exist?
    this.edgeExists = function(source, sink) {
        if(this.edges[source] !== undefined) 
            for(var i=0;i<this.edges[source].length;i++)
                if(this.edges[source][i].sink == sink)
                    return this.edges[source][i];
        return null;
    };
};

function Prim(graph) {
    var result = [];
    var usedNodes = {};
    
    function findMin(g) {
        var min = [999999,null];
        for(var i=0;i<result.length;i++) 
            for(var n=0;n<g.edges[result[i]].length;n++) 
                if(g.edges[result[i]][n].capacity < min[0] && usedNodes[g.edges[result[i]][n].sink] === undefined)
                    min = [g.edges[result[i]][n].capacity, g.edges[result[i]][n].sink];
        return min[1];
    }
    
    // Pick random start point
    var node = g.nodes[Math.round(Math.random()*(g.nodes.length-1))];
    result.push(node);
    usedNodes[node] = true;
    
    var min = findMin(g);
    while(min != null) {
        result.push(min);
        usedNodes[min] = true;
        min = findMin(g);
    }
    
    return result;
};








var g = new Graph();


fs.readFile('facebook_combined.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");

    for(var i=0;i<parseInt(array[0]);i++){
		
		//sconsole.log(i.toString());
		g.addNode(i.toString());
	}

    for(i in array) {
    	if(i!=0){
    		//console.log(array[i]);
 
    		var fst = array[i].split(" ")[0];
    		var snd = array[i].split(" ")[1];
    		
    		g.addEdge(fst,snd,1);
    	}
    	
    }
    var result = Prim(g);
	console.log(result);

});










/*var a= "a";

g.addNode(a);
g.addNode('b');
g.addNode('c');
g.addNode('d');
g.addNode('e');
g.addNode('f');

g.addEdge('a','b',1);
g.addEdge('b','c',3);
g.addEdge('a','d',3);
g.addEdge('b','d',2);
g.addEdge('d','e',3);
g.addEdge('b','e',6);
g.addEdge('b','f',5);
g.addEdge('c','e',4);
g.addEdge('e','f',2);
g.addEdge('c','f',4);*/


/*var result = Prim(g);
//document.write('<h2>Result</h2>');
console.log(result);*/