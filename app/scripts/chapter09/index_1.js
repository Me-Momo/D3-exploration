//Width and height
var WIDTH = 500
var HEIGHT = 250
var barPadding = 1

var dataset_1 = []
for(var i=0; i<20; i++){
    dataset_1.push(Math.round(Math.random()*20) + 5)
}


// 1. Create SVG element
var svg = d3.select(".svgArea")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)

svg.selectAll("rect")
    .data(dataset_1)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * (WIDTH / dataset_1.length)
    })
    .attr("y", function(d) {
        return HEIGHT - (d * 4)
    })
    .attr("width", WIDTH / dataset_1.length - barPadding)
    .attr("height", function(d) {
        return d * 4
    })
    .attr("fill", function(d) {
        return "rgb(23, 100, " + (d * 10) + ")"
    })
svg.selectAll("text")
    .data(dataset_1)
    .enter()
    .append("text")
    .text(function(d) {
        return d
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return i * (WIDTH / dataset_1.length) + (WIDTH / dataset_1.length - barPadding) / 2
    })
    .attr("y", function(d) {
        return HEIGHT - (d * 4) + 14
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")


// ==============================================//

// 2. Add ordinal scale
var xScale_DEFAULT = d3.scale.ordinal()
            .domain(d3.range(dataset_1.length))// d3.range(length) 可以产生 0 -  length-1的数组
            .rangeRoundBands([0, WIDTH], 0.05) 
            // 类似 rangeBands - 自动分档，将区间切分成一个个小的区间段 
            // 新添内置边距：5% 间距

function addRect(svg, dataset, xScale, yScale){
    svg.selectAll("rect")
        .data(dataset || dataset_1)
        .enter()
        .append("rect")
        .transition()
        .delay(function(d,i){  // 添加延缓，交错过渡
            return i * 100
        })
        .duration(500)
        .attr("x", function(d, i) {
            return xScale ? xScale(i) : xScale_DEFAULT(i)
        })
        .attr("y", function(d) {
            return yScale ? HEIGHT - yScale(d) : HEIGHT - (d * 4)
        })
        .attr("width", xScale ? xScale.rangeBand() : xScale_DEFAULT.rangeBand())
        .attr("height", function(d) {
            return yScale ? yScale(d) : d * 4
        })
        .attr("fill", function(d) {
            var bColor = yScale ? yScale(d) : (d * 10)
            return "rgb(23, 100, " + bColor + ")"
        })
    svg.selectAll("text")
    .data(dataset || dataset_1)
    .enter()
    .append("text")
    .transition()
    .duration(1000)
    .text(function(d) {
        return d
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return xScale ? xScale(i)  + xScale.rangeBand() /2 : xScale_DEFAULT(i)  + xScale_DEFAULT.rangeBand() / 2
    })
    .attr("y", function(d) {
        return yScale ? HEIGHT - yScale(d) - 5: HEIGHT - (d * 4) + 14
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", yScale ? "black" : "white")
}
    // 更新数据的时候 其实只是少了 enter 和 append 两步
function updateRect(svg, dataset){     
    svg.selectAll("rect")
        .data(dataset || dataset_1)
        .transition()
        .delay(function(d,i){  // 添加延缓，交错过渡
            return i * 100
        })
        .duration(500)
        .attr("x", function(d, i) {
            return xScale_DEFAULT(i)
        })
        .attr("y", function(d) {
            return HEIGHT - (d * 4)
        })
        .attr("width", xScale_DEFAULT.rangeBand())
        .attr("height", function(d) {
            return d * 4
        })
        .attr("fill", function(d) {
            return "rgb(23, 100, " + (d * 10) + ")"
        })
    svg.selectAll("text")
    .data(dataset || dataset_1)
    .transition()
    .delay(function(d,i){  // 添加延缓，交错过渡
        return i * 100
    })
    .duration(500)
    .text(function(d) {
        return d
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return xScale_DEFAULT(i)  + xScale_DEFAULT.rangeBand() / 2
    })
    .attr("y", function(d) {
        return HEIGHT - (d * 4) + 14
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
}



// 3. 获取或指定当前比例尺对象的输出范围。
// console.log(xScale_DEFAULT.range())
//  [11, 35, 59, 83, 107, 131, 155, 179, 203, 227, 251, 275, 299, 323, 347, 371, 395, 419, 443, 467]


var svg2 = d3.select(".svgArea")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            
addRect(svg2)

// 添加按钮绑定点击事件 更细数据
d3.select(".svgArea")
        .append("button")
        .text("Update")
        .style({
            "padding": "3px 5px",
            "cursor": "pointer"
        })
        .on("click", function(){
            var dataset = []            
            for(var i=0; i<20; i++){
                dataset.push(Math.round(Math.random()*20) + 5)
            }
            updateRect(svg2, dataset)
        })

var svg3 = d3.select(".svgArea")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .style("padding","25px 0")
d3.csv("../data/kpi.csv",function(data){

    var dataset = data.map(function(item){
            return item["KPI"]
        }),
        category = data.map(function(item){
            return item["Month"]
        })
                    
    var xScale = d3.scale.ordinal()
                    // .domain(category) // 分配值域的ID - WRONG不够均匀 ? TODO: 
                    .domain(d3.range(category.length))
                    .rangeRoundBands([0,WIDTH], 0.05),
        yScale = d3.scale.linear() // 竖坐标使用线性的
                    .domain([0, d3.max(dataset)])
                    .range([0, HEIGHT - 50])
    addRect(svg3, dataset, xScale, yScale)
    // 4. 添加坐标轴，基于比例尺工作
    var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom") // 坐标值位置 - 朝上还是朝下
            .ticks(12) // 刻度线的数量
            .tickValues(category) // NOTE: 指定刻度值
            // .tickPadding([3]) // 刻度线与刻度标注之间的填充

    svg3.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0,"+ HEIGHT+")")
        .call(xAxis)
})