//制作散点图

var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
]

var WIDTH = 800,
    HEIGHT = 400,
    svgPadding = 30

var svg = d3.select(".svgArea").append("svg")
            .attr("width", WIDTH).attr("height", HEIGHT)
            .style({
                "padding": svgPadding + "px",
                "margin": "0 20px",
                "border": "1px solid pink"
            })

var scale = d3.scale.linear()
			.domain([0,d3.max(dataset,function(d){
				return Math.sqrt(d[0])
			})])
			.range([0,Math.sqrt(WIDTH)])


// 1. Add Scatter circles
svg.selectAll("circle")
        .data(dataset).enter()
        .append("circle")
        .attr("cx", function(d){
            return scale(d[0])
        })
        .attr("cy", function(d){
            return HEIGHT - svgPadding - d[1]
        })
        .attr("r", function(d){
            return scale(Math.sqrt(d[0]))
        })
        .attr("fill","lightblue")

// 2. Add Label
svg.selectAll("text")
        .data(dataset).enter()
        .append("text")
        .attr("x", function(d){
            return scale(d[0])
        })
        .attr("y", function(d){
            return HEIGHT - (d[1] + Math.sqrt(d[0]) / 2) - svgPadding
        })
        .text(function(d){
            return d
        })
        .attr("font-size","11px")
        .attr("fill","darkblue")

// 3. Add Axis

// Define Scale
var xScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d){
				return d[0]
			})])
            .range([0 , WIDTH - 2 * svgPadding ])

//  3.1.1 Define X axis
var xAxis = d3.svg.axis()
            .scale(xScale) // 基于什么比例尺工作
            .orient("bottom") // 坐标值位置 - 朝上还是朝下
            .ticks(5) // 刻度线的数量

// 3.1.2 Create X axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + ( HEIGHT - 10 )+ ")")
    .call(xAxis)// Define Scale

// var yScale = d3.scale.linear()
//             .domain([0, d3.max(dataset, function(d){
// 				return d[1]
// 			})])
//             .range([HEIGHT - 2*svgPadding, 0])

// //  3.1.1 Define X axis
// var yAxis = d3.svg.axis()
//             .scale(yScale) // 基于什么比例尺工作
//             .orient("left") // 坐标值位置 - 朝上还是朝下
//             .ticks(5) // 刻度线的数量

// // 3.1.2 Create X axis
// svg.append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(0,"+ ( svgPadding+ 20 )+")")
//     .call(yAxis)

// TODO: 刻度线 不准确
