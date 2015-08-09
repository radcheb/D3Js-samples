var width = 1380,
    height = 780 ;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-300)
    .linkDistance(80)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("../test/data/dolphins.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(Math.sqrt(d.value*10)); });

// Create the groups under svg
var gnodes = svg.selectAll('g.gnode')
  .data(graph.nodes)
  .enter()
  .append('g')
  .classed('gnode', true);

// Add one circle in each group
var node = gnodes.append("circle")
  .attr("class", "node")
  .attr("r", 5)
  .style("fill", function(d) { return color(d.id); })
  .call(force.drag);

// Append the labels to each group
var labels = gnodes.append("text")
  .text(function(d) { return d.label; })
  .style("font-size", "10px");

  // var node = svg.selectAll(".node")
  //     .data(graph.nodes)
  //   .enter().append("circle")
  //     .attr("class", "node")
  //     .attr("r", 5)
  //     .style("fill", function(d) { return color(d.group); })
  //     .call(force.drag);

  // node.append("title")
  //     .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    // Translate the groups
    gnodes.attr("transform", function(d) { 
      return 'translate(' + [d.x, d.y] + ')'; 
    });  
  //   node.attr("cx", function(d) { return d.x; })
  //       .attr("cy", function(d) { return d.y; });
  });
});