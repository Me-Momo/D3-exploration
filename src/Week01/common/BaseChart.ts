import { AbstractChart } from './AbstractClass';
import { IBaseChartOpts, ID3Svg } from './interface';
import { Primitive } from './interface/dataType';


/**
 * @class d3-base-chart
 */
abstract class BaseChart extends AbstractChart {

  d3Svg: ID3Svg;
  data: any[];

  constructor(opts: IBaseChartOpts) {
    super();
    this.d3Svg = opts.container;
    this.data = opts.data || [];
    this.initChart();
  }

 abstract initChart(): void;

  x(fn: Function | Primitive) {
    this.d3Svg = this.d3Svg.attr("x", (d, i: number) => {
      return mormalizeToFn(fn)(d, i);
    });
    return this;
  }

  y(fn: Function | Primitive) {
    this.d3Svg = this.d3Svg.attr("y", (d, i: number) => {
      return mormalizeToFn(fn)(d, i);
    });
    return this;
  }

  width(fn: Function | Primitive) {
    this.d3Svg = this.d3Svg.attr("width", (d, i: number) => {
      return mormalizeToFn(fn)(d, i);
    });
    return this;
  }

  height(fn: Function | Primitive) {
    this.d3Svg = this.d3Svg.attr("height", (d, i: number) => {
      return mormalizeToFn(fn)(d, i);
    });
    return this;
  }

  fill(fn: Function | string) {
    this.d3Svg = this.d3Svg.attr("fill", (d, i: number) => {
      return mormalizeToFn(fn)(d, i);
    });
    return this;
  }

  text(fn: Function | string) {
    this.d3Svg = this.d3Svg
    .select("text")
    .data(this.data)
    .enter()
    .append("text")
    .text((d, i: number) => {
      return mormalizeToFn(fn)(d, i);
    });

    // 默认图片位置
    this.x((d, i: number) => {
      return (i + 1) * 40 + 10;
    })
    .y(d => {
      return 5;
    })
    .fill(d => {
      return "#999";
    });;
    return this;
  }

  // TODO: 待删除
  getChart(): EventTarget {
    return this.d3Svg.node();
  }
}

/**
 * @class isFunction
 * @desc determined whether the fn is a Funciton,
 *        - if true return fn, 
 *        - else transform to a function return fn;
 */
function mormalizeToFn(fn: Function|Primitive): Function {
  if (typeof fn === "function") {
    return fn;
  } else {
    return () => {
      return fn; 
    };
  }
}

export default BaseChart;
