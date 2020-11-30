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
    .attr("height",  height)
  .append("g");

svg.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .style('fill', 'white');

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-50))
    .force('center', d3.forceCenter(width/2, height/2))
    // .force('link', d3.forceLink().links(links))
    .on('tick', ticked);

function ticked(){
    var u = d3.select('svg')
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