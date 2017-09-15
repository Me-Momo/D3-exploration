import * as d3 from 'd3';
import D3SvgFactory from './SvgContainerFactory';
import { IBarChart, SvgContainer } from './interface';

/**
 * @class d3-bar-chart
 */
class BarChart {

  private svgContainer: SvgContainer;
  private data: any[];

  constructor(options: IBarChart) {
    this.svgContainer = options.container;
    this.data = options.data;
  }

  initChart() {
    // this.svgContainer
    // .selectAll('rect')
    // .
  }

}

export default BarChart;
