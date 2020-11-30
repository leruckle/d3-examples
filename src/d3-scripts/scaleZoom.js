//-------Make the "Data"-----------
var xPointDistribution = d3.randomNormal();
var yPointDistribution = d3.randomNormal();
var data = d3.range(1000).map(()=>{return [xPointDistribution(), yPointDistribution()]});

//---------------------------------
var width = 500,
    height = 500,
    margin = 50;
var plotWidth = width - 2 * margin;
var plotHeight = height - 2 * margin;

var svg = d3.select("#viz")
  .append("svg")
    .attr("width",  width)
    .attr("height",  height);

var container = svg.append("g").attr("transform", "translate(" + margin + ", " + margin + ")");

svg.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .style('fill', "none");

//------Set up the scales & axes-----------
var colorScale = d3.scaleSequential()
    .domain(d3.extent(data, (d)=>{
        return Math.sqrt((d[0]*d[0]) + d[1]*d[1]);
    }))
    .interpolator(d3.interpolateInferno);

var xScale = d3.scaleLinear()
    .domain(d3.extent(data, (d)=>{return d[0];}))
    .range([0, plotWidth]);

var xAxis = d3.axisBottom(xScale);

var gXAxis = container.append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0,' + plotHeight + ')')
    .call(xAxis);

var yScale = d3.scaleLinear()
    .domain(d3.extent(data, (d)=>{return d[1];}))
    .range([height-2*margin, 0]);

var yAxis = d3.axisLeft(yScale);

var gYAxis = container.append('g')
    .attr('id', 'y-axis')
    .call(yAxis);

//------Plot the data--------------------
var circles = container.append('g')
    .attr('id', 'circles')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 4)
    .attr('cx', (d)=>{return xScale(d[0]);})
    .attr('cy', (d)=>{return yScale(d[1]);})
    .style('fill', (d)=>{
        const distanceFromCenter = Math.sqrt((d[0]*d[0]) + d[1]*d[1]);
        return colorScale(distanceFromCenter);
    })
    .style('stroke', 'black')
    .style('stroke-width', '1px');

//-------Zoom Activities----------------
// svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

container.call(
    d3.zoom()
        .scaleExtent([.1, 4])
        .on("zoom", zoom)
);

function zoom(){
    const transform = d3.event.transform;
    const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
    const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
    gXAxis.call(xAxis.scale(zx));
    gYAxis.call(yAxis.scale(zy));
    circles.attr("cx", function(d) { return zx(d[0]); })
        .attr("cy", function(d) { return zy(d[1]); });
}

gXAxis.call(
    d3.zoom()
    .scaleExtent([.1, 4])
    .on("zoom", zoomX)
);

function zoomX(){
    const transform = d3.event.transform;
    const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
    gXAxis.call(xAxis.scale(zx));
    circles.attr("cx", function(d) { return zx(d[0]); })
}