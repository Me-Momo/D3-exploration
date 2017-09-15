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
        var debugPermit = localStorage.getItem('debug').split(':').slice(0, -1).join(':');
        if (debugPermit === '*') {
            // tslint:disable-next-line:no-console
            console.log.apply(console, [msg].concat(args));
        }
        else if (new RegExp("^(" + debugPermit + ")").test(namespace)) {
            // tslint:disable-next-line:no-console
            console.log.apply(console, [msg].concat(args));
        }
    };
}

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

/**
 * @class D3SvgFactory
 * @desc 初始化 d3-svg Container
 */
var D3SvgFactory = /** @class */ (function () {
    function D3SvgFactory(options) {
        if (options === void 0) { options = {}; }
        var container = options.container || DEFAULT_CONTAINER();
        var width = DEFAULT_CONTAINER_WIDTH$1;
        var height = DEFAULT_CONTAINER__HEIGHT$1;
        var style = options.style, wrapperContainerStyle = options.wrapperContainerStyle;
        /**
         * initialize wrapperContainer
         */
        this.wrapperContainer = container;
        if (wrapperContainerStyle) {
            this.addWrapperStyle(wrapperContainerStyle);
        }
        this.svg = d3.select(this.wrapperContainer)
            .append("svg")
            .style(__assign({}, style))
            .attr("width", width)
            .attr("height", height);
    }
    D3SvgFactory.prototype.getSvgContainer = function () {
        return this.svg;
    };
    D3SvgFactory.prototype.getSvgContainerSize = function () {
        if (this.svg) {
            // Notice: it's SVGSVGElement
            var node = this.svg.node();
            logger$1(node.getBoundingClientRect());
            var box = node.getBoundingClientRect();
            return box;
        }
        return {
            width: 0,
            height: 0,
        };
    };
    D3SvgFactory.prototype.addWrapperStyle = function (styles) {
        var _this = this;
        Object.keys(styles).map(function (key) {
            _this.wrapperContainer.style.setProperty(key, styles[key]);
        });
    };
    return D3SvgFactory;
}());
var logger$1 = debug("Week01");
var DEFAULT_CONTAINER_WIDTH$1 = "100%";
var DEFAULT_CONTAINER__HEIGHT$1 = "100%";
var DEFAULT_CONTAINER = function () {
    var container = document.createElement("div");
    document.body.appendChild(container);
    return container;
};

// @ts-check
var logger = debug("Week01");
/**
 * 数据相关
 */
d3.csv("data/Week01/admissions.csv", function (admissions) {
    logger("get dataset of admissions %o", admissions);
    var containerFactory = new D3SvgFactory({
        wrapperContainerStyle: {
            width: '80vw',
            height: '90vh',
        },
    });
    var svg = containerFactory.getSvgContainer();
    var boxSize = containerFactory.getSvgContainerSize();
    var BAR_WIDTH = (boxSize.width - 100) / admissions.length - 10;
    logger('盒子大小: %o, 每一条bar宽度: %s', boxSize, BAR_WIDTH);
    var rects = svg
        .selectAll("rect")
        .data(admissions)
        .enter()
        .append("rect");
    rects
        .attr("x", function (d, i) {
        return (i + 1) * 40 + 10;
    })
        .attr("y", function (d) {
        return boxSize.height - d.Count;
    })
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
