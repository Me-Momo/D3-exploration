import { Primitive } from '../interface/dataType';

/**
 * @class
 * @abstract
 */
abstract class AbstractFactory {
  // TODO: 添加 id 检索
  abstract get(): AbstractChart;
  abstract set(obj: AbstractChart);
}

abstract class AbstractChart {
  
  // d3Svg: ID3Svg;
  // data: any[] = [];

  constructor() {
  }

  abstract initChart()
  abstract x(arg: Function | Primitive): AbstractChart;
  abstract y(arg: Function | Primitive): AbstractChart;
  abstract width(arg: Function | Primitive): AbstractChart
  abstract height(arg: Function | Primitive): AbstractChart
  abstract fill(arg: Function | Primitive): AbstractChart
  abstract text(arg: Function | Primitive): AbstractChart
  // abstract y(arg: Function | Primitive): AbstractChart
}

export {
  AbstractFactory,
  AbstractChart,
}