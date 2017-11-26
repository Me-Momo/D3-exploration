import * as d3 from '../../d3-bundle';
// import D3Svg from "./D3Svg";
// import { IBarChart, ID3Svg } from "./interface";
import BaseChart from "./BaseChart";
import { IBaseChartOpts } from "./interface/IBaseChart";
import { IAdimission } from '../interface';

/**
 * @class d3-bar-chart
 */
class PieChart extends BaseChart {
  constructor(opts: IBaseChartOpts) {
    super(opts);
  }

  initChart() {
    const Arc = d3.arc()
    .innerRadius(20)
    .outerRadius(40).cornerRadius;

    const Pie = d3.pie().value((d: IAdimission) => {
      return d.Count;
    });
    // Alternative
    const color: string[] = d3.schemeCategory20b;

    this.d3Svg
      .selectAll("path")
      .data(Pie(this.data))
      .enter()
      .append("path")
      .attr('d', Arc)
      .attr("fill", (d, i: number) => {
        return color[i];
      });
  }
}

export default PieChart;
