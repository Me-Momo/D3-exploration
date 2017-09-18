import * as d3 from "d3";
// import D3Svg from "./D3Svg";
// import { IBarChart, ID3Svg } from "./interface";
import BaseChart from "./BaseChart";
import { IBaseChartOpts } from "./interface/IBaseChart";

/**
 * @class d3-bar-chart
 */
class PieChart extends BaseChart {
  constructor(opts: IBaseChartOpts) {
    super(opts);
  }

  initChart() {
    // const arc = d3.svg
    //   .arc()
    //   .innerRadius(20)
    //   .outerRadius(40);

    const pie = d3.layout.pie().value((datum: number, i: number) => {
      return datum;
    });
    // Alternative
    const color = d3.scale
      .ordinal()
      .range([
        "#A60F2B",
        "#648C85",
        "#B3F2C9",
        "#528C18",
        "#C3F25C"
      ]) as Function;

    this.d3Svg
      .selectAll("path")
      .data(pie(this.data))
      .enter()
      .append("path")
      // FIXME: 
      // .attr('d', arc)
      .attr("d", 10)
      .attr("fill", (d, i: number) => {
        return color("x");
      });
  }
}

export default PieChart;
