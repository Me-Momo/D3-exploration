function addRect(t,a,n,e){t.selectAll("rect").data(a||dataset_1).enter().append("rect").transition().delay(function(t,a){return 100*a}).duration(500).attr("x",function(t,a){return n?n(a):xScale_DEFAULT(a)}).attr("y",function(t){return e?HEIGHT-e(t):HEIGHT-4*t}).attr("width",n?n.rangeBand():xScale_DEFAULT.rangeBand()).attr("height",function(t){return e?e(t):4*t}).attr("fill",function(t){return"rgb(23, 100, "+(e?e(t):10*t)+")"}),t.selectAll("text").data(a||dataset_1).enter().append("text").transition().duration(1e3).text(function(t){return t}).attr("text-anchor","middle").attr("x",function(t,a){return n?n(a)+n.rangeBand()/2:xScale_DEFAULT(a)+xScale_DEFAULT.rangeBand()/2}).attr("y",function(t){return e?HEIGHT-e(t)-5:HEIGHT-4*t+14}).attr("font-family","sans-serif").attr("font-size","11px").attr("fill",e?"black":"white")}function updateRect(t,a){t.selectAll("rect").data(a||dataset_1).transition().delay(function(t,a){return 100*a}).duration(500).attr("x",function(t,a){return xScale_DEFAULT(a)}).attr("y",function(t){return HEIGHT-4*t}).attr("width",xScale_DEFAULT.rangeBand()).attr("height",function(t){return 4*t}).attr("fill",function(t){return"rgb(23, 100, "+10*t+")"}),t.selectAll("text").data(a||dataset_1).transition().delay(function(t,a){return 100*a}).duration(500).text(function(t){return t}).attr("text-anchor","middle").attr("x",function(t,a){return xScale_DEFAULT(a)+xScale_DEFAULT.rangeBand()/2}).attr("y",function(t){return HEIGHT-4*t+14}).attr("font-family","sans-serif").attr("font-size","11px").attr("fill","white")}for(var WIDTH=500,HEIGHT=250,barPadding=1,dataset_1=[],i=0;i<20;i++)dataset_1.push(Math.round(20*Math.random())+5);var svg=d3.select(".svgArea").append("svg").attr("width",WIDTH).attr("height",HEIGHT);svg.selectAll("rect").data(dataset_1).enter().append("rect").attr("x",function(t,a){return a*(WIDTH/dataset_1.length)}).attr("y",function(t){return HEIGHT-4*t}).attr("width",WIDTH/dataset_1.length-barPadding).attr("height",function(t){return 4*t}).attr("fill",function(t){return"rgb(23, 100, "+10*t+")"}),svg.selectAll("text").data(dataset_1).enter().append("text").text(function(t){return t}).attr("text-anchor","middle").attr("x",function(t,a){return a*(WIDTH/dataset_1.length)+(WIDTH/dataset_1.length-barPadding)/2}).attr("y",function(t){return HEIGHT-4*t+14}).attr("font-family","sans-serif").attr("font-size","11px").attr("fill","white");var xScale_DEFAULT=d3.scale.ordinal().domain(d3.range(dataset_1.length)).rangeRoundBands([0,WIDTH],.05),svg2=d3.select(".svgArea").append("svg").attr("width",WIDTH).attr("height",HEIGHT);addRect(svg2),d3.select(".svgArea").append("button").text("Update").style({padding:"3px 5px",cursor:"pointer"}).on("click",function(){for(var t=[],a=0;a<20;a++)t.push(Math.round(20*Math.random())+5);updateRect(svg2,t)});var svg3=d3.select(".svgArea").append("svg").attr("width",WIDTH).attr("height",HEIGHT).style("padding","25px 0");d3.csv("../data/kpi.csv",function(t){var a=t.map(function(t){return t.KPI}),n=t.map(function(t){return t.Month}),e=d3.scale.ordinal().domain(d3.range(n.length)).rangeRoundBands([0,WIDTH],.05),r=d3.scale.linear().domain([0,d3.max(a)]).range([0,HEIGHT-50]);addRect(svg3,a,e,r);var d=d3.svg.axis().scale(e).orient("bottom").ticks(12).tickValues(n);svg3.append("g").attr("class","x axis").attr("transform","translate(0,"+HEIGHT+")").call(d)});