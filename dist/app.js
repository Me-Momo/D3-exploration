(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('d3')) :
	typeof define === 'function' && define.amd ? define(['d3'], factory) :
	(factory(global.d3));
}(this, (function (d3) { 'use strict';

function debug(namespace) {
    return function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // TODO: 判断是否为生产环境
        console.log.apply(console, [msg].concat(args));
    };
}

var logger = debug('Week01');
var DEFAULT_WIDTH = 800;
var DEFAULT_HEIGHT = 500;
d3.csv("data/Week01/admissions.csv", function (admissions) {
    debug("Week01")("get dataset of admissions %o", admissions);
    var BAR_WIDTH = DEFAULT_WIDTH / admissions.length;
    var svg = d3.select(".svgArea")
        .append("svg")
        .attr("width", DEFAULT_WIDTH)
        .attr("height", DEFAULT_HEIGHT);
    var rects = svg
        .selectAll("rect")
        .data(admissions)
        .enter()
        .append("rect");
    rects
        .attr("x", function (d, i) {
        return (i + 1) * 40 + 10;
    })
        .attr("y", 0)
        .attr("width", BAR_WIDTH)
        .attr("height", function (d, i) {
        return d.Count;
    })
        .attr("fill", function (d) {
        return d.Status === "Admit" ? "green" : "red";
    });
});

})));
//# sourceMappingURL=app.js.map
