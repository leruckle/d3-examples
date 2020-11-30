var nodes = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
// var links = [
//     {source: 0, target: 1},
//     {source: 0, target: 2},
//     {source: 0, target: 3},
//     {source: 1, target: 6},
//     {source: 3, target: 4},
//     {source: 3, target: 7},
//     {source: 4, target: 5},
//     {source: 4, target: 7}
//   ]
var width = 500,
    height = 500;

var svg = d3.select("#viz")
  .append("svg")
    .attr("width",  width)
    .attr("height",  height);

var container = svg.append("g");

svg.call(
    d3.zoom()
        .scaleExtent([.1, 4])
        .on("zoom", function() { container.attr("transform", d3.event.transform); })
);

svg.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .style('fill', "none");

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-50))
    .force('center', d3.forceCenter(width/2, height/2))
    // .force('link', d3.forceLink().links(links))
    .on('tick', ticked);

function ticked(){
    var u = container
        .selectAll('circle')
        .data(nodes)

    u.enter()
        .append('circle')
        .attr('r', 5)
        .merge(u)
        .attr('cx', function(d) {
            return d.x
        })
        .attr('cy', function(d) {
        return d.y
        })
    u.exit().remove()
}

//---------------------

// var width = 800;
// var height = 600;
// var graph = {"nodes": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}

// var graphLayout = d3.forceSimulation(graph.nodes)
//     .force("charge", d3.forceManyBody().strength(-10))
//     .force("center", d3.forceCenter(width / 2, height / 2))
//     .on("tick", ticked);

// var svg = d3.select("#viz").attr("width", width).attr("height", height);
// var container = svg.append("g");

// svg.call(
//     d3.zoom()
//         .scaleExtent([.1, 4])
//         .on("zoom", function() { container.attr("transform", d3.event.transform); })
// );

// var node = container.append("g").attr("class", "nodes")
//     .selectAll("g")
//     .data(graph.nodes)
//     .enter()
//     .append("circle")
//     .attr("r", 5)
//     .attr("fill", "magenta")


// function ticked(){
//     var u = d3.select('svg')
//         .selectAll('circle')
//         .data(node)

//     u.enter()
//         .append('circle')
//         .attr('r', 5)
//         .merge(u)
//         .attr('cx', function(d) {
//             return d.x
//         })
//         .attr('cy', function(d) {
//         return d.y
//         })
//     u.exit().remove()
// }
