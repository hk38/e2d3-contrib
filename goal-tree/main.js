//# require=d3,jquery


var width = root.clientWidth,
    height = root.clientHeight,
    diameter = Math.min(width, height);

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select(root).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");





function update(data) {
  svg.selectAll("*").remove();

  var root = data.toNested().children[0];

  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });

  node.append("circle")
      .attr('r', 45)
      .transition()
      .delay(function(d, i) {
	  return i * 20;
      })
      .ease('linear')
      .attr('r', 4.5);
      

  node.append("text")
      .attr("dy", ".31em")
      .text(function(d) { return d.name; })
      .transition()
      .duration(2000)
      .delay(function(d, i) {
	  return i * 20;
      })
      .ease('elastic')
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; });

  $('svg').click(function() {

    node.select('circle')
        .attr('r', 45)
        .transition()
        .delay(function(d, i) {
          return i * 20;
        })
        .ease('linear')
        .attr('r', 4.5);

    node.select('text')
      .attr("transform", 0)
      .transition()
      .duration(2000)
      .delay(function(d, i) {
	  return i * 20;
      })
      .ease('elastic')
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; });

  });

}

