
var _ = require('underscore');

var nodes = ["A", "B", "C", "D", "E", "F", "G"];
var edges = [
    ["A", "B", 1], ["A", "D", 1],
    ["B", "C", 1], ["B", "D", 1], ["B", "E", 1],
    ["C", "E", 1],
    ["D", "E", 1], ["D", "F", 1],
    ["E", "F", 1], ["E", "G", 1],
    ["F", "G", 1]
];


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
    return mst;
}

console.log(kruskal(nodes, edges));