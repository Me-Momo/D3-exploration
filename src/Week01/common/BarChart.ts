import BaseChart from "./BaseChart";
import { IBaseChartOpts } from "./interface/IBaseChart";

/**
 * @class d3-bar-chart
 */
class BarChart extends BaseChart {

  constructor(opts: IBaseChartOpts) {
    super(opts);
  }

  initChart() {
    this.d3Svg = this.d3Svg
      .selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect");
  }

  // TODO: 对于BarChart，可以添加坐标轴
}


export default BarChart;
