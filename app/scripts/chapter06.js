var dataset = []

for(var i = 0; i < 10; i++){
    dataset.push(Math.round(Math.random()*100))
}
// 6.1 绘制DIV
d3.select(".barChart").selectAll("div").data(dataset)
    .enter().append("div").attr("class","bar").style("height",function(d){
        return d + "px"
    }).style("background",function(d){
        return d > 20 ? "yellowgreen" : "pink"
    })

// 6.3 create SVG
var dataset2 = []

for(i = 0; i < 5; i++){
    dataset2.push(Math.round(Math.random()*20 + 5))
}
var svgAreaWidth = 400
var svgAreaHeight = 200
var svg = d3.select(".svgArea").append("svg").attr("width",svgAreaWidth + "px").attr("height",svgAreaHeight + "px")

var circles = svg.selectAll("circle").data(dataset2).enter().append("circle")
var rects = svg.selectAll("rect").data(dataset2).enter().append("rect")

circles.attr("cx", function(d, i){
    return (i + 1) * 40 + 10
}).attr("cy",svgAreaHeight/2).attr("r", function(d){
    return d
}).attr("stroke","green").attr("fill","none")

// 改造 bar

var barPadding = 2 

rects = rects.attr("x", function(d, i){
    return i * Math.round(svgAreaHeight/dataset2.length)
}).attr("y", 0).attr("width", Math.round(svgAreaHeight/dataset2.length) - barPadding)
.attr("height",function(d){
    return d 
}).attr("fill",function(d){
    if(d > 20){
        return "pink"
    }
    return "green"
})


// 添加标签
// TODO: 位置的控制
svg.selectAll("text").data(dataset2).enter()
.append("text").attr("x", function(d, i){
    return (i + 1)  * Math.round(svgAreaHeight/dataset2.length) -20
}).attr("y", function(d){
    return d + 11
}).text(function(d){
    return d
}).attr("text-anchor", "middle")
	.attr("font-size", "11px")
    .attr("fill", "black")

