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
        // const debugPermit = localStorage.getItem('debug').split(':').slice(0, -1).join(':');
        // if (debugPermit === '*') {
        //   // tslint:disable-next-line:no-console
        //   console.log(msg, ...args);
        // } else if (new RegExp(`^(${debugPermit})`).test(namespace)) {
        //   // tslint:disable-next-line:no-console
        //   console.log(msg, ...args);
        // }
        console.log.apply(console, [msg].concat(args));
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

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var D3Svg = /** @class */ (function () {
    function D3Svg(options) {
        if (options === void 0) { options = {}; }
        var container = options.container || DEFAULT_CONTAINER();
        var width = DEFAULT_CONTAINER_WIDTH;
        var height = DEFAULT_CONTAINER__HEIGHT;
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
            .attr("width", width)
            .attr("height", height)
            .style(__assign({}, style));
    }
    D3Svg.prototype.create = function () {
        var _this = this;
        this.svg = Object.assign(this.svg, {
            getSize: function () { return _this.getSVGSize(); },
        });
        return this.svg;
    };
    D3Svg.prototype.getSVGSize = function () {
        if (this.svg) {
            // Notice: it's SVGSVGElement
            var node = this.svg.node();
            var box = node.getBoundingClientRect();
            return box;
        }
        return {
            width: 0,
            height: 0,
        };
    };
    D3Svg.prototype.addWrapperStyle = function (styles) {
        var _this = this;
        Object.keys(styles).map(function (key) {
            _this.wrapperContainer.style.setProperty(key, styles[key]);
        });
    };
    return D3Svg;
}());
var DEFAULT_CONTAINER_WIDTH = "100%";
var DEFAULT_CONTAINER__HEIGHT = "100%";
var DEFAULT_CONTAINER = function () {
    var container = document.createElement("div");
    document.body.appendChild(container);
    return container;
};

/**
 * @class
 * @abstract
 */
var AbstractChart = /** @class */ (function () {
    // d3Svg: ID3Svg;
    // data: any[] = [];
    function AbstractChart() {
    }
    return AbstractChart;
}());

/**
 * @class d3-base-chart
 */
var BaseChart = /** @class */ (function (_super) {
    __extends(BaseChart, _super);
    function BaseChart(opts) {
        var _this = _super.call(this) || this;
        _this.d3Svg = opts.container;
        _this.data = opts.data || [];
        _this.initChart();
        return _this;
    }
    BaseChart.prototype.x = function (fn) {
        this.d3Svg = this.d3Svg.attr("x", function (d, i) {
            return mormalizeToFn(fn)(d, i);
        });
        return this;
    };
    BaseChart.prototype.y = function (fn) {
        this.d3Svg = this.d3Svg.attr("y", function (d, i) {
            return mormalizeToFn(fn)(d, i);
        });
        return this;
    };
    BaseChart.prototype.width = function (fn) {
        this.d3Svg = this.d3Svg.attr("width", function (d, i) {
            return mormalizeToFn(fn)(d, i);
        });
        return this;
    };
    BaseChart.prototype.height = function (fn) {
        this.d3Svg = this.d3Svg.attr("height", function (d, i) {
            return mormalizeToFn(fn)(d, i);
        });
        return this;
    };
    BaseChart.prototype.fill = function (fn) {
        this.d3Svg = this.d3Svg.attr("fill", function (d, i) {
            return mormalizeToFn(fn)(d, i);
        });
        return this;
    };
    BaseChart.prototype.text = function (fn) {
        this.d3Svg = this.d3Svg
            .select("text")
            .data(this.data)
            .enter()
            .append("text")
            .text(function (d, i) {
            return mormalizeToFn(fn)(d, i);
        });
        // 默认图片位置
        this.x(function (d, i) {
            return (i + 1) * 40 + 10;
        })
            .y(function (d) {
            return 5;
        })
            .fill(function (d) {
            return "#999";
        });
        
        return this;
    };
    // TODO: 待删除
    BaseChart.prototype.getChart = function () {
        return this.d3Svg.node();
    };
    return BaseChart;
}(AbstractChart));
/**
 * @class isFunction
 * @desc determined whether the fn is a Funciton,
 *        - if true return fn,
 *        - else transform to a function return fn;
 */
function mormalizeToFn(fn) {
    if (typeof fn === "function") {
        return fn;
    }
    else {
        return function () {
            return fn;
        };
    }
}

/**
 * @class d3-bar-chart
 */
var BarChart = /** @class */ (function (_super) {
    __extends(BarChart, _super);
    function BarChart(opts) {
        return _super.call(this, opts) || this;
    }
    BarChart.prototype.initChart = function () {
        this.d3Svg = this.d3Svg
            .selectAll("rect")
            .data(this.data)
            .enter()
            .append("rect");
    };
    return BarChart;
}(BaseChart));

// import PieChart from './common/PieChart';
var logger = debug("Week01");
var DEFAULT_BOX_SIZE = {
    width: 0,
    height: 0,
};
/**
 * 数据相关
 */
d3.csv("data/Week01/admissions.csv", function (admissions) {
    logger("get dataset of admissions %o", admissions);
    var svgContainer = new D3Svg({
        wrapperContainerStyle: {
            width: "80vw",
            height: "90vh",
            margin: "20px",
            "padding-top": "10px",
            border: "1px solid #666",
            background: 'pink',
        }
    }).create();
    if (!svgContainer) {
        logger('faile to create SvgContainer~~');
    }
    var boxSize = svgContainer.getSize ? svgContainer.getSize() : DEFAULT_BOX_SIZE;
    var BAR_WIDTH = (boxSize.width - 100) / admissions.length - 10;
    var bar = new BarChart({
        container: svgContainer,
        data: admissions
    });
    bar
        .x(function (d, i) {
        return (i + 1) * 40 + 10;
    })
        .y(function (d) {
        return boxSize.height - d.Count;
    })
        .width(BAR_WIDTH)
        .height(function (d, i) {
        return d.Count;
    })
        .fill(function (d) {
        return d.Status === "Admit" ? "green" : "red";
    });
    bar
        .text(function (d) {
        return d.Department;
    })
        .x(function (d, i) {
        return (i + 1) * 40 + 10;
    })
        .y(function (d) {
        return boxSize.height - d.Count;
    });
    // const pie = new PieChart({
    //   container: svgContainer,
    //   data: admissions,
    // });
    // pie.x(20).y(22);
});
function test() {
    var scale$$1 = d3.scale.linear().domain([0, 360]).range([0, 12]);
    logger(scale$$1(23)); //  23/(360/12)
    // 利用 domain 比例尺创建 颜色
    var color = genScaleColor();
    logger(color('gghvbvbnhb'), color.range());
    function genScaleColor() {
        return d3.scale.category10();
        // NOTE: 返回十种颜色: d3.scale.category10().range(); 
    }
}
test();

})));
//# sourceMappingURL=app.js.map
