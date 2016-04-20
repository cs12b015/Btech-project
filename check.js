var fs = require('fs');



var nodes = [];
var edges = [];

fs.readFile('facebook_combined.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
 
 	
 	for(var i=0;i<parseInt(array[0]);i++){

		nodes[i] = i.toString();
	}

    for(i in array) {
    	if(i!=0){

    		var fst = array[i].split(" ")[0];
    		var snd = array[i].split(" ")[1];

    		var arr = [fst,snd,1];

    		edges[i-1]=arr;

    	}
    	
    }
    console.log(edges);
});

