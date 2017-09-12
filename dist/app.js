(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('d3')) :
	typeof define === 'function' && define.amd ? define(['d3'], factory) :
	(factory(global.d3));
}(this, (function (d3) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

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

// @ts-check
var logger = debug("Week01");
var DEFAULT_CONTAINER_WIDTH = 800;
var DEFAULT_CONTAINER__HEIGHT = 500;
var DEFAULT_CONTAINER_STYLE = {
    margin: "20px",
    border: "1px solid #666",
    "border-radius": "4px"
};
var DEFAULT_CONTAINER = "<div>\n<div id=\"barChart\"></div>\n</div>";
var SVGContainer = /** @class */ (function () {
    function SVGContainer(options) {
        if (options === void 0) { options = {}; }
        var container = options.container, width = options.width, height = options.height, style = options.style, wrapperContainerStyle = options.wrapperContainerStyle;
        width = width || DEFAULT_CONTAINER_WIDTH;
        height = height || DEFAULT_CONTAINER__HEIGHT;
        if (!container) {
            container = document.createElement("div");
            container.innerHTML = DEFAULT_CONTAINER;
            document.body.appendChild(container);
        }
        /**
         * initialize wrapperContainer
         */
        this.wrapperContainer = container;
        if (wrapperContainerStyle) {
            this.addWrapperStyle(wrapperContainerStyle);
        }
        this.svg = d3.select(this.wrapperContainer)
            .append("svg")
            .style(__assign({}, DEFAULT_CONTAINER_STYLE, style))
            .attr("width", width)
            .attr("height", height);
    }
    SVGContainer.prototype.getContainer = function () {
        return this.svg;
    };
    SVGContainer.prototype.addWrapperStyle = function (styles) {
        var _this = this;
        Object.keys(styles).map(function (key) {
            _this.wrapperContainer.style.setProperty(key, styles[key]);
        });
    };
    return SVGContainer;
}());
d3.csv("data/Week01/admissions.csv", function (admissions) {
    debug("Week01")("get dataset of admissions %o", admissions);
    var BAR_WIDTH = DEFAULT_CONTAINER_WIDTH / admissions.length;
    var svg = new SVGContainer({
        wrapperContainerStyle: {
            background: '#e9e9e9',
        }
    }).getContainer();
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
