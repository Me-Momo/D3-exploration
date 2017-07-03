var i 


var dataset = []

for(i = 0; i < 5; i++){
    dataset.push(Math.round(Math.random()*1000 + 500))
}

var svgAreaWidth = 1000
var svgAreaHeight = 500

// Create Scale
// 使用比例尺来控制尺寸
var scale = d3.scale.linear()
  .domain([500, d3.max(dataset)])
  .range([svgAreaWidth - 200, svgAreaHeight - 100])


var svg = d3.select(".svgArea").append("svg")
    .attr("width",svgAreaWidth + "px")
    .attr("height",svgAreaHeight + "px")
    .style("padding", "50px")

var rects = svg.selectAll("rect").data(dataset).enter().append("rect")


var barPadding = 2 

rects.attr("x", function(d, i){
    return i * Math.round(svgAreaHeight/dataset.length)
}).attr("y", 0).attr("width", Math.round(svgAreaHeight/dataset.length) - barPadding)
.attr("height",function(d){
    return scale(d)
}).attr("fill",function(d){
    if(scale(d) > svgAreaHeight / 5 * 4 ){
        return "pink"
    }
    return "green"
})