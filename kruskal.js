// See http://en.wikipedia.org/wiki/Kruskal's_algorithm
// and http://programmingpraxis.com/2010/04/06/minimum-spanning-tree-kruskals-algorithm/



var _ = require('underscore');

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
   // console.log(nodes);
    //console.log(edges);
    kruskal(nodes, edges);
});



function kruskal(nodes, edges) {
    var mst = [];
    var forest = _.map(nodes, function(node) { return [node]; });
    var sortedEdges = _.sortBy(edges, function(edge) { return -edge[2]; });
    while(forest.length > 1) {
        var edge = sortedEdges.pop();
        var n1 = edge[0],
            n2 = edge[1];

        var t1 = _.filter(forest, function(tree) {
            return _.include(tree, n1);
        });
            
        var t2 = _.filter(forest, function(tree) {
            return _.include(tree, n2);
        });

        if (t1 != t2) {
            forest = _.without(forest, t1[0], t2[0]);
            forest.push(_.union(t1[0], t2[0]));
            mst.push(edge);
        }
    }
    console.log(mst);
   // return mst;
}


