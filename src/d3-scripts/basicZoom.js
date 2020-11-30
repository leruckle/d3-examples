// append the svg object to the body of the page
var svg = d3.select("#viz")
  .append("svg")
    .attr("width",  460)
    .attr("height",  460)
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
  .append("g")

svg
  .append("circle")
    .attr("cx", 300)
    .attr("cy", 300)
    .attr("r", 40)
    .style("fill", "#68b2a1")