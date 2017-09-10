/**
 * @author xinming.lxj
 * Sept 09 2017
 */


const data = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

 /**
  * Pie Chart 1
  */
  
  var svgAreaWidth = 400
  var svgAreaHeight = 200
  var svg = d3.select("body").append("svg").attr("width",svgAreaWidth + "px").attr("height",svgAreaHeight + "px")
  
  var circles = svg.selectAll("circle").data(dataset2).enter().append("circle")
  var rects = svg.selectAll("rect").data(dataset2).enter().append("rect")
  
  circles.attr("cx", function(d, i){
      return (i + 1) * 40 + 10
  }).attr("cy",svgAreaHeight/2).attr("r", function(d){
      return d
  }).attr("stroke","green").attr("fill","none")
  